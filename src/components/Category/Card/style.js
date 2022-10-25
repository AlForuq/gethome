import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 280px;
  height: 350px;

  :hover {
    cursor: pointer;
  }
`;
export const ImageIcon = styled.img`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
`;
