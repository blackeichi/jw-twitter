import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faMoon,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { darkState } from "../atom";

const Ul = styled.ul`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 40px 0;
  gap: 25px;
`;

const IconBtn = styled.div`
  font-size: 22px;
  color: #22b2da;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Navigations = ({ userObj }) => {
  const [dark, setDark] = useRecoilState(darkState);
  const location = useLocation();
  const onClick = () => {
    setDark((prev) => !prev);
  };
  //console.log(dark);
  return (
    <nav>
      <Ul>
        <li>
          <Link to="/">
            <IconBtn
              style={
                location.pathname === "/"
                  ? { backgroundColor: "#22b2da", color: "white" }
                  : {}
              }
            >
              <FontAwesomeIcon icon={faTwitter} />
            </IconBtn>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <IconBtn
              style={
                location.pathname === "/profile"
                  ? { backgroundColor: "#22b2da", color: "white" }
                  : {}
              }
            >
              <FontAwesomeIcon icon={faUser} />
            </IconBtn>
          </Link>
        </li>
        <li>
          <IconBtn onClick={onClick}>
            {!dark ? (
              <FontAwesomeIcon icon={faMoon} />
            ) : (
              <FontAwesomeIcon icon={faSun} />
            )}
          </IconBtn>
        </li>
      </Ul>
    </nav>
  );
};
export default Navigations;
