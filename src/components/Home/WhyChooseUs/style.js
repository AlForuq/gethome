import styled from "styled-components";
import { ReactComponent as homeSvg } from "../../../assets/svgs/HomeSvg.svg";
import { ReactComponent as MobileSvg } from "../../../assets/svgs/MobileSvg.svg";
import { ReactComponent as NeighbourhoodSvg } from "../../../assets/svgs/NeighbourhoodSvg.svg";
import { ReactComponent as SmileSvg } from "../../../assets/svgs/SmileSvg.svg";
export const Container = styled.div`
  width: 1349px;
  height: 434px;
  padding: 48px 131px;
  background: #f5f7fc;
  text-align: center;
`;

export const Wrapper = styled.div`
  display: flex;
  margin-top: 40px;
  height: fit-content;
  justify-content: space-between;
`;

export const Factor = styled.div`
  display: flex;
  flex-direction: column;
  gap:24px;
  align-items:center;
`;

export const Description = styled.div`
  height: 120px;
  width: 235px;

  padding: 3px;
`;
export const Icon = styled.div`
  /* margin-bottom: 24px; */
`;

Icon.SmileSvg = styled(SmileSvg)``;
Icon.HomeSvg = styled(homeSvg)``;
Icon.MobileSvg = styled(MobileSvg)``;
Icon.NeighbourhoodSvg = styled(NeighbourhoodSvg)``;
