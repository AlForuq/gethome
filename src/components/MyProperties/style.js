import styled, { keyframes } from "styled-components";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

export const Container = styled.div`
  display: flex;
  padding: 0 20px;
  justify-content: space-around;
`;

export const Wrapper = styled.div`
  width: 1365px;
  padding: 0 130px 60px 130px;
  /* border: 1px solid black; */
`;

export const Section = styled.div`
  display: flex;
  padding: 20px 0;
  justify-content: space-between;
`;

export const Table = styled.table`
  width: 100%;
  border: 1px solid #e6e9ec;
  box-shadow: 0px 10px 30px rgba(13, 38, 59, 0.05);
  border-radius: 3px;
`;

export const Th = styled.th``;
export const Tr = styled.tr`
height: 50px;
`;
export const Td = styled.td`
  text-align: center;
  font-weight: 500;
  border: 1px solid #e6e9ec;
  box-shadow: 0px 10px 30px rgba(13, 38, 59, 0.05);
  border-radius: 3px;
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;

  :hover {
    background-color: #e6e9ec;
  }
`;

Icon.Edit = styled(AiFillEdit)`
  font-size: 20px;
`;
Icon.Trash = styled(BsFillTrashFill)`
  font-size: 20px;
`;

const Animation = keyframes`
100%{
  transform: rotate(360deg);
}
`;
export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primaryColor);
  margin: 60px 0px 70px 0px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;
Loading.In = styled.div`
  background-color: var(--primaryColor);
  height: 50px;
  width: 50px;
  border: 6px solid rgba(255, 255, 255, 0.2);
  border-top: 6px solid white;
  border-radius: 50%;
  animation: ${Animation} 0.7s linear infinite;
`;
