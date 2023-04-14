import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { FlexColumn } from "../../components/ui/layout";
import { LoginFormPropsType } from "../../typedefs";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import InputLabel from "../../components/InputLabel";
import { API_HOST, MAIL_REG } from "../../constants";
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

    setValue(updateObj);
  };

  const onSubmit = async () => {
    try {
      let errorBus = [];

      //@ts-ignore
      if (value?.password?.data?.value?.length < 8) {
        errorBus.push("PW 글자수가 8미만 입니다!");
      }
      //@ts-ignore
      if (!value.mail.data.value?.match(MAIL_REG)) {
        errorBus.push("ID에 @이가 포함되지 않았습니다.");
      }

      if (errorBus.length) {
        errorBus.forEach((data) => {
          enqueueSnackbar(data, {
            variant: "error",
          });
        });

        return;
      }

      await axios.post(API_HOST + "auth/signup", {
        email: value.mail.data.value,
        password: value.password.data.value,
        headers: {
          "Content-Type": "application/json",
        },
      });

      enqueueSnackbar("회원가입이 성공적으로 완료되었습니다.", {
        variant: "success",
      });

      navigate("/signin");
      return;
    } catch (err) {
      const message =
        //@ts-ignore
        JSON.parse(err.request.response)?.message ||
        "회원가입에 문제가 발생했습니다.";
      console.error(err);
      enqueueSnackbar(message, {
        variant: "error",
      });
    }
  };

  return (
    <Wraper>
      <h1>Sing Up</h1>

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
          />
          <InputLabel
            subject={"Password"}
            onChange={onChange}
            inputProps={value.password.data}
            error={value.password.error}
          />

          <div>
            <Button data-testid="signup-button" onClick={onSubmit}>
              회원가입
            </Button>
          </div>
        </Contents>
      </Card>
      <a
        href="/signin"
        style={{
          marginTop: "20px",
          color: "#4072ff",
          textDecoration: "none",
          fontWeight: 700,
        }}
      >
        로그인
      </a>
      <SnackbarProvider />
    </Wraper>
  );
};

export default Index;
