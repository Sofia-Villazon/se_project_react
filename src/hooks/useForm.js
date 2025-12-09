import { useState } from "react";
import { defaultValues, defaultInputCheck } from "../utils/constants";

function useForm() {
  const [values, setValues] = useState(defaultValues);
  const [error, setError] = useState(defaultValues);
  const [isChecked, setIsChecked] = useState(defaultInputCheck);
  const [isDisabled, setIsDisabled] = useState(true);

  let newErrors = defaultValues;
  let inputChecked = defaultInputCheck;

  const validate = (inputValidity, inputName) => {
    if (!inputValidity) {
      newErrors[inputName] = `write ${inputName}`;
    } else {
      newErrors[inputName] = "";
    }
    setError(newErrors);
  };

  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    console.log(error);
    if (error.name === "" && error.imageUrl === "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  function handleName(evt) {
    const input = evt.target;
    validate(input.validity.valid, evt.target.name);
    handleChange(evt);
  }

  function handleImage(evt) {
    handleChange(evt);
    const input = evt.target;

    validate(input.validity.valid, evt.target.name);
  }

  function handleRadioBtn(evt) {
    handleChange(evt);
    const input = evt.target;
    validate(input.validity.valid, evt.target.name);
    inputChecked[input.value] = true;
    setIsChecked(inputChecked);
  }

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
  };
}
export default useForm;
