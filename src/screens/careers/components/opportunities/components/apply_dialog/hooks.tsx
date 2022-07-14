/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { ChangeEvent } from 'react';
import useTranslation from 'next-translate/useTranslation';
import validator from 'validator';
import axios from 'axios';
import { toast } from 'react-toastify';

interface InputProps {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  number: string;
  message: string;
  resume: File | string;
  coverLetter?: File | string;
}

const useApplyForm = ({ title }: any) => {
  const [resumeName, setResumeName] = React.useState('');
  const [letterName, setLetterName] = React.useState('');
  const [inputs, setInputs] = React.useState<InputProps>({
    title,
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    number: '',
    message: '',
    resume: '',
    coverLetter: '',
  });

  const [canSubmit, setCanSubmit] = React.useState(false);
  const { t } = useTranslation('careers');

  React.useEffect(() => {
    if (
      validator.isEmail(inputs.email) &&
      inputs.countryCode &&
      inputs.number &&
      inputs.firstName &&
      inputs.lastName &&
      inputs.message &&
      inputs.resume
    ) {
      setCanSubmit(true);
    } else if (canSubmit) {
      setCanSubmit(false);
    }
  }, [inputs]);

  const handleSubmit = (event: any) => {
    if (event) {
      event.preventDefault();
      const formData = new FormData();
      formData.append('resume', inputs.resume);
      formData.append('coverLetter', inputs.coverLetter as Blob);
      formData.append('inputs', JSON.stringify(inputs));
      axios
        .post('/api/careers', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success(t('form success'));
            setInputs({
              title,
              firstName: '',
              lastName: '',
              email: '',
              countryCode: '',
              number: '',
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

  const handleResumeUpload = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleLetterUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    try {
      const file = e.target.files[0];
      const { name } = file;
      setLetterName(name);
      setInputs((input) => ({
        ...input,
        coverLetter: file,
      }));
    } catch (err) {
      console.log(err);
      toast.error(t('file error'));
    }
  };

  const handleLetterClear = () => {
    setInputs((input) => ({
      ...input,
      coverLetter: '',
    }));
    setLetterName('');
  };

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    console.log('hi', name, value);
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
    handleResumeUpload,
    handleLetterClear,
    handleLetterUpload,
    letterName,
  };
};

export default useApplyForm;
