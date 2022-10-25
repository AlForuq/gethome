import React from "react";
import { AntCheck, Container } from "./style";

const Checkbox = ({
  children,
  ml,
  mr,
  mt,
  mb,
  onClick,
  size,
  font,
  checked,
  name
}) => {
  return (
    <Container>
      <AntCheck
        font={font}
        checked={checked}
        name={name}
        mr={mr}
        ml={ml}
        mb={mb}
        mt={mt}
        size={size}
        onClick={onClick}
      >
        {children}
      </AntCheck>
    </Container>
  );
};

export default Checkbox;
