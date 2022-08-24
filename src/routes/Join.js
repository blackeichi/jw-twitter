import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  BackGR,
  ErrorMsg,
  Formbox,
  Formtitle,
  InputBox_btn,
  InputBox_Input,
} from "./Auth";

const InputBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 420px;
  position: relative;
  padding-top: 20px;
  gap: 22px;
`;

const Join = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    let data;
    try {
      data = await createUserWithEmailAndPassword(auth, email, password);
      history("/");
    } catch (error) {
      console.log(error);
      setErrors("해당 이메일/패스워드로 회원가입을 할 수 없습니다.");
    }
  };
  return (
    <BackGR>
      <Formbox style={{ alignItems: "center", justifyContent: "center" }}>
        <Formtitle>계정을 생성하세요</Formtitle>
        <InputBox onSubmit={onSubmit}>
          <InputBox_Input
            placeholder="이메일"
            onChange={onChange}
            name="email"
            type="email"
            required
          ></InputBox_Input>
          <InputBox_Input
            placeholder="비밀번호"
            onChange={onChange}
            type="password"
            name="password"
            required
          ></InputBox_Input>
          <ErrorMsg style={{ bottom: "68px" }}>{errors}</ErrorMsg>
          <InputBox_btn
            isBlack={true}
            style={{ marginTop: "25px", width: "100%", height: "50px" }}
          >
            회원가입
          </InputBox_btn>
        </InputBox>
      </Formbox>
    </BackGR>
  );
};
export default Join;
