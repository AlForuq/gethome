import styled from 'styled-components'

const getType = (type) => {
    switch (type) {
        case 'secondary':
            return {
                border: '1px solid #e6e9ec',
                color: '#0D263B',
            };
        case 'primary':
            return {
                background: '#0061DF',
                color: '#FFFFFF',
                border: 'none',
            };
        default:
            return {
                border: '1px solid #E6E9EC',
            }

    }
}

const fixBorder = (borderr) => {
    switch (borderr) {
        case 'open': return {
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                background: '#fff',
                borderBottom: '1px solid #e6e9ec',
                outline: 'none',
                
            };
        default:
            return {
                border: '1px solid #e6e9ec'
            }
    }
}

const Container = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;

    /* font-family: 'Montserrat'; */
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid #e6e9ec;
    /* color: #0d263b; */
    border-radius: 2px;

    padding-left: ${({ pl }) => pl || '15px'};
    
    /* margin-right: ${({ mr }) => `${mr}px`};
    margin-left: ${({ ml }) => `${ml}px`};
    margin-top: ${({ mt }) => `${mt}px`};
    margin-bottom: ${({ mb }) => `${mb}px`};
     */

    height: ${({ height }) => height || '44px'};
    width: ${({ width }) => width || '100%'};
         

    
    ${({ borderr }) => fixBorder(borderr)};
    :focus{
        background: #fff ;
    }

/* ${({ type }) => getType(type)} */
`

const Wrapper = styled.div`
display: flex;
position: relative;
width: 100%;

margin-right: ${({ mr }) => `${mr}px`};
margin-left: ${({ ml }) => `${ml}px`};
margin-top: ${({ mt }) => `${mt}px`};
margin-bottom: ${({ mb }) => `${mb}px`};
`


const Icon = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 30px;
`

export { Container, Wrapper, Icon }