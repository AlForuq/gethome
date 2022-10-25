import React from "react";
import {
  Container,
  Description,
  Factor,
  Icon,
  Wrapper,
} from "./style";

export const WhyChooseUs = () => {
  return (
    <Container>
      <div className="title">Why Choose Us?</div>
      <div className="description">
        Nulla quis curabitur velit volutpat auctor bibendum consectetur sit.
      </div>

      <Wrapper>
        <Factor>
          <Icon.SmileSvg />
          <div>
            <div className="subTitle">Trusted By Thousands</div>
            <Description className="description">
              With over 1 million+ homes for sale available on the website,
              Trulia can match you with a house you will want to call home.
            </Description>
          </div>
        </Factor>

        <Factor>
          <Icon.HomeSvg />
          <div>
            <div className="subTitle">Wide Range Of Properties</div>
            <Description className="description">
              With over 1 million+ homes for sale available on the website,
              Trulia can match you with a house you will want to call home.
            </Description>
          </div>
        </Factor>

        <Factor>
          <Icon.MobileSvg />
          <div>
            <div className="subTitle">Financing Made Easy</div>
            <Description className="description">
              With over 1 million+ homes for sale available on the website,
              Trulia can match you with a house you will want to call home.
            </Description>
          </div>
        </Factor>

        <Factor>
          <Icon.NeighbourhoodSvg />
          <div>
            <div className="subTitle">See Neighborhoods</div>
            <Description className="description">
              With over 1 million+ homes for sale available on the website,
              Trulia can match you with a house you will want to call home.
            </Description>
          </div>
        </Factor>
      </Wrapper>
    </Container>
  );
};
