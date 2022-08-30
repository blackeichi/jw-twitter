import {
  faHome,
  faMoon,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { darkState } from "../atom";

const Ul = styled.ul`
  position: fixed;
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 40px 0;
  gap: 25px;
`;

const IconBtn = styled.div`
  font-size: 20px;
  color: white;
  background-color: #22b2da;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Navigations = ({ userObj }) => {
  const [dark, setDark] = useRecoilState(darkState);
  const onClick = () => {
    setDark((prev) => !prev);
  };
  //console.log(dark);
  return (
    <nav>
      <Ul>
        <li>
          <Link to="/">
            <IconBtn>
              <FontAwesomeIcon icon={faHome} />
            </IconBtn>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <IconBtn>
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
