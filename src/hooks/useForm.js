import { useState, useCallback } from "react";
import {
  defaultValues,
  defaultInputCheck,
  defaultUserR,
  defaultUserL,
} from "../utils/constants";

function useForm() {
  const [values, setValues] = useState(defaultValues);
  const [error, setError] = useState(defaultValues);
  const [errorRegistration, setErrorRegistration] = useState(defaultUserR);
  const [userData, setUserData] = useState(defaultUserR);
  const [errorLogin, setErrorLogin] = useState(defaultUserL);
  const [userDataL, setUserDataL] = useState(defaultUserL);
  const [isChecked, setIsChecked] = useState(defaultInputCheck);
  const [isDisabled, setIsDisabled] = useState(true);

  // Validation
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

  const validateRegistration = useCallback(
    (inputValidity, inputName) => {
      const newErrors = { ...errorRegistration };
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
      setErrorRegistration(newErrors);
    },
    [errorRegistration]
  );

  const validateLogin = useCallback(
    (inputValidity, inputName) => {
      const newErrors = { ...errorLogin };
      if (!inputValidity) {
        newErrors[inputName] =
          inputName === "email"
            ? "Please provide a valid email adress"
            : "Password is required and must be 8-10 characters";
      } else {
        newErrors[inputName] = "";
      }
      setErrorLogin(newErrors);
    },
    [errorLogin]
  );

  // Change handlers

  const handleChange = useCallback(
    (evt) => {
      const { name, value } = evt.target;
      setUserData({ ...userData, [name]: value });
    },
    [userData]
  );

  const handleChangeSignup = useCallback((evt) => {
    const { name, value } = evt.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  });

  const handleChangeSignin = useCallback((evt) => {
    const { name, value } = evt.target;
    setUserDataL((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  });

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

  const handleSignupInput = useCallback(
    (evt) => {
      const input = evt.target;
      validateRegistration(input.validity.valid, evt.target.name);
      handleChangeSignup(evt);
    },
    [validateRegistration, handleChangeSignup]
  );

  const handleUpdateInput = useCallback(
    (evt) => {
      const input = evt.target;
      validate(input.validity.valid, evt.target.name);
      handleChange(evt);
    },
    [validate, handleChange]
  );

  const handleSigninInput = useCallback(
    (evt) => {
      const input = evt.target;
      validateLogin(input.validity.valid, evt.target.name);
      handleChangeSignin(evt);
    },
    [validateLogin, handleChangeSignin]
  );

  // Form change handlers

  const formHandleChange = useCallback(() => {
    const hasChecked = Object.values(isChecked).some((checked) => checked);
    const noErrors = error.name === "" && error.imageUrl === "";
    setIsDisabled(!(noErrors && hasChecked));
  }, [isChecked, error]);

  const formHandleChangeSignup = useCallback(() => {
    const noErrors =
      errorRegistration.name === "" &&
      errorRegistration.avatar === "" &&
      errorRegistration.password === "" &&
      errorRegistration.email === "";
    setIsDisabled(!noErrors);
  }, [errorRegistration]);

  const formHandleChangeUpdate = useCallback(() => {
    const noErrors =
      errorRegistration.name === "" && errorRegistration.avatar === "";
    setIsDisabled(!noErrors);
  }, [errorRegistration]);

  const formHandleChangeSignin = useCallback(() => {
    const noErrors = errorLogin.password === "" && errorLogin.email === "";
    setIsDisabled(!noErrors);
  }, [errorLogin]);

  return {
    values,
    setValues,
    userData,
    setUserData,
    userDataL,
    error,
    errorRegistration,
    errorLogin,
    handleName,
    handleImage,
    handleRadioBtn,
    handleSigninInput,
    handleSignupInput,
    handleUpdateInput,
    isChecked,
    setIsChecked,
    isDisabled,
    formHandleChange,
    formHandleChangeSignup,
    formHandleChangeUpdate,
    formHandleChangeSignin,
  };
}
export default useForm;
