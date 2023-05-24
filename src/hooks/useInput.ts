import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';

const useInputs = (initialForm: any) => {
  const [form, setForm] = useState(initialForm);
  const [complete, setComplete] = useState<boolean>(false);
  // change

  const onChange = useCallback((e: any) => {
    function reg(email: string) {
      const emailpattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

      if (emailpattern.test(email)) {
        setComplete(true);
      } else {
        setComplete(false);
      }
    }
    const { name, value } = e.target;
    reg(value);
    setForm((form: any) => ({ ...form, [name]: value }));
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset, complete];
};

export default useInputs;
