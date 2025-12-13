import { useState, useCallback } from "react";
import { defaultValues, defaultInputCheck } from "../utils/constants";

function useForm() {
  const [values, setValues] = useState(defaultValues);
  const [error, setError] = useState(defaultValues);
  const [isChecked, setIsChecked] = useState(defaultInputCheck);
  const [isDisabled, setIsDisabled] = useState(true);

  const validate = useCallback(
    (inputValidity, inputName) => {
      const newErrors = { ...error };
      if (!inputValidity) {
        newErrors[inputName] =
          inputName === "name"
            ? "Name is required and must be 2-40 characters"
            : "Please provide a valid URL";
      } else {
        newErrors[inputName] = "";
      }
      setError(newErrors);
    },
    [error]
  );

  const handleChange = useCallback(
    (evt) => {
      const { name, value } = evt.target;
      setValues({ ...values, [name]: value });
    },
    [values]
  );

  const handleName = useCallback(
    (evt) => {
      const input = evt.target;
      validate(input.validity.valid, evt.target.name);
      handleChange(evt);
    },
    [validate, handleChange]
  );

  const handleImage = useCallback(
    (evt) => {
      handleChange(evt);
      const input = evt.target;
      validate(input.validity.valid, evt.target.name);
    },
    [handleChange, validate]
  );

  const handleRadioBtn = useCallback(
    (evt) => {
      handleChange(evt);
      const input = evt.target;
      validate(input.validity.valid, evt.target.name);
      const newChecked = { ...isChecked };
      newChecked[input.value] = true;
      setIsChecked(newChecked);
    },
    [handleChange, validate, isChecked]
  );

  const formHandleChange = useCallback(() => {
    const hasChecked = Object.values(isChecked).some((checked) => checked);
    const noErrors = error.name === "" && error.imageUrl === "";
    setIsDisabled(!(noErrors && hasChecked));
  }, [isChecked, error]);

  return {
    values,
    setValues,
    handleImage,
    error,
    handleName,
    handleRadioBtn,
    isChecked,
    setIsChecked,
    isDisabled,
    formHandleChange,
  };
}
export default useForm;
