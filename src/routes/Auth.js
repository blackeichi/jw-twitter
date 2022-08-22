import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";

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
`;

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <BackGR>
      <Formbox>
        <FontAwesomeIcon icon={faTwitter} color={"#1D9BF0"} size="2x" />
      </Formbox>
    </BackGR>
  );
};
export default Auth;
