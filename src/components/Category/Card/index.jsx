import React from "react";
import { Container, Image, ImageIcon, Title } from "./style";
export const Card = ({ title, onClick, img, svg }) => {
  return (
    
      <Container onClick={onClick}>
        <ImageIcon src={svg} />
        <Title>{title}</Title>
        <Image src={img} />
      </Container>
  
  );
};
