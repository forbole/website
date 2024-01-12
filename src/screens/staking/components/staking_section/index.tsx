/* eslint-disable no-console */
import type { Chain } from "@chain-registry/types";
import { coin } from "@cosmjs/proto-signing";
import type { MsgDelegateEncodeObject, StdFee } from "@cosmjs/stargate";
import {
  GasPrice,
  QueryClient,
  SigningStargateClient,
  StargateClient,
  assertIsDeliverTxSuccess,
  setupStakingExtension,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import type { AccountData, Window as KeplrWindow } from "@keplr-wallet/types";
import { Dec } from "@keplr-wallet/unit";
import { Box, Button } from "@mui/material";
import { MsgDelegate } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { useContext, useEffect, useState } from "react";

import { tooltipId } from "@src/components/tooltip";
import {
  StakingContext,
  addToConnectedWallets,
  fetchNetworksInfo,
  getConnectedWallets,
  setUserWallet,
} from "@src/screens/staking/lib/context";
import type { Account, Wallet } from "@src/screens/staking/lib/context/types";
import {
  ChainId,
  WalletId,
  keplrNetworks,
  networksWithStaking,
} from "@src/screens/staking/lib/context/types";

import ClaimRewardsModal from "./claim_rewards_modal";
import * as styles from "./index.module.scss";
import StakingModal from "./staking_modal";
import UnstakingModal from "./unstaking_modal";
import { stakingClient } from "./utils/staking_client";

const defaultChainId = ChainId.CosmosHubTestnet;

interface LeapWindow {
  leap: any;
}

// Sign transaction example:
// https://github.com/cosmos/cosmjs/blob/main/packages/stargate/src/signingstargateclient.spec.ts
// https://github.com/cosmos/cosmjs/blob/main/packages/stargate/src/signingstargateclient.spec.ts#L862

// Send message example
// https://github.com/chainapsis/keplr-example/blob/master/src/util/sendMsgs.ts

declare global {
  interface Window extends KeplrWindow, LeapWindow {}
}

// https://github.com/chainapsis/keplr-example
// https://github.com/chainapsis/keplr-wallet/blob/master/packages/cosmos/src/index.ts
// https://github.com/cosmos/testnets/tree/master/public
// https://github.com/chainapsis/keplr-chain-registry/tree/main

// https://github.com/forbole/big-dipper-2.0-cosmos/blob/rachelhox/staking/packages/ui/src/components/nav/components/connect_wallet/keplr_utils.ts
// https://github.com/forbole/big-dipper-2.0-cosmos/blob/rachelhox/staking/packages/ui/src/screens/validators/components/list/components/staking/hooks.ts

// Cosmos Kit: https://github.com/cosmology-tech/cosmos-kit
// https://docs.cosmoskit.com/

const earthValidatorAddress =
  "cosmosvaloper10v6wvdenee8r9l6wlsphcgur2ltl8ztkfrvj9a";

const StakingSection = () => {
  const [chainInfo, setChainInfo] = useState<Chain | null>(null);

  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  useEffect(() => {
    (async () => {
      // @TODO: hardcode this and just use in a testing script before deployment
      const { chains } = await import("chain-registry");

      console.log(
        "debug: index.tsx: chains",
        chains.filter((c) => c.chain_id.includes("dydx")),
      );

      const newChainInfo = chains.find(
        (chain) => chain.chain_id === ChainId.CosmosHubTestnet,
      );

      if (newChainInfo) {
        console.log("debug: index.tsx: newChainInfo", newChainInfo);
        setChainInfo(newChainInfo);
      }
    })();
  }, []);

  const [{ address, balance, balanceStaked, sequence }, setState] = useState({
    address: "",
    balance: "",
    balanceStaked: "",
    sequence: "",
  });

  const tryToConnectWallets = async (walletsIds: WalletId[]) => {
    if (walletsIds.includes(WalletId.Keplr)) {
      if (window.keplr) {
        const chainsToConnect = Array.from(keplrNetworks);

        await window.keplr?.enable(chainsToConnect);

        try {
          const handleError = (err: unknown) => {
            console.log("debug: index.tsx: err", err);

            return [] as Account[];
          };

          const parseAccounts =
            (chainId: ChainId) =>
            (accounts: readonly AccountData[]): Promise<Account[]> =>
              Promise.all(
                accounts.map((account) =>
                  Promise.all([
                    stakingClient.getAddressInfo(chainId, account.address),
                    stakingClient.getRewardsInfo(chainId, account.address),
                  ]).then(([info, rewards]) => ({
                    address: account.address,
                    chainId,
                    info,
                    rewards,
                    wallet: WalletId.Keplr,
                  })),
                ),
              );

          const keplrAccounts = await Promise.all(
            Array.from(keplrNetworks).map(async (network) => {
              if (networksWithStaking.has(network)) {
                const accounts = await window
                  .keplr!.getOfflineSigner(network)
                  .getAccounts()
                  .then(parseAccounts(network))
                  .catch(handleError);

                return {
                  accounts,
                  chainId: network,
                };
              }
            }),
          );

          addToConnectedWallets(WalletId.Keplr);

          setUserWallet(
            stakingState,
            setStakingState,
            WalletId.Keplr,
            keplrAccounts.reduce((acc, networkObj) => {
              if (networkObj) {
                acc[networkObj.chainId] = {
                  accounts: networkObj.accounts,
                  chainId: networkObj.chainId,
                };
              }

              return acc;
            }, {} as Wallet),
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    const connectedWallets = getConnectedWallets();

    fetchNetworksInfo(setStakingState);

    tryToConnectWallets(connectedWallets).then(() => {
      setStakingState({
        hasInit: true,
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!chainInfo) return null;

  const rest = chainInfo.apis?.rest?.[0]?.address;
  const rpc = chainInfo.apis?.rpc?.[0]?.address;

  if (!rest || !rpc) return null;

  const getBalance = async () => {
    const uri = `${rest}/cosmos/bank/v1beta1/balances/${address}?pagination.limit=1000`;

    const data = await fetch(uri, {
      headers: {
        Accept: "application/json",
      },
    }).then((res) => res.json());

    const newBalance = data.balances.find(
      (balanceParam: any) => balanceParam.denom === "uatom",
    );

    const uatomDecimal = 6;

    if (newBalance) {
      const amount = new Dec(newBalance.amount, uatomDecimal);

      setState((oldState) => ({
        ...oldState,
        balance: `${amount.toString(uatomDecimal)} ATOM`,
      }));
    }
  };

  const getKey = async () => {
    const key = await window.keplr?.getKey(defaultChainId);

    console.log("debug: index.tsx: key", key);
  };

  const claimRewards = async () => {
    const offlineSigner =
      window.keplr?.getOfflineSignerOnlyAmino(defaultChainId);

    if (!offlineSigner) {
      throw new Error("Can't get offline signer");
    }

    const client = await SigningStargateClient.connectWithSigner(
      rpc,
      offlineSigner,
      {
        gasPrice: GasPrice.fromString(`0.01atom`),
      },
    );

    const result = await client.withdrawRewards(
      address,
      earthValidatorAddress,
      "auto",
      "",
    );

    assertIsDeliverTxSuccess(result);

    console.log("debug: index.tsx: claim rewards result", result);
  };

  const delegateTokens = async () => {
    const offlineSigner =
      window.keplr?.getOfflineSignerOnlyAmino(defaultChainId);

    if (!offlineSigner) {
      throw new Error("Can't get offline signer");
    }

    const client = await SigningStargateClient.connectWithSigner(
      rpc,
      offlineSigner,
      {
        gasPrice: GasPrice.fromString(`0.01atom`),
      },
    );

    const result = await client.delegateTokens(
      address,
      earthValidatorAddress,
      coin(100000, "uatom"),
      "auto",
      "", // memo
    );

    try {
      assertIsDeliverTxSuccess(result);
    } catch (error) {
      console.log("assertion error", error);
    }

    console.log("debug: index.tsx: result", result);
  };

  const getDelegatedTokens = async () => {
    const client = await StargateClient.connect(rpc);
    const balanceStakedNew = await client.getBalanceStaked(address);

    if (balanceStakedNew) {
      setState((oldState) => ({
        ...oldState,
        balanceStaked: `${balanceStakedNew.amount} ${balanceStakedNew.denom}`,
      }));
    }

    // Should be the same as above
    // await client.getDelegation(address, earthValidatorAddress);
  };

  const getSequence = async () => {
    const client = await StargateClient.connect(rpc);
    const sequenceResult = await client.getSequence(address);
    const newSequence = JSON.stringify(sequenceResult);

    setState((oldState) => ({ ...oldState, sequence: newSequence }));
  };

  const getRewards = async () => {
    fetch(`${rest}/distribution/delegators/${address}/rewards`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const getTransactions = async () => {
    const client = await StargateClient.connect(rpc);

    // https://github.com/cosmos/cosmjs/blob/287278004b9e6a682a1a0b1664ba54646f65a1a0/packages/stargate/src/stargateclient.searchtx.spec.ts#L103
    client
      .searchTx([
        {
          key: "message.sender",
          value: address,
        },
      ])
      .then((data) => console.log("Search TX sender", data));

    fetch(`${rest}/txs?message.sender=${address}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const runKeplrUtils = () => {
    window.keplr?.getKeysSettled([defaultChainId]).then((keys) => {
      console.log("debug: index.tsx: getKeysSettled", keys);
    });

    // // Gets all chains info (needs user approval)
    // window.keplr?.getChainInfosWithoutEndpoints().then((chains) => {
    //   console.log("debug: index.tsx: chains", chains);
    // });

    console.log(
      "debug: index.tsx: window.keplr?.version",
      window.keplr?.version,
    );

    console.log("debug: index.tsx: window.keplr?.mode", window.keplr?.mode);
  };

  return (
    <Box className={styles.wrapper}>
      <StakingModal />
      <UnstakingModal />
      <ClaimRewardsModal />
      <Box className={styles.container}>
        <Box>Staking section</Box>
        <Box>
          <Button
            data-tooltip-content="Test tooltip"
            data-tooltip-id={tooltipId}
            onClick={() => tryToConnectWallets([WalletId.Keplr])}
          >
            Get address
          </Button>
          {address && <Button onClick={getBalance}>Get balance</Button>}
          {address && <Button onClick={delegateTokens}>Stake tokens</Button>}
          {address && <Button onClick={getSequence}>Get sequence</Button>}
          {address && <Button onClick={getKey}>Get key</Button>}
          {address && (
            <Button onClick={getDelegatedTokens}>Get staked tokens</Button>
          )}
          {address && <Button onClick={claimRewards}>Claim rewards</Button>}
          {address && (
            <Button onClick={getRewards}>Get rewards (logged)</Button>
          )}
          {address && (
            <Button onClick={runKeplrUtils}>Keplr utils (logged)</Button>
          )}
          {address && (
            <Button onClick={getTransactions}>Get transactions (logged)</Button>
          )}
          <div>
            <h1>With API</h1>
            <Button
              onClick={() => {
                stakingClient.getStakingInfo(defaultChainId).then((info) => {
                  console.log("debug: index.tsx: info", info);
                });
              }}
            >
              Get Network Info
            </Button>
            {address && (
              <Button
                onClick={() => {
                  stakingClient
                    .getAddressInfo(defaultChainId, address)
                    .then((info) => {
                      console.log("debug: index.tsx: info", info);
                    });
                }}
              >
                Get Address Info
              </Button>
            )}
            {address && (
              <Button
                onClick={async () => {
                  stakingClient
                    .stake(defaultChainId, address, "1")
                    .then(async (info) => {
                      const [message] = info.tx.body.messages;

                      if (!message) return;

                      const msg = MsgDelegate.fromPartial({
                        amount: message.amount,
                        delegatorAddress: message.delegator_address,
                        validatorAddress: message.validator_address,
                      });

                      const msgAny: MsgDelegateEncodeObject = {
                        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                        value: msg,
                      };

                      const fee: StdFee = {
                        amount: info.tx.authInfo.fee.amount,
                        gas: info.tx.authInfo.fee.gas_limit,
                      };

                      const memo = info.tx.body.memo || "";

                      console.log("debug: index.tsx: info", info);

                      const offlineSigner =
                        window.keplr?.getOfflineSignerOnlyAmino(defaultChainId);

                      if (!offlineSigner) {
                        throw new Error("Can't get offline signer");
                      }

                      const client =
                        await SigningStargateClient.connectWithSigner(
                          rpc,
                          offlineSigner,
                        );

                      client
                        .signAndBroadcast(address, [msgAny], fee, memo)
                        .then((signed) => {
                          console.log("debug: index.tsx: signed", signed);
                        })
                        .catch((err) => {
                          console.log("debug: index.tsx: err", err);
                        });
                    });
                }}
              >
                Stake tokens
              </Button>
            )}
            {address && (
              <Button
                onClick={async () => {
                  if (Math.random() > 1) {
                    const rewards = await stakingClient.getRewardsInfo(
                      defaultChainId,
                      address,
                    );

                    console.log("debug: index.tsx: rewards", rewards);
                  }

                  // // This doesn't return the account rewards (at least in testnet)
                  // const cometClient = await Tendermint34Client.connect(rpc);
                  // const queryClient = QueryClient.withExtensions(
                  //   cometClient,
                  //   setupDistributionExtension,
                  // );
                  // const result =
                  //   await queryClient.distribution.delegationRewards(
                  //     address,
                  //     earthValidatorAddress,
                  //   );
                  // console.log("debug: index.tsx: result", result);

                  const cometClient = await Tendermint34Client.connect(rpc);

                  const queryClient = QueryClient.withExtensions(
                    cometClient,
                    setupStakingExtension,
                  );

                  const addressDelegationResults = await Promise.all([
                    queryClient.staking.delegation(
                      address,
                      earthValidatorAddress,
                    ),
                    queryClient.staking.delegatorDelegations(address),
                    queryClient.staking.delegatorUnbondingDelegations(address),
                    queryClient.staking.delegatorValidator(
                      address,
                      earthValidatorAddress,
                    ),
                  ]);

                  console.log(
                    "debug: index.tsx: result",
                    addressDelegationResults,
                  );
                }}
              >
                Get rewards info
              </Button>
            )}
          </div>
        </Box>
        <Box>Address: {address}</Box>
        <Box>Balance: {balance}</Box>
        <Box>Balance delegated: {balanceStaked}</Box>
        <Box>Sequence: {sequence}</Box>
        <Box>Has leap wallet: {String(!!window.leap)}</Box>
      </Box>
    </Box>
  );
};

export default StakingSection;
