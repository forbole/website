import DOMPurify from "isomorphic-dompurify";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";

const useContactCard = () => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    option: "",
  });

  const [canSubmit, setCanSubmit] = useState(false);
  const { sanitize } = DOMPurify;
  const { t } = useTranslation("staking");

  useEffect(() => {
    if (isEmail(inputs.email) && inputs.name && inputs.option) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
  }, [inputs, canSubmit]);

  const handleSubmit = (event: any) => {
    if (event) {
      event.preventDefault();

      fetch("/api/contact", {
        body: JSON.stringify({
          from: inputs.email,
          html: `<p>${sanitize(inputs.option)}</p>`,
          source: "staking",
          text: sanitize(inputs.option),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((res) => {
          if (res.status === 200) {
            toast.success(t("success") as string);

            setInputs({
              email: "",
              name: "",
              option: "",
            });
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          toast.error(t("common:error") as string);
        });
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setInputs((input) => ({
      ...input,
      [name]: value,
    }));
  };

  return {
    canSubmit,
    handleInputChange,
    handleSubmit,
    inputs,
    setInputs,
  };
};

export default useContactCard;
