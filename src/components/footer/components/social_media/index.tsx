import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { ToastContent } from "react-toastify";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";

import CtaButton from "@src/components/cta-button";
import { socialMedia } from "@src/utils/social_media_info";

import * as styles from "./index.module.scss";

const SocialMedia = () => {
  const socialKeys = ["github", "twitter", "telegram", "linkedin", "instagram"];
  const { locale } = useRouter();

  const socialMediaInfo = socialKeys.map((keyParam: string) => {
    let key = keyParam;

    if (key === "instagram") {
      if (locale !== "en") {
        key += "_zh";
      }
    }

    return socialMedia[key] ?? {};
  });

  const { t } = useTranslation("common");

  const [inputs, setInputs] = useState({
    email: "",
  });

  const [canSubmit, setCanSubmit] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isEmail(inputs.email)) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
  }, [inputs, canSubmit]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setInputs((input) => ({
      ...input,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    if (!canSubmit) {
      toast.warn(t("send_email_warn") as ToastContent<unknown>);

      return;
    }

    if (event) {
      event.preventDefault();
      setLoading(true);

      fetch("/api/subscribe", {
        body: JSON.stringify({
          inputs,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((res) => {
          if (res.status === 200) {
            setInputs({
              email: "",
            });
          }

          toast.success(t("thank") as ToastContent<unknown>);
          setLoading(false);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          setLoading(false);
          toast.error(t("common:error") as ToastContent<unknown>);
        });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        {socialMediaInfo.map((x) => (
          <a
            aria-label={x.key}
            className={styles.icon}
            href={x.url}
            key={x.key}
            rel="noreferrer"
            target="_blank"
          >
            <x.component />
          </a>
        ))}
      </div>
      <div className={styles.inpboxItem}>
        <input
          autoComplete="email"
          className={styles.input}
          name="email"
          onInput={handleInputChange}
          placeholder={t("placeholder")}
          value={inputs.email}
        />
        <CtaButton loading={isLoading} onClick={handleSubmit}>
          {t("subscribe-us")}
        </CtaButton>
      </div>
    </div>
  );
};

export default SocialMedia;
