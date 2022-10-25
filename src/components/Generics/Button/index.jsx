import React from 'react'
import { Container } from './style'
const Button = ({
    children,
    onClick,
    height,
    width,
    type,
    mr,
    ml,
    mb,
    mt,
}) => {   
    return (
        <Container className='nocopy'
            mr={mr}
            ml={ml}
            mb={mb}
            mt={mt}
            type={type}
            width={width}
            height={height}
            onClick={onClick}
            // children={children}
        >
            {children}
        </Container>
    )
}


export default  Button