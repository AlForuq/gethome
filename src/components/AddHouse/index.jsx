import React, { useEffect, useState } from "react";
import { Container, Section, Title, Wrapper } from "./style";
import { Checkbox, Input } from "../Generics";
import { Radio, Select } from "antd";
import { Button } from "../Generics";
import { useMutation, useQuery } from "react-query";
import { useHttp } from "../../Hooks/useHttp";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import Karta from "../YMap";
const { Option } = Select;
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// import { Footer } from "../Footer";
// const { REACT_APP_GoogleApiKey: key } = process.env;

const { REACT_APP_BASE_URL: url } = process.env;

export const AddHouse = () => {
  const [data, setData] = useState({
    address: "",
    attachments: [
      {
        imgPath: "",
      },
    ],
    categoryId: 0,
    city: "",
    componentsDto: {
      additional: "string",
      airCondition: false,
      courtyard: false,
      furniture: false,
      gasStove: false,
      internet: false,
      tv: false,
    },
    country: "",
    description: "",
    favorite: true,
    homeAmenitiesDto: {
      additional: "string",
      busStop: false,
      garden: false,
      market: false,
      park: false,
      parking: false,
      school: false,
      stadium: false,
      subway: false,
      superMarket: false,
    },
    houseDetails: {
      area: "",
      bath: "",
      beds: "",
      garage: "",
      room: "",
      yearBuilt: "",
    },
    locations: {
      latitude: 0,
      longitude: 0,
    },
    name: "",
    price: "",
    region: "",
    salePrice: "",
    status: true,
    zipCode: "",
  });

  const { request } = useHttp();
  const navigate = useNavigate();
  // const location = useLocation();
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState(null);
  useQuery(
    "get single item",
    () => {
      return (
        id &&
        fetch(`${url}/v1/houses/id/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        }).then((res) => res.json())
      );
    },
    {
      onSuccess: (res) => {
        // console.log(res, "reska");
        setCategoryName(res?.data?.category?.name);
        id && setData(res?.data, "res?.data");
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
  // useQuery(
  //   "",
  //   () => request({ url: "v1/houses/me", token: true }),

  //   {
  //     onSuccess: (res) => {
  //       console.log(res, "reks");
  //       res?.data?.map((value) => {
  //         if (value.id == id) {
  //           setData(value);
  //         }
  //       });
  //     },
  //     refetchOnWindowFocus: false,
  //     keepPreviousData: true,
  //   }
  // );

  const { mutate } = useMutation(() =>
    request({
      url: `v1/houses`,
      token: true,
      method: "POST",
      body: data,
    })
  );

  const { mutate: update } = useMutation(
    (id) =>
      id &&
      request({
        url: `v1/houses/${id}`,
        token: true,
        method: "PUT",
        body: data,
      })
  );

  const onSubmit = () => {
    if (id) {
      update(id, {
        onSuccess: (res) => {
          // console.log(res, "update");
          if (res?.success) {
            navigate("/profile/properties");
          } else {
            message.error("something is wrong");
          }
        },
      });
    } else {
      mutate("", {
        onSuccess: (res) => {
          // console.log(res, "addnew");
          if (res.success) {
            message.info("Successfully added");
            navigate("/profile/properties");
          } else {
            message.error("something is wrong");
          }
        },
      });
    }
  };

  // const { isLoaded } = useJsApiLoader({
  //   id: id ? "add-house" : "edit-house",
  //   googleMapsApiKey: key,
  // });

  const onChange = ({ target }) => {
    const { value, name } = target;
    setData({ ...data, [name]: value });
  };

  const onDetailChange = ({ target }) => {
    const { value, name } = target;
    setData({
      ...data,
      houseDetails: { ...data?.houseDetails, [name]: value },
    });
  };

  const onImg = ({ target }) => {
    const { name, value } = target;
    console.log(data?.attachments, "data?.attachments");
    setData({
      ...data,
      attachments: [{ ...data.attachments[0], [name]: value }],
    });
  };

  const onChangeRadio = () => {
    setData({
      ...data,
      status: !data?.status,
    });
  };

  const [categories, setCategories] = useState("");
  useQuery(
    "getHouses",
    () =>
      fetch(`${url}/v1/categories/list`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
    {
      onSuccess: (res) => {
        setCategories(res);
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const selectCategoryId = (id) => {
    // setCategId(id);
    setData({
      ...data,
      categoryId: id,
    });
  };


  const componentsDtoHandle = ({ target }) => {
    const { name, checked } = target;
    setData({
      ...data,
      componentsDto: { ...data.componentsDto, [name]: checked },
    });
  };

  const homeAmenitiesDtoHandle = ({ target }) => {
    const { name, checked } = target;
    setData({
      ...data,
      homeAmenitiesDto: { ...data.homeAmenitiesDto, [name]: checked },
    });
  };

  const [categId, setCategId] = useState(null);
  useEffect(() => {
    // eslint-disable-next-line
    categories?.data?.map((value) => {
      if (value.name === categoryName) {
        setCategId(value.id);
      }
    });
  });

  return (
    <div className="center">
      <Container>
        <Title>{id ? "Update The Property" : "Add New Property"}</Title>

        <div style={{ display: "flex" }}>
          <div onChange={onChangeRadio}>
            <Radio
              onChange={onChangeRadio}
              checked={data?.status}
              value={"Sal"}
            >
              Sale
            </Radio>
            <Radio
              onChange={onChangeRadio}
              checked={!data?.status}
              value={"Ren"}
            >
              Rent
            </Radio>
          </div>
        </div>

        <Section>
          <div className="subTitle">Contact Information</div>
          <Wrapper>
            <Input
              value={data?.name}
              name={"name"}
              placeholder={"Property Title"}
              onChang={onChange}
              borderr={"open"}
              height={"30px"}
            />

            <Select
              style={{ minWidth: "131px", height: "44px" }}
              name=""
              id=""
              value={Number(data?.categoryId) || Number(categId) || "Category"}
              onChange={selectCategoryId}
            >
              {categories?.data?.map((value) => {
                return (
                  <Option key={value.id} value={value.id}>
                    {value?.name}
                  </Option>
                );
              })}
            </Select>
          </Wrapper>
          <Wrapper>
            <Input
              value={data?.description}
              name={"description"}
              placeholder={"Property Description"}
              onChang={onChange}
              borderr={"open"}
              height={"30px"}
            />
          </Wrapper>
        </Section>

        <Section>
          <div className="subTitle">Additional</div>

          <Wrapper>
            <Input
              name={"beds"}
              value={data?.houseDetails?.beds}
              onChang={onDetailChange}
              borderr={"open"}
              height={"30px"}
              placeholder={"Beds"}
            />
            <Input
              name={"bath"}
              value={data?.houseDetails?.bath}
              onChang={onDetailChange}
              borderr={"open"}
              height={"30px"}
              placeholder={"Bath"}
            />
            <Input
              name={"garage"}
              value={data?.houseDetails?.garage}
              onChang={onDetailChange}
              borderr={"open"}
              height={"30px"}
              placeholder={"Garage"}
            />
          </Wrapper>
          <Wrapper>
            <Input
              name={"room"}
              value={data?.houseDetails?.room}
              onChang={onDetailChange}
              borderr={"open"}
              height={"30px"}
              placeholder={"Room"}
            />
            <Input
              name={"area"}
              value={data?.houseDetails?.area}
              onChang={onDetailChange}
              borderr={"open"}
              height={"30px"}
              placeholder={"Area (Sq Ft)"}
            />
            <Input
              name={"yearBuilt"}
              type={"number"}
              value={data?.houseDetails?.yearBuilt}
              onChang={onDetailChange}
              borderr={"open"}
              height={"30px"}
              placeholder={"Year built"}
            />
          </Wrapper>
        </Section>

        <Section>
          <div className="subTitle">Price</div>
          <Wrapper>
            <Input
              value={data?.salePrice}
              type={"number"}
              onChang={onChange}
              name={"salePrice"}
              placeholder={"Sale Price (discounted)"}
            />
            <Input
              value={data?.price}
              type={"number"}
              onChang={onChange}
              name={"price"}
              placeholder={"Price"}
            />
          </Wrapper>
        </Section>

        <Section>
          <div className="subTitle">Location</div>
          <Wrapper>
            <Input
              value={data?.address}
              name={"address"}
              onChang={onChange}
              borderr={"open"}
              height={"30px"}
              placeholder={"Address"}
            />
            <Input
              value={data?.region}
              name={"region"}
              onChang={onChange}
              borderr={"open"}
              height={"30px"}
              placeholder={"Region"}
            />
            <Input
              value={data?.city}
              name={"city"}
              onChang={onChange}
              borderr={"open"}
              height={"30px"}
              placeholder={"City"}
            />
            <Input
              value={data?.country}
              name={"country"}
              placeholder={"Country"}
              onChang={onChange}
              borderr={"open"}
              height={"30px"}
            />
            <Input
              value={data?.zipCode}
              name={"zipCode"}
              placeholder={"zip Code"}
              onChang={onChange}
              borderr={"open"}
              height={"30px"}
            />
          </Wrapper>
          {/* <Wrapper>
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
          </Wrapper> */}
          <Karta data={data} setData={setData} />
        </Section>

        <Section>
          <div className="subTitle">Photos</div>
          <Wrapper>
            <Input
              name={"imgPath"}
              value={data?.attachments && data?.attachments[0]?.imgPath}
              placeholder={"Paste an image link"}
              onChang={onImg}
            />
          </Wrapper>
        </Section>

        <Section>
          {" "}
          <div className="subTitle">Amenity</div>
          <Wrapper>
            <Wrapper.Child>
              <Checkbox
                name={"airCondition"}
                checked={data?.componentsDto?.airCondition}
                onClick={componentsDtoHandle}
              >
                airCondition
              </Checkbox>
              <Checkbox
                name={"furniture"}
                checked={data?.componentsDto?.furniture}
                onClick={componentsDtoHandle}
              >
                furniture
              </Checkbox>
              <Checkbox
                name={"gasStove"}
                checked={data?.componentsDto?.gasStove}
                onClick={componentsDtoHandle}
              >
                gasStove
              </Checkbox>
            </Wrapper.Child>
            <Wrapper.Child>
              <Checkbox
                name={"internet"}
                checked={data?.componentsDto?.internet}
                onClick={componentsDtoHandle}
              >
                internet
              </Checkbox>
              <Checkbox
                name={"tv"}
                checked={data?.componentsDto?.tv}
                onClick={componentsDtoHandle}
              >
                tv
              </Checkbox>
              <Checkbox
                name={"courtyard"}
                checked={data?.componentsDto?.courtyard}
                onClick={componentsDtoHandle}
              >
                courtyard
              </Checkbox>
            </Wrapper.Child>
            <Wrapper.Child>
              <Checkbox
                name={"garden"}
                checked={data?.homeAmenitiesDto?.garden}
                onClick={homeAmenitiesDtoHandle}
              >
                garden
              </Checkbox>
              <Checkbox
                name={"market"}
                checked={data?.homeAmenitiesDto?.market}
                onClick={homeAmenitiesDtoHandle}
              >
                market
              </Checkbox>
              <Checkbox
                name={"park"}
                checked={data?.homeAmenitiesDto?.park}
                onClick={homeAmenitiesDtoHandle}
              >
                park
              </Checkbox>
            </Wrapper.Child>
            <Wrapper.Child>
              <Checkbox
                name={"parking"}
                checked={data?.homeAmenitiesDto?.parking}
                onClick={homeAmenitiesDtoHandle}
              >
                parking
              </Checkbox>
              <Checkbox
                name={"school"}
                checked={data?.homeAmenitiesDto?.school}
                onClick={homeAmenitiesDtoHandle}
              >
                school
              </Checkbox>
              <Checkbox
                name={"stadium"}
                checked={data?.homeAmenitiesDto?.stadium}
                onClick={homeAmenitiesDtoHandle}
              >
                stadium
              </Checkbox>
            </Wrapper.Child>
            <Wrapper.Child>
              <Checkbox
                name={"subway"}
                checked={data?.homeAmenitiesDto?.subway}
                onClick={homeAmenitiesDtoHandle}
              >
                subway
              </Checkbox>
              <Checkbox
                name={"superMarket"}
                checked={data?.homeAmenitiesDto?.superMarket}
                onClick={homeAmenitiesDtoHandle}
              >
                superMarket
              </Checkbox>
              <Checkbox
                name={"busStop"}
                checked={data?.homeAmenitiesDto?.busStop}
                onClick={homeAmenitiesDtoHandle}
              >
                busStop
              </Checkbox>
            </Wrapper.Child>
          </Wrapper>
        </Section>

        <Button type={"primary"} width={150} onClick={onSubmit}>
          {id ? "Update" : "Submit"}
        </Button>
      </Container>
    </div>
  );
};
