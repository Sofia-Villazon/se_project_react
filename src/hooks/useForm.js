import { useState, useCallback, useEffect } from "react";
import { defaultInputCheck, defaultClothValues } from "../utils/constants";

function useForm(defaultValues) {
  const [error, setError] = useState(defaultValues);

  const [isDisabled, setIsDisabled] = useState(true);
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    formHandleChange();
  }, [values, error]);

  const handleChange = useCallback(
    (evt) => {
      const { name, value, validationMessage } = evt.target;
      setValues((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      setError((prevData) => ({
        ...prevData,
        [name]: validationMessage,
      }));
    },
    [values]
  );

  const formHandleChange = useCallback(() => {
    if (!values) return;
    const noErrors = Object.values(error).every((v) => v === "");
    const isEmpty = Object.values(values).some((v) => v === "");
    setIsDisabled(!noErrors || isEmpty);
  }, [error]);

  return {
    error,
    handleChange,
    values,
    setValues,

    setIsDisabled,
    isDisabled,
    formHandleChange,
  };
}
export default useForm;
