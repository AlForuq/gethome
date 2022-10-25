import React from "react";
import { Card } from "./Card";
import { Cards, Container, Wrapper } from "./style";
// import AliceCarousel from "react-alice-carousel";
import office from "../../assets/Category/Office.png";
import house from "../../assets/Category/House.png";
import villa from "../../assets/Category/Villas.png";
import apartment from "../../assets/Category/Apart.png";

import villaSvg from "../../assets/Category/villa.png";
import apartmentSvg from "../../assets/Category/apartment.png";
import houseSvg from "../../assets/Category/home.png";
import officeSvg from "../../assets/Category/business.png";

// import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

// const { REACT_APP_BASE_URL: url } = process.env;
export const Categories = () => {
  const navigate = useNavigate();
  // const [item, setItem] = useState([]);

  const onSelect = (id) => {
    navigate(`/properties?category_id=${id}`);
  };

  const mockData = [
    { id: 2, name: "Villa", img: villa, svg: villaSvg },
    { id: 4, name: "Cottage", img: apartment, svg: apartmentSvg },
    { id: 1, name: "House", img: house, svg: houseSvg },
    { id: 65, name: "Office", img: office, svg: officeSvg },
  ];

  /* getting category's NAME [Villa, Hovli and others] in Card */
  // useQuery(
  //   [],
  //   () => {
  //     return fetch(`${url}/v1/categories/list`).then((res) => res.json());
  //   },

  //   {
  //     // refetchOnWindowFocus: false
  //     onSuccess: (res) => {
  //       console.log(res, "rescateg");
  //       let list = res?.data?.map((value) => {
  //         return (
  //           <Card onClick={() => onSelect(value.id)} title={value?.name} />
  //         );
  //       });
  //       setItem(list);
  //     },
  //     refetchOnWindowFocus: false,
  //     keepPreviousData: true,
  //   }
  // );
  // const slider = useRef();
  // console.log(item, 'state')

  return (
    <Container className="nocopy">
      <div className="title center">Category </div>
      <div className="description center">
        The Houses that You Want and dream!!!
      </div>

      <Wrapper>
       
        <Cards>
          {mockData.map((value) => {
            return (
              <Card
                svg={value?.svg}
                title={value?.name}
                img={value?.img}
                onClick={() => {
                  onSelect(value?.id);
                }}
              />
            );
          })}
          {/* <AliceCarousel
                        ref={slider}
                        items={item}
                        arrows={false}
                        autoWidth
                        mouseTracking
                    />

                    <ArrowLeft onClick={() => slider.current?.slideNext()} >
                        &rang;
                    </ArrowLeft>

                    <ArrowRight onClick={() => slider.current?.slidePrev()} >
                        &lang;
                    </ArrowRight> */}
        </Cards>
      </Wrapper>
    </Container>
  );
};
