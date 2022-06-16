import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useBlogHook = (error: any, t: any) => {
  useEffect(() => {
    if (error) {
      toast.error(t('error'));
    }
  }, [error]);
};
