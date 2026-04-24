import { useState, useCallback } from "react";
import { defaultInputCheck, defaultClothValues } from "../utils/constants";

function useForm(defaultValues, values) {
  const [error, setError] = useState(defaultValues);
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Validation
  const validate = useCallback(
    (inputValidity, inputName) => {
      const newErrors = { ...error };
      if (!inputValidity) {
        newErrors[inputName] =
          inputName === "name"
            ? "Name is required and must be 2-40 characters"
            : inputName === "password"
              ? "Password is required and must be 8-10 characters"
              : inputName === "email"
                ? "Please provide a valid email adress"
                : "Please provide a valid URL";
      } else {
        newErrors[inputName] = "";
      }
      setError(newErrors);
    },
    [error]
  );

  const handleChange = useCallback(
    (evt, setFunction) => {
      const { name, value } = evt.target;
      setFunction((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    [values]
  );
  const handleInput = useCallback(
    (evt, setFunction) => {
      const input = evt.target;
      validate(input.validity.valid, evt.target.name);
      // console.log(error);
      handleChange(evt, setFunction);
    },
    [validate, handleChange]
  );

  const handleRadioBtn = useCallback(
    (evt, setFunction) => {
      handleChange(evt, setFunction);
      setIsChecked(true);
    },
    [handleChange]
  );

  const formHandleChange = useCallback(() => {
    const noErrors = Object.values(error).every((v) => v === "");
    console.log(noErrors);
    // console.log(error);
    setIsDisabled(!noErrors);
  }, [error]);

  return {
    error,
    handleInput,
    handleRadioBtn,
    isChecked,
    setIsChecked,
    setIsDisabled,
    isDisabled,
    formHandleChange,
  };
}
export default useForm;
