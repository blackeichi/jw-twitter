import {
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { authService, firebaseInstance } from "../fbase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";

const BackGR = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #999999;
`;
export const Formbox = styled.div`
  width: 570px;
  height: 600px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border-radius: 20px;
  gap: 22px;
`;
const Formtitle = styled.h1`
  font-size: 31px;
  font-weight: 800;
  margin: 8px 0;
`;
const SocialLogin = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 10px 30px;
  width: 300px;
  cursor: pointer;
`;
const SocialLoginText = styled.h1`
  font-weight: 600;
  font-size: 15px;
  color: darkgray;
`;
const InputBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  position: relative;
  padding-top: 20px;
  gap: 22px;
`;
const InputBox_Text = styled.h1`
  position: absolute;
  font-size: px;
  color: rgba(0, 0, 0, 0.6);
  background-color: white;
  font-weight: 700;
  padding: 10px;
  top: -20px;
`;
const InputBox_Input = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  padding: 0 8px;
  box-sizing: border-box;
  font-size: 17px;
  font-weight: 600;
  ::placeholder {
    color: darkgray;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
`;
const InputBox_btn = styled.button`
  border: none;
  background-color: ${(props) => (props.isBlack ? "#272c30" : "white")};
  color: ${(props) => (props.isBlack ? "white" : "#272c30")};
  width: 300px;
  padding: 5px 0;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.1);
`;
const JoinBtn = styled.div``;

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const onSocialLogin = async () => {};
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
    try {
      await signInWithEmailAndPassword(authService, email, password);
    } catch (error) {
      setErrors(error);
      console.log(error);
    }
  };
  return (
    <BackGR>
      <Formbox>
        <FontAwesomeIcon icon={faTwitter} color={"#1D9BF0"} size="2x" />
        <Formtitle>트위터에 로그인하기</Formtitle>
        <SocialLogin>
          <FontAwesomeIcon icon={faGoogle} color={"red"} size="lg" />
          <SocialLoginText>Google 계정으로 계속하기</SocialLoginText>
        </SocialLogin>
        <SocialLogin>
          <FontAwesomeIcon icon={faGithub} color={"black"} size="lg" />
          <SocialLoginText>GitHub 계정으로 계속하기</SocialLoginText>
        </SocialLogin>
        <InputBox onSubmit={onSubmit}>
          <InputBox_Text>또는</InputBox_Text>
          <InputBox_Input
            name="email"
            type="email"
            required
            placeholder="이메일 주소"
            onChange={onChange}
          ></InputBox_Input>
          <InputBox_Input
            name="password"
            type="password"
            required
            placeholder="비밀번호"
          ></InputBox_Input>
          <InputBox_btn isBlack={true}>로그인</InputBox_btn>
        </InputBox>
        <InputBox_btn isBlack={false}>비밀번호를 잊으셨나요?</InputBox_btn>
        <JoinBtn></JoinBtn>
      </Formbox>
    </BackGR>
  );
};
export default Auth;
