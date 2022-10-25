import React from "react";
import { RadioCheck, Container } from "./style";

const Radio = ({ children, ml, mr, mt, mb, onChange, size, font }) => {
  return (
    <RadioCheck
      font={font}
      mr={mr}
      ml={ml}
      mb={mb}
      mt={mt}
      size={size}
      onChange={onChange}
    >
      {children}
    </RadioCheck>
  );
};

export default Radio;
