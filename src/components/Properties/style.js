import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 130px 60px 130px;
  width: var(--width);
  /* border:1px solid black; */
`;

export const Title = styled.div`
  display: flex;
  width: var(--width);
  width: 100%;
  margin-top: 70px;
  margin-bottom: 15px;
  font-size: 18px;
`;

export const Wrapper = styled.div`
  /* display: flex;
    max-width: var(--width);
    width: wrap;
    flex-wrap: wrap;
    gap: 20px; */

  display: flex;
  flex-direction: column;
  align-items:center;

  margin: 60px 0;
`;

export const Body = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: auto;
  width: 100%;
  /* border: 1px solid black; */
  
`;

export const Message = styled.div`
  display: flex;
  justify-content: center;
  font-size: 28px;
  font-family: sans-serif;
  font-weight: 500;
`;
