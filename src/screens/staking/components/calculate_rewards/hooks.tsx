import { useQuery } from "@apollo/client";
import { rewardsQuery } from "@graphql/queries";
import axios from "axios";
import { pathOr } from "ramda";
import { useCallback, useEffect, useMemo, useState } from "react";

import { convertToMoney, convertWithDecimal } from "@utils/convert_to_money";
import { getNetworkInfo } from "@utils/network_info";

import { getStakingParams } from "./config";
import { defaultFunctions, networkFunctions, toFixed } from "./utils";

export const useCalculateRewardsHook = () => {
  const [loading] = useState(false);
  const [tokens, setTokens] = useState<any | null>({
    value: "",
    display: "",
  });
  const initialState = getNetworkInfo("cosmos");
  const [selectedToken, setSelectedToken] = useState<any>(initialState);
  const [monthlyPeriods, setMonthlyPeriods] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState({
    dailyEarnings: {
      tokens: "0",
      amount: "0",
    },
    monthlyEarnings: {
      tokens: "0",
      amount: "0",
    },
    yearlyEarnings: {
      tokens: "0",
      amount: "0",
    },
  });

  const networkParams = useMemo(
    () => getStakingParams(selectedToken.key),
    [selectedToken.key],
  );

  const { loading: rewardsQueryLoading, data: rewardsQueryData } =
    useQuery(rewardsQuery);

  const selectedTokenGraphql = selectedToken?.graphql;

  const { commissionRate, inflation, stakingRatio } = useMemo(() => {
    if (!rewardsQueryLoading && rewardsQueryData) {
      const {
        eachCosmosBondedToken,
        eachCosmosCommission,
        eachCosmosInflationRate,
        eachCosmosTokenSupply,
      } = rewardsQueryData;
      const findFn = (data: any) =>
        selectedTokenGraphql === data.metric.instance;

      const comissionItem = eachCosmosCommission.find(findFn);
      const inflationItem = eachCosmosInflationRate.find(findFn);
      const supplyItem = eachCosmosTokenSupply.find(findFn);
      const bondedTokenItem = eachCosmosBondedToken.find(findFn);

      const bondedToken = bondedTokenItem
        ? parseFloat(bondedTokenItem.bondedToken)
        : 0;
      const totalSupply = supplyItem ? parseFloat(supplyItem.supply) : 0;

      return {
        commissionRate: comissionItem
          ? parseFloat(comissionItem.commissionRate)
          : networkParams.commissionRate,
        inflation: inflationItem
          ? parseFloat(inflationItem.inflationRate)
          : networkParams.inflation,
        stakingRatio:
          totalSupply && bondedToken ? bondedToken / totalSupply : 0,
      };
    }

    return networkParams;
  }, [
    rewardsQueryData,
    rewardsQueryLoading,
    selectedTokenGraphql,
    networkParams,
  ]);

  const handleDefaultCalculation = useCallback(async () => {
    let networkFunction = networkFunctions[selectedToken.key] ?? null;

    if (
      networkFunction === null &&
      !new Set([
        "cheqd",
        "chihuahua",
        "crescent",
        "crypto-org",
        "gravity_bridge",
        "injective",
        "jackal",
        "juno",
        "mars",
        "sentinelhub",
        "shentu",
        "stafihub",
        "terra",
        "terra_classic",
      ]).has(selectedToken.key)
    ) {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/${selectedToken.key}`;
      // different coingecko API ID from network key config
    } else if (networkFunction === null && selectedToken.key === "cheqd") {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/cheqd-network`;
    } else if (networkFunction === null && selectedToken.key === "crescent") {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/crescent-network`;
    } else if (networkFunction === null && selectedToken.key === "chihuahua") {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/chihuahua-token`;
    } else if (networkFunction === null && selectedToken.key === "crypto-org") {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/crypto-com-chain`;
    } else if (networkFunction === null && selectedToken.key === "injective") {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/injective-protocol`;
    } else if (networkFunction === null && selectedToken.key === "juno") {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/juno-network`;
    } else if (
      networkFunction === null &&
      selectedToken.key === "sentinelhub"
    ) {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/sentinel`;
    } else if (networkFunction === null && selectedToken.key === "shentu") {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/certik`;
    } else if (networkFunction === null && selectedToken.key === "stafihub") {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/stafi`;
    } else if (
      networkFunction === null &&
      selectedToken.key === "terra_classic"
    ) {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/terra-luna`;
    } else if (
      networkFunction === null &&
      selectedToken.key === "gravity_bridge"
    ) {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/graviton`;
    } else if (networkFunction === null && selectedToken.key === "jackal") {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/jackal-protocol`;
    } else if (networkFunction === null && selectedToken.key === "terra") {
      networkFunction = defaultFunctions();
      networkFunction.gecko = `${process.env.NEXT_PUBLIC_COINGECKO_API}/coins/terra-luna-2`;
    }

    const marketPriceApi = await axios.get(networkFunction?.gecko);

    const { data: marketPriceJson } = marketPriceApi;

    const marketPrice = networkFunction.marketPrice(marketPriceJson);
    // ===============================
    // raw calcs
    // ===============================
    const annualRewards = toFixed(
      // eslint-disable-next-line no-unsafe-optional-chaining
      tokens?.value * (inflation / stakingRatio) * (1 - commissionRate),
    );
    const monthlyRewards = (annualRewards / 12) * monthlyPeriods;
    const dailyRewards = monthlyRewards / 30;

    // ===============================
    // formats for display
    // ===============================
    const formatAnnualRewards = convertToMoney(annualRewards, 2);
    const formatMonthlyRewards = convertToMoney(monthlyRewards, 2);
    const formatDailyRewards = convertToMoney(dailyRewards, 2);
    const formatAnnualPrice = convertToMoney(annualRewards * marketPrice, 2);
    const formatMonthlyPrice = convertToMoney(monthlyRewards * marketPrice, 2);
    const formatDailyPrice = convertToMoney(dailyRewards * marketPrice, 2);

    setTotalEarnings({
      dailyEarnings: {
        tokens: formatDailyRewards,
        amount: formatDailyPrice,
      },
      monthlyEarnings: {
        tokens: formatMonthlyRewards,
        amount: formatMonthlyPrice,
      },
      yearlyEarnings: {
        tokens: formatAnnualRewards,
        amount: formatAnnualPrice,
      },
    });
  }, [
    commissionRate,
    inflation,
    monthlyPeriods,
    selectedToken.key,
    stakingRatio,
    tokens?.value,
  ]);

  useEffect(() => {
    if (tokens.value !== "" && monthlyPeriods !== 0) {
      handleDefaultCalculation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedToken, setSelectedToken, tokens, monthlyPeriods]);

  const handleChange = (e: any) => {
    const value: any = pathOr(0, ["target", "value"], e);
    if (!value) {
      setTokens({
        value: "",
        display: "",
      });

      return;
    }
    // edge cases setup
    const exceptions = [".", "0"];
    let occurance = 0;
    value.toString();
    value.split("").forEach((x: any) => {
      if (x === ".") {
        occurance += 1;
      }
    });

    // already has a decimal place
    if (occurance > 1 && value[value.length - 1] === ".") {
      return;
    }
    // handles edge cases
    if (exceptions.includes(value[value.length - 1])) {
      setTokens({
        value,
        display: value,
      });
    } else {
      const rawNumber = value.replace(/[^\d.]/g, "")
        ? Number(value.replace(/[^\d.]/g, ""))
        : "";
      const convertedNumber = convertWithDecimal(rawNumber);
      setTokens({
        value: rawNumber,
        display: convertedNumber,
      });
    }
  };

  return {
    selectedToken,
    setSelectedToken,
    totalEarnings,
    handleChange,
    tokens,
    monthlyPeriods,
    setMonthlyPeriods,
    loading,
  };
};
