import axios from "axios";
import DOMPurify from "isomorphic-dompurify";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useMemo, useState } from "react";
import type { ToastContent } from "react-toastify";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";

const useTalkModalForm = () => {
  const [inputs, setInputs] = useState({
    "agree": false,
    "company": "",
    "Data API": false,
    "email": "",
    "GraphQL": false,
    "name": "",
    "Other": false,
    "RPC Endpoints": false,
    "specify": "",
    "telegram": "",
  });

  const [canSubmit, setCanSubmit] = useState(false);
  const { sanitize } = DOMPurify;
  const { t } = useTranslation("contact");
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (
      isEmail(inputs.email) &&
      inputs.name &&
      (inputs["Data API"] ||
        inputs.GraphQL ||
        inputs["RPC Endpoints"] ||
        inputs.Other)
    ) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
  }, [inputs, canSubmit]);

  const get_started = useMemo(() => {
    const str = [];

    if (inputs["Data API"]) {
      str.push("Data API");
    }

    if (inputs.GraphQL) {
      str.push("GraphQL");
    }

    if (inputs.Other) {
      str.push("Other");
    }

    if (inputs["RPC Endpoints"]) {
      str.push("RPC Endpoints");
    }

    return str;
  }, [inputs]);

  const handleSubmit = (event: any) => {
    if (event) {
      event.preventDefault();
      setLoading(true);

      axios
        .post("/api/contact", {
          from: inputs.email,
          html: `
          <p>Dear Administrator,</p>
          <p>A new customer: ${sanitize(
            inputs.email,
          )} just wanted to talk to us.</p>
          <p>Here is the details:</p>
          <p>Customer's Name: ${sanitize(inputs.name)}</p>
          <p>Customer's Company: ${sanitize(inputs.company)}</p>
          <p>Customer's Email Address: ${sanitize(inputs.email)}</p>
          <p>Customer's Telegram: ${sanitize(inputs.telegram)}</p>
          <p>Developer Tools you look for: ${sanitize(get_started.join())}</p>
          <p>specify: ${sanitize(inputs.specify)}</p>
          <p>Regards,</p>
          <p>Forbole web system</p>
          `,
          source: "devtools",
        })
        .then((res) => {
          if (res.status === 200) {
            setInputs({
              "agree": false,
              "company": "",
              "Data API": false,
              "email": "",
              "GraphQL": false,
              "name": "",
              "Other": false,
              "RPC Endpoints": false,
              "specify": "",
              "telegram": "",
            });
          }

          setSuccess(true);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          // eslint-disable-next-line no-console
          console.log(err);
          toast.error(t("common:error") as ToastContent<unknown>);
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

  const handleCheckedChange = (event: any) => {
    const { checked, name } = event.target;

    setInputs((input) => ({
      ...input,
      [name]: checked,
    }));
  };

  const handleClear = (field: any) => {
    setInputs((input) => ({
      ...input,
      [field]: "",
    }));
  };

  return {
    canSubmit,
    handleCheckedChange,
    handleClear,
    handleInputChange,
    handleSubmit,
    inputs,
    isLoading,
    setInputs,
    setSuccess,
    success,
  };
};

export default useTalkModalForm;
