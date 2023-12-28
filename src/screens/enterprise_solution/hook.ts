import DOMPurify from "isomorphic-dompurify";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import type { ToastContent } from "react-toastify";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";

const useContactForm = () => {
  const [inputs, setInputs] = useState({
    company: "",
    email: "",
    help: "",
    name: "",
  });

  const [canSubmit, setCanSubmit] = useState(false);
  const { sanitize } = DOMPurify;
  const { t } = useTranslation("contact");
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isEmail(inputs.email) && inputs.name && inputs.help) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
  }, [inputs, canSubmit]);

  const handleSubmit = (event: any) => {
    if (event) {
      event.preventDefault();
      setLoading(true);

      fetch("/api/contact", {
        body: JSON.stringify({
          from: inputs.email,
          html: `
<p>Dear Administrator,</p>
<p>A new customer: ${sanitize(inputs.email)} contacted us today.</p>
<p>Here is the details:</p>
<p>Customer's Name: ${sanitize(inputs.name)}</p>
<p>Customer's Company: ${sanitize(inputs.company)}</p>
<p>Customer's Email Address: ${sanitize(inputs.email)}</p>
<p>Customer's Question: ${sanitize(inputs.help)}</p>
<p>Regards,</p>
<p>Forbole web system</p>`,
          source: "enterprise",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((res) => {
          if (res.status === 200) {
            setInputs({
              company: "",
              email: "",
              help: "",
              name: "",
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

export default useContactForm;
