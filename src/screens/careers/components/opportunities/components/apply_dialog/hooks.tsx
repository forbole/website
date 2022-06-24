/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { ChangeEvent } from 'react';
import useTranslation from 'next-translate/useTranslation';
import validator from 'validator';
import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';
import { toast } from 'react-toastify';

interface InputProps {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  resume: File | string;
  coverLetter?: string;
}

const useApplyForm = ({ title }: any) => {
  const [resumeName, setResumeName] = React.useState('');
  const [inputs, setInputs] = React.useState<InputProps>({
    title,
    firstName: '',
    lastName: '',
    email: '',
    phone: '+',
    message: '',
    resume: '',
    coverLetter: '',
  });

  const [canSubmit, setCanSubmit] = React.useState(false);
  const { sanitize } = DOMPurify;
  const { t } = useTranslation('careers');

  React.useEffect(() => {
    if (
      validator.isEmail(inputs.email) &&
      inputs.phone &&
      inputs.firstName &&
      inputs.lastName &&
      inputs.message
    ) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
  }, [inputs]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    if (event) {
      event.preventDefault();
      axios
        .post('/api/careers', {
          from: inputs.email,
          to: 'career@forbole.com',
          subject: `[Careers] ${inputs.firstName} ${inputs.lastName}'s Job Application for ${inputs.title}`,
          // text: sanitize(inputs.message),
          html: `<p>${sanitize(
            inputs.message
          )}</p> <p>Applicant's phone number: ${inputs.phone}</p>`,
          attachments: [
            {
              filename: resumeName,
              content: inputs.resume,
            },
          ],
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success(t('form success'));
            setInputs({
              title,
              firstName: '',
              lastName: '',
              email: '',
              phone: '+',
              message: '',
              resume: '',
              coverLetter: '',
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(t('form error'));
        });
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    try {
      const file = e.target.files[0];
      const { name } = file;
      setResumeName(name);
      setInputs((input) => ({
        ...input,
        resume: file,
      }));
    } catch (err) {
      console.log(err);
      toast.error(t('file error'));
    }
  };

  const handleResumeClear = () => {
    setInputs((input) => ({
      ...input,
      resume: '',
    }));
    setResumeName('');
  };

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setInputs((inputs) => ({
      ...inputs,
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
    inputs,
    canSubmit,
    handleClear,
    handleMouseDownClear,
    resumeName,
    handleResumeClear,
    handleFileUpload,
  };
};

export default useApplyForm;
