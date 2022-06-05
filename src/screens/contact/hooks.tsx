import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import validator from 'validator';
import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';
import { toast } from 'react-toastify';

const useContactForm = () => {
  const [inputs, setInputs] = React.useState({
    name: '',
    message: '',
    email: '',
  });
  const [canSubmit, setCanSubmit] = React.useState(false);
  const { sanitize } = DOMPurify;
  const { t } = useTranslation('contact');

  React.useEffect(() => {
    if (validator.isEmail(inputs.email) && inputs.name && inputs.message) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
  }, [inputs]);

  const handleSubmit = (event: any) => {
    if (event) {
      event.preventDefault();
      axios
        .post('/api/contact', {
          from: inputs.email,
          to: 'info@forbole.com',
          subject: "Inquiry From Forbole's Landing Page",
          text: sanitize(inputs.message),
          html: `<p>${sanitize(inputs.message)}</p>`,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success(t('success'));
            setInputs({
              name: '',
              message: '',
              email: '',
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(t('error'));
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

  const handleClear = (field: any) => {
    setInputs((input) => ({
      ...input,
      [field]: '',
    }));
  };

  const handleMouseDownClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return {
    handleSubmit,
    handleInputChange,
    handleClear,
    handleMouseDownClear,
    inputs,
    setInputs,
    canSubmit,
  };
};

export default useContactForm;
