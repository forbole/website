import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import validator from 'validator';
import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';
import { toast } from 'react-toastify';

const useContactCard = () => {
  const [inputs, setInputs] = React.useState({
    name: '',
    email: '',
    option: '',
  });
  const [canSubmit, setCanSubmit] = React.useState(false);
  const { sanitize } = DOMPurify;
  const { t } = useTranslation('staking');

  React.useEffect(() => {
    if (validator.isEmail(inputs.email) && inputs.name && inputs.option) {
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
          subject: 'Inquiry From Forbole Validator Website',
          text: sanitize(inputs.option),
          html: `<p>${sanitize(inputs.option)}</p>`,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success(t('success'));
            setInputs({
              name: '',
              option: '',
              email: '',
            });
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
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

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    setInputs,
    canSubmit,
  };
};

export default useContactCard;
