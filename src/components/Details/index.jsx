import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AgreeMent,
  CardWrapper,
  Container,
  Description,
  DetailWrapper,
  Form,
  GridPic,
  IconRadius,
  Info,
  Price,
  Properties,
  TextArea,
  User,
  Section,
  Address,
  Wrapper,
} from "./style";
import One from "../../assets/images/one.png";
import Two from "../../assets/images/two.png";
import Three from "../../assets/images/three.png";
import Four from "../../assets/images/four.png";
import user from "../../assets/images/avatar1.png";
import { Button, Checkbox, Input } from "../Generics";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { TourDate } from "./TourDate";
import { useQuery } from "react-query";
const { REACT_APP_GoogleApiKey: key } = process.env;
const { REACT_APP_BASE_URL: url } = process.env;

export const Details = () => {
  const { id } = useParams();
  // eslint-disable-next-line
  const [map, setMap] = useState(null);
  // const [data, setData] = useState(body);
  const [data, setData] = useState([]);

  useQuery(
    "gethouse by id",
    () =>
      fetch(`${url}/v1/houses/id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
    {
      onSuccess: (res) => {
        console.log(res, "resDETAIL");
        setData(res?.data);
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const [center, setCenter] = useState({
    lat: 41.2995,
    lng: 69.2401,
  });

  const containerStyle = {
    width: "100%",
    height: "600px",
  };

  const onUnMount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
    },
    [center]
  );

  const { isLoaded } = useJsApiLoader({
    id: "edit-house",
    googleMapsApiKey: key,
  });

  const onMapClick = (e) => {
    console.log(e?.latLng?.lat(), "lat");
    console.log(e?.latLng?.lng(), "lat");
    setCenter({
      lat: e?.latLng?.lat(),
      lng: e?.latLng?.lng(),
    });
  };

  return (
    <div className="center">
      <Container>
        <GridPic>
          <GridPic.Main>
            <img
              alt=""
              width={"100%"}
              height={"100%"}
              src={data?.attachments && data?.attachments[0].imgPath}
            />
          </GridPic.Main>
          <GridPic.One>
            <img alt="" width={"100%"} height={"100%"} src={One} />
          </GridPic.One>
          <GridPic.Two>
            <img alt="" width={"100%"} height={"100%"} src={Two} />
          </GridPic.Two>
          <GridPic.Three>
            <img alt="" width={"100%"} height={"100%"} src={Three} />
          </GridPic.Three>
          <GridPic.Four>
            <img alt="" width={"100%"} height={"100%"} src={Four} />
          </GridPic.Four>
        </GridPic>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: "20px",
          }}
        >
          <div style={{ width: "74%" }}>
            <CardWrapper>
              <DetailWrapper>
                <Info>
                  <Info.Title>
                    {" "}
                    {data?.name || "House"}, Category: {data?.category?.name}
                  </Info.Title>
                  <Info.Text>
                    {" "}
                    {data?.address || "Address"}, {data?.region || "City"},{" "}
                    {data?.city || "Country"}, {data?.country || "Country"}
                  </Info.Text>
                </Info>

                <Properties>
                  <Properties.Wrapper>
                    <Properties.Bed />
                    <Info.Text>{data?.houseDetails?.beds || 0} Beds</Info.Text>
                  </Properties.Wrapper>

                  <Properties.Wrapper>
                    <Properties.Bath />
                    <Info.Text>
                      {data?.houseDetails?.bath || 0} Baths{" "}
                    </Info.Text>
                  </Properties.Wrapper>

                  <Properties.Wrapper>
                    <Properties.Garage />
                    <Info.Text>
                      {data?.houseDetails?.garage || 0} Garage{" "}
                    </Info.Text>
                  </Properties.Wrapper>

                  <Properties.Wrapper>
                    <Properties.Ruler />
                    <Info.Text>
                      {data?.houseDetails?.area || 0} Sq Ft{" "}
                    </Info.Text>
                  </Properties.Wrapper>

                  {/* <Properties.Wrapper>
                    <Properties.Year />
                    <Info.Text>
                      Year Built: {data?.houseDetails?.yearBuilt || 0}{" "}
                    </Info.Text>
                  </Properties.Wrapper> */}
                </Properties>
              </DetailWrapper>

              <Price>
                <Properties>
                  <Properties.Wrapper>
                    <IconRadius>
                      <Properties.Share />
                    </IconRadius>
                    <Info.Text>Share</Info.Text>
                  </Properties.Wrapper>

                  <Properties.Wrapper>
                    <IconRadius>
                      <Properties.Love />
                    </IconRadius>
                    <Info.Text>Save</Info.Text>
                  </Properties.Wrapper>
                </Properties>

                <Price.Wrapper>
                  <Price.Origin>${data?.price}/m</Price.Origin>
                  <Price.Now>${data?.salePrice}/m</Price.Now>
                </Price.Wrapper>

                <Info.Text flex={"flex-end"} mt={"4px"}>
                  Est.Mortgage
                </Info.Text>
              </Price>
            </CardWrapper>

            <Description>
              <div style={{ marginBottom: "12px" }} className="subTitle">
                Description
              </div>
              {data?.description}
            </Description>
          </div>

          <Form>
            <User>
              <User.Image src={user} />
              <User.Contact>
                <User.Name>Muhammadamin</User.Name>
                <User.Phone>+998 94 996 76 50</User.Phone>
              </User.Contact>
            </User>

            <Input
              pl={"4px"}
              borderr={"open"}
              placeholder={"Name"}
              height={"27px"}
            />
            <Input
              pl={"4px"}
              borderr={"open"}
              placeholder={"Phone"}
              height={"27px"}
            />
            <Input
              pl={"4px"}
              borderr={"open"}
              placeholder={"Email"}
              height={"27px"}
            />

            <TextArea />
            <AgreeMent>
              <Checkbox />
              <AgreeMent>
                By submitting this form I agree to Terms of Use
              </AgreeMent>
            </AgreeMent>
            <Button type={"primary"}>Send Request</Button>
          </Form>
        </div>

        <Section>
          <div className="subTitle">Location</div>
          <Wrapper>
            <Address.Wrapper>
              <Address>
                <Wrapper.Title>Address:</Wrapper.Title>
                <Info.Text>{data?.address}</Info.Text>
              </Address>

              <Address>
                <Wrapper.Title>State/Country:</Wrapper.Title>
                <Info.Text>-</Info.Text>
              </Address>
            </Address.Wrapper>

            <Address.Wrapper>
              <Address>
                <Wrapper.Title>Area:</Wrapper.Title>
                <Info.Text>{data?.region}</Info.Text>
              </Address>

              <Address>
                <Wrapper.Title>Zip:</Wrapper.Title>
                <Info.Text>{data?.zipCode}</Info.Text>
              </Address>
            </Address.Wrapper>

            <Address.Wrapper>
              <Address>
                <Wrapper.Title>City:</Wrapper.Title>
                <Info.Text>{data?.city}</Info.Text>
              </Address>

              <Address>
                <Wrapper.Title>Country:</Wrapper.Title>
                <Info.Text>{data?.country}</Info.Text>
              </Address>
            </Address.Wrapper>
          </Wrapper>

          <Wrapper>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnMount={onUnMount}
                onClick={onMapClick}
              >
                <Marker position={center} />
              </GoogleMap>
            )}
          </Wrapper>
        </Section>

        <Section>
          <div className="subTitle">Property Details</div>
          <Wrapper>
            <Address.Wrapper>
              <Address>
                <Wrapper.Title>Property ID:</Wrapper.Title>
                <Info.Text>{data?.id}</Info.Text>
              </Address>
              <Address>
                <Wrapper.Title>Price:</Wrapper.Title>
                <Info.Text>${data?.salePrice * 10}</Info.Text>
              </Address>
              <Address>
                <Wrapper.Title>Year Built:</Wrapper.Title>
                <Info.Text>{data?.houseDetails?.area}</Info.Text>
              </Address>
              <Address>
                <Wrapper.Title>Property Size:</Wrapper.Title>
                <Info.Text>{data?.houseDetails?.area} Sq Ft</Info.Text>
              </Address>
            </Address.Wrapper>

            <Address.Wrapper>
              <Address>
                <Wrapper.Title>Bedroom:</Wrapper.Title>
                <Info.Text>{data?.houseDetails?.beds}</Info.Text>
              </Address>
              <Address>
                <Wrapper.Title>Bathroom:</Wrapper.Title>
                <Info.Text>{data?.houseDetails?.bath}</Info.Text>
              </Address>
              <Address>
                <Wrapper.Title>Garage:</Wrapper.Title>
                <Info.Text>{data?.houseDetails?.garage}</Info.Text>
              </Address>
              <Address>
                <Wrapper.Title>Garage size:</Wrapper.Title>
                <Info.Text>{data?.houseDetails?.area / 10} Sqft</Info.Text>
              </Address>
            </Address.Wrapper>

            <Address.Wrapper>
              <Address>
                <Wrapper.Title>Property Type:</Wrapper.Title>
                <Info.Text>{data?.category?.name}</Info.Text>
              </Address>
              <Address>
                <Wrapper.Title>Property Status:</Wrapper.Title>
                <Info.Text>{data?.status ? "For Sale" : "For Rent"}</Info.Text>
              </Address>
            </Address.Wrapper>
          </Wrapper>
        </Section>

        <Section>
          <div className="subTitle">Features</div>
          <Wrapper>
            <Address.Wrapper>
              <Address>
                <IconRadius>
                  <Properties.Air />
                </IconRadius>
                <Info.Text>Air Conditioning</Info.Text>
              </Address>
              <Address>
                <IconRadius>
                  <Properties.Bar />
                </IconRadius>
                <Info.Text>Barbeque</Info.Text>
              </Address>
              <Address>
                <IconRadius>
                  <Properties.Blinds />
                </IconRadius>
                <Info.Text>Window Coverings</Info.Text>
              </Address>
              <Address>
                <IconRadius>
                  <Properties.Chair />
                </IconRadius>
                <Info.Text>Dining Room</Info.Text>
              </Address>
            </Address.Wrapper>

            <Address.Wrapper>
              <Address>
                <IconRadius>
                  <Properties.Dryer />
                </IconRadius>
                <Info.Text>Dryer</Info.Text>
              </Address>
              <Address>
                <IconRadius>
                  <Properties.Grass />
                </IconRadius>
                <Info.Text>Lawn</Info.Text>
              </Address>
              <Address>
                <IconRadius>
                  <Properties.Gym />
                </IconRadius>
                <Info.Text>Gym</Info.Text>
              </Address>
              <Address>
                <IconRadius>
                  <Properties.Laundry />
                </IconRadius>
                <Info.Text>Laundry</Info.Text>
              </Address>
            </Address.Wrapper>

            <Address.Wrapper>
              <Address>
                <IconRadius>
                  <Properties.Liquid />
                </IconRadius>
                <Info.Text>Washer</Info.Text>
              </Address>
              <Address>
                <IconRadius>
                  <Properties.Microwave />
                </IconRadius>
                <Info.Text>Microwave</Info.Text>
              </Address>
              <Address>
                <IconRadius>
                  <Properties.Outdoor />
                </IconRadius>
                <Info.Text>Outdoor Shower</Info.Text>
              </Address>
              <Address>
                <IconRadius>
                  <Properties.Refrigerator />
                </IconRadius>
                <Info.Text>Refrigerator</Info.Text>
              </Address>
            </Address.Wrapper>
            <Address.Wrapper>
              <Address>
                <IconRadius>
                  <Properties.Sauna />
                </IconRadius>
                <Info.Text>Sauna</Info.Text>
              </Address>
              <Address>
                <IconRadius>
                  <Properties.Swimmer />
                </IconRadius>
                <Info.Text>Swimming pool</Info.Text>
              </Address>
              <Address>
                <IconRadius>
                  <Properties.TVcable />
                </IconRadius>
                <Info.Text>TV Cable</Info.Text>
              </Address>
              <Address>
                <IconRadius>
                  <Properties.Wifi />
                </IconRadius>
                <Info.Text>WiFi</Info.Text>
              </Address>
            </Address.Wrapper>
          </Wrapper>
        </Section>
        <TourDate />
      </Container>
    </div>
  );
};
