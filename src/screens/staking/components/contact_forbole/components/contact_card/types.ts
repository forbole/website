import React from 'react';

export default interface ContactFormProps {
  inputs: {
    name: string;
    email: string;
    option: string;
  };
  handleInputChange: (event: any) => void;
  handleMouseDownClear: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleSubmit: (event: any) => void;
  handleClear: (field: any) => void;
  canSubmit: boolean;
}
