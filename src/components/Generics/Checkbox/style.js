import styled from "styled-components";
import { Checkbox } from "antd";
import  { CheckboxChangeEvent } from 'antd/es/checkbox';

export const Container = styled.div``;

export const AntCheck = styled(Checkbox)`
  font-family: ${({ font }) => (font ? font : "Montserrat")};
  font-style: normal;
  font-weight: 500;
  letter-spacing: 2px;
  font-size: 14px;
  line-height: 20px;

  margin-right: ${({ mr }) => `${mr}px`};
  margin-left: ${({ ml }) => `${ml}px`};
  margin-top: ${({ mt }) => `${mt}px`};
  margin-bottom: ${({ mb }) => `${mb}px`};
`;
