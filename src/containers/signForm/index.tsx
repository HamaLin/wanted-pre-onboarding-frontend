import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexColumn } from "../../components/ui/layout";
import { InputDataTestidTypes } from "../../types";
import { enqueueSnackbar } from "notistack";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import InputLabel from "../../components/InputLabel";
import { AUTH_KEY_NAME, DATA_TEST_ID, ROUTER_PATH_LIST } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosApi } from "../../apis";
import { snackBarErrorMessage } from "../../services";
import { AxiosResponse } from "axios";

const Wraper = styled(FlexColumn)`
  width: 18%;
  min-width: 350px;
  height: auto;
  max-height: 75%;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Contents = styled(FlexColumn)`
  overflow: overlay;
  padding: 15px;

  > div {
    margin-bottom: 20px;

    :last-of-type {
      margin-bottom: 0;
    }
  }
`;

type SignDataType = {
  dataTestid: InputDataTestidTypes;
  name: "mail" | "password";
  value: string;
};

type SignFromData = {
  mail: SignDataType;
  password: SignDataType;
};

const BASE_VALUE: SignDataType = {
  dataTestid: "email-input",
  name: "mail",
  value: "",
};

const Index = () => {
  const [value, setValue] = useState<SignFromData>({
    mail: BASE_VALUE,
    password: BASE_VALUE,
  });
  const [errorMessage, setErrorMessage] = useState<{
    mail: string | undefined;
    password: string | undefined;
  }>({ mail: undefined, password: undefined });
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();
  const [btnDisable, setBtnDisable] = useState(true);

  const wrongPathChecker = (): boolean => {
    if (ROUTER_PATH_LIST.login === currentPath) return false;
    if (ROUTER_PATH_LIST.signup === currentPath) return false;

    return true;
  };

  const valueInitializer = (): void => {
    const mail: SignDataType = {
      ...BASE_VALUE,
      dataTestid: "email-input",
      name: "mail",
    };

    const password: SignDataType = {
      ...BASE_VALUE,
      dataTestid: "password-input",
      name: "password",
    };

    setValue({ mail: mail, password: password });
  };

  const valueAvailabilityChecker = (name: string, value: string): boolean => {
    switch (name) {
      case "mail":
        const reg = /@/g;
        if (value.match(reg)?.length) return true;
        return false;
      case "password":
        if (value?.length > 7) return true;
        return false;
      default:
        return false;
    }
  };

  const createErrorMessage = (name: string, value: string): string => {
    switch (name) {
      case "mail":
        return "@이 포함되지 않으셨습니다.";
      case "password":
        return "글자수가 8자 미만입니다.";
      default:
        return "알 수 없는 Name 입니다.";
    }
  };

  const buttonAvailability = (newValue: SignFromData): void => {
    if (
      valueAvailabilityChecker(newValue.mail.name, newValue.mail.value) &&
      valueAvailabilityChecker(newValue.password.name, newValue.password.value)
    )
      return setBtnDisable(false);

    return setBtnDisable(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    if (targetName === "mail" || targetName === "password") {
      const newValue = {
        ...value,
        [targetName]: {
          ...value[targetName],
          value: targetValue,
        },
      };

      buttonAvailability(newValue);

      setValue(newValue);
    }

    return;
  };

  const onCheckFormData = (e: any) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    if (
      (targetName === "mail" || targetName === "password") &&
      valueAvailabilityChecker(targetName, targetValue)
    ) {
      setErrorMessage((prev) => ({
        ...prev,
        [targetName]: undefined,
      }));

      return;
    }

    const newMessage = createErrorMessage(targetName, targetValue);

    setErrorMessage((prev) => ({
      ...prev,
      [targetName]: newMessage,
    }));
    setBtnDisable(true);

    return;
  };

  const onSubmit = async () => {
    try {
      let result: AxiosResponse<any, any> | undefined = undefined;
      let successMessage = "";
      let redirectPath = "";

      if (currentPath === ROUTER_PATH_LIST.login) {
        result = await axiosApi("loginSignin", {
          email: value.mail.value,
          password: value.password.value,
        });

        successMessage = "로그인 되셨습니다.";
        redirectPath = ROUTER_PATH_LIST.todo;
      }

      if (currentPath === ROUTER_PATH_LIST.signup) {
        result = await axiosApi("loginSignup", {
          email: value.mail.value,
          password: value.password.value,
        });

        successMessage = "회원가입 되셨습니다.";
        redirectPath = ROUTER_PATH_LIST.login;
      }

      if (result?.data)
        localStorage.setItem(
          AUTH_KEY_NAME,
          `Bearer ${result.data[AUTH_KEY_NAME]}`
        );

      enqueueSnackbar(successMessage, {
        variant: "success",
      });

      window.location.href = redirectPath;
    } catch (err) {
      snackBarErrorMessage("로그인에 실패했습니다.", err);
    }
  };

  useEffect(() => {
    if (wrongPathChecker()) return navigate(ROUTER_PATH_LIST.login);
    valueInitializer();
  }, []);

  return (
    <Wraper>
      <h1>{currentPath === ROUTER_PATH_LIST.login ? "Login" : "Sign Up"}</h1>

      <Card
        style={{
          flexGrow: 1,
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Contents>
          <InputLabel
            subject={"Email"}
            label={errorMessage.mail}
            onChange={onChange}
            dataTestid={value.mail.dataTestid}
            name={value.mail.name}
            value={value.mail.value}
            onBlur={onCheckFormData}
          />
          <InputLabel
            subject={"Password"}
            label={errorMessage.password}
            onChange={onChange}
            dataTestid={value.password.dataTestid}
            name={value.password.name}
            value={value.password.value}
            type={"password"}
            onBlur={onCheckFormData}
          />

          <div>
            <Button
              dataTestid={
                currentPath === ROUTER_PATH_LIST.login
                  ? DATA_TEST_ID.loginButton
                  : DATA_TEST_ID.signupButton
              }
              disabled={btnDisable}
              onClick={onSubmit}
            >
              {currentPath === ROUTER_PATH_LIST.login ? "로그인" : "회원가입"}
            </Button>
          </div>
        </Contents>
      </Card>
      <a
        href={
          currentPath === ROUTER_PATH_LIST.login
            ? ROUTER_PATH_LIST.signup
            : ROUTER_PATH_LIST.login
        }
        style={{
          marginTop: "20px",
          color: "#4072ff",
          textDecoration: "none",
          fontWeight: 700,
        }}
      >
        {currentPath === ROUTER_PATH_LIST.login ? "회원가입" : "로그인"}
      </a>
    </Wraper>
  );
};

export default Index;
