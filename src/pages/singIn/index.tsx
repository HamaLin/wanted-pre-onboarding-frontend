import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FlexColumn } from "../../components/ui/layout";
import { LoginFormPropsType } from "../../typedefs";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import InputLabel from "../../components/InputLabel";
import { API_HOST, AUTH_KEY_NAME, MAIL_REG } from "../../constants";
import { useNavigate } from "react-router-dom";

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

const Index = () => {
  const [value, setValue] = useState<LoginFormPropsType>({
    mail: {
      data: {
        dataTestid: "email-input",
        name: "mail",
        value: "",
      },
    },
    password: {
      data: {
        dataTestid: "password-input",
        name: "password",
        value: "",
        inputType: "password",
      },
    },
  });
  const navigate = useNavigate();
  const [btnDisable, setBtnDisable] = useState(true);

  const onChange = (e: any) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    let disable = true;

    let updateObj = {
      ...value,
      [targetName]: {
        data: {
          //@ts-ignore
          ...value[targetName].data,
          value: targetValue,
        },
      },
    };

    if (
      //@ts-ignore
      updateObj?.password?.data?.value?.length > 8 &&
      //@ts-ignore
      updateObj?.mail?.data?.value?.match(MAIL_REG)?.length > 0
    )
      disable = false;

    setBtnDisable(disable);
    setValue(updateObj);
  };

  const onBlue = (e: any) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    let errorObj = {
      active: false,
      errorMessage: "",
    };

    //@ts-ignore
    if (!value.mail.data.value?.match(MAIL_REG) && targetName === "mail") {
      errorObj = {
        active: true,
        errorMessage: "@이 포함되지 않았습니다!",
      };
    }

    //@ts-ignore
    if (value?.password?.data?.value?.length < 8 && targetName === "password") {
      errorObj = {
        active: true,
        errorMessage: "글자수가 8미만 입니다!",
      };
    }

    setValue((prev) => ({
      ...prev,
      [targetName]: {
        data: {
          //@ts-ignore
          ...prev[targetName].data,
        },
        error: errorObj,
      },
    }));
  };

  const onSubmit = async () => {
    try {
      const result = await axios.post(API_HOST + "auth/signin", {
        email: value.mail.data.value,
        password: value.password.data.value,
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem(
        AUTH_KEY_NAME,
        `Bearer ${result.data[AUTH_KEY_NAME]}`
      );

      enqueueSnackbar("로그인 되셨습니다!", {
        variant: "success",
        preventDuplicate: true,
      });

      navigate("/todo");
    } catch (err) {
      const message =
        //@ts-ignore
        JSON.parse(err.request.response)?.message || "로그인에 실패했습니다.";
      console.error(err);
      enqueueSnackbar(message, {
        variant: "error",
        preventDuplicate: true,
      });
    }
  };

  return (
    <Wraper>
      <h1>Login</h1>

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
            onChange={onChange}
            inputProps={value.mail.data}
            error={value.mail.error}
            onBlur={onBlue}
          />
          <InputLabel
            subject={"Password"}
            onChange={onChange}
            inputProps={value.password.data}
            error={value.password.error}
            onBlur={onBlue}
          />

          <div>
            <Button
              data-testid="signin-button"
              disabled={btnDisable}
              onClick={onSubmit}
            >
              로그인
            </Button>
          </div>
        </Contents>
      </Card>
      <a
        href="/singup"
        style={{
          marginTop: "20px",
          color: "#4072ff",
          textDecoration: "none",
          fontWeight: 700,
        }}
      >
        회원가입
      </a>
      <SnackbarProvider />
    </Wraper>
  );
};

export default Index;
