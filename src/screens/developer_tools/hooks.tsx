import axios from "axios";
import DOMPurify from "isomorphic-dompurify";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { ToastContent, toast } from "react-toastify";
import validator from "validator";

const useTalkModalForm = () => {
  const [inputs, setInputs] = React.useState({
    "name": "",
    "email": "",
    "company": "",
    "telegram": "",
    "specify": "",
    "agree": false,
    "Data API": false,
    "GraphQL": false,
    "Other": false,
    "RPC Endpoints": false,
  });
  const [canSubmit, setCanSubmit] = React.useState(false);
  const { sanitize } = DOMPurify;
  const { t } = useTranslation("contact");
  const [success, setSuccess] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (
      validator.isEmail(inputs.email) &&
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
  const get_started = React.useMemo(() => {
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
          source: "devtools",
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
        })
        .then((res) => {
          if (res.status === 200) {
            setInputs({
              "name": "",
              "email": "",
              "company": "",
              "telegram": "",
              "agree": false,
              "specify": "",
              "Data API": false,
              "GraphQL": false,
              "Other": false,
              "RPC Endpoints": false,
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
    const { name, checked } = event.target;
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
    handleSubmit,
    handleInputChange,
    handleClear,
    inputs,
    setInputs,
    canSubmit,
    handleCheckedChange,
    success,
    setSuccess,
    isLoading,
  };
};

export default useTalkModalForm;
