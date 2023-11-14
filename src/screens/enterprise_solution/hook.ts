import axios from "axios";
import DOMPurify from "isomorphic-dompurify";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { ToastContent, toast } from "react-toastify";
import validator from "validator";

const useContactForm = () => {
  const [inputs, setInputs] = React.useState({
    name: "",
    email: "",
    company: "",
    help: "",
  });
  const [canSubmit, setCanSubmit] = React.useState(false);
  const { sanitize } = DOMPurify;
  const { t } = useTranslation("contact");
  const [success, setSuccess] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (validator.isEmail(inputs.email) && inputs.name && inputs.help) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
  }, [inputs, canSubmit]);

  const handleSubmit = (event: any) => {
    if (event) {
      event.preventDefault();
      setLoading(true);
      axios
        .post("/api/contact", {
          from: inputs.email,
          source: "enterprise",
          html: `
          <p>Dear Administrator,</p>
          <p>A new customer: ${sanitize(inputs.email)} contacted us today.</p>
          <p>Here is the details:</p>
          <p>Customer's Name: ${sanitize(inputs.name)}</p>
          <p>Customer's Company: ${sanitize(inputs.company)}</p>
          <p>Customer's Email Address: ${sanitize(inputs.email)}</p>
          <p>Customer's Question: ${sanitize(inputs.help)}</p>
          <p>Regards,</p>
          <p>Forbole web system</p>
          `,
        })
        .then((res) => {
          if (res.status === 200) {
            setInputs({
              name: "",
              email: "",
              company: "",
              help: "",
            });
          }
          setSuccess(true);
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

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputs((input) => ({
      ...input,
      [name]: value,
    }));
  };
  const handleCheckedChange = (event: any) => {
    const { name, value } = event.target;
    setInputs((input) => ({
      ...input,
      [name]: value,
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

export default useContactForm;
