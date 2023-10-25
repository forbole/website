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
    telegram: "",
    agree: false,
    specify: "",
    collaboration: false,
    enterprise_solution: false,
    careers: false,
    other: false,
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
      (inputs.collaboration ||
        inputs.enterprise_solution ||
        inputs.other ||
        inputs.careers)
    ) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
  }, [inputs]);
  const get_started = React.useMemo(() => {
    const str = [];
    if (inputs.collaboration) {
      str.push("Collaboration");
    }
    if (inputs.enterprise_solution) {
      str.push("Enterprise Solution");
    }
    if (inputs.careers) {
      str.push("Careers");
    }
    if (inputs.other) {
      str.push("Other");
    }
    return str;
  }, [
    inputs.collaboration,
    inputs.enterprise_solution,
    inputs.careers,
    inputs.other,
  ]);
  const handleSubmit = (event: any) => {
    if (event) {
      event.preventDefault();
      setLoading(true);
      axios
        .post("/api/contact", {
          from: inputs.email,
          to: "rpc@forbole.com",
          subject:
            "A new customer just wanted to get in touch with us via Enterprise form",
          html: `
          <p>Dear Administrator,</p>
          <p>A new customer: ${sanitize(
            inputs.email,
          )} just wanted to get in touch with us.</p>
          <p>Here is the details:</p>
          <p>Customer's Name: ${sanitize(inputs.name)}</p>
          <p>Customer's Company: ${sanitize(inputs.company)}</p>
          <p>Customer's Email Address: ${sanitize(inputs.email)}</p>
          <p>Customer's Telegram: ${sanitize(inputs.telegram)}</p>
          <p>How we can help you:${sanitize(get_started.join())}</p>
          <p>specify: ${sanitize(inputs.specify)}</p>
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
              telegram: "",
              agree: false,
              collaboration: false,
              enterprise_solution: false,
              careers: false,
              other: false,
              specify: "",
            });
          }
          setSuccess(true);
          setLoading(false);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          setLoading(false);
          console.log(err);
          toast.error(t("error") as ToastContent<unknown>);
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

export default useContactForm;
