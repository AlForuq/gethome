import React, { useEffect, useState } from "react";
import { Popover, Select } from "antd";
import { Button, Input } from "../Generics";
import { Advanced, Container, Icon, Section } from "./style";
import { UseReplace } from "../../Hooks/useReplace";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { UseSearch } from "../../Hooks/useSearch";
const { REACT_APP_BASE_URL: url } = process.env;
const { Option } = Select;

export const Filter = () => {
  
  const query = UseSearch();
  // const { search } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState("Category");

  const [state, setState] = useState({
    region: query.get("region"),
    city: query.get("city"),
    country: query.get("country"),
    zip_code: query.get("zip_code"),
    address: query.get("address"),
    house_name: query.get("house_name"),
    room: query.get("room"),
    min_price: query.get("min_price"),
    max_price: query.get("max_price"),
  });

  const { data } = useQuery(
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
        // console.log(res, 'data');
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const onChangeHandle = ({ target: { value, name } }) => {
    navigate(UseReplace(name, value));
    setState({
      ...state,
      [name]: value,
    });
  };

  const onClear = () => {
    setState({
      region: "",
      city: "",
      country: "",
      zip_code: "",
      address: "",
      house_name: "",
      room: "",
      min_price: "",
      max_price: "",
    });
    navigate("/properties");
  };

  const onSearchLocation = () => {
    if (location.pathname === '/home') {
      navigate('/properties')
    }
  };

  const onSelect = (id) => {
    setCategory(id);
    navigate(`${UseReplace("category_id", id)}`);
  };

  useEffect(() => {
    setCategory(query.get("category_id"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get("category_id")]);
  const advancedSearch = (
    <Advanced>
      <Advanced.Title>Adress</Advanced.Title>
      <Section>
        <Input
          onChang={onChangeHandle}
          name="region"
          placeholder={"Region"}
          value={state.region}
        />
        <Input
          onChang={onChangeHandle}
          name="city"
          placeholder={"City"}
          value={state.city}
        />
        <Input
          onChang={onChangeHandle}
          name="country"
          placeholder={"Country"}
          value={state.country}
        />
        <Input
          onChang={onChangeHandle}
          name="zip_code"
          placeholder={"Zip Code"}
          value={state.zip_code}
        />
      </Section>

      <Advanced.Title>Apartment Info</Advanced.Title>
      <Section>
        <Input
          onChang={onChangeHandle}
          name="address"
          placeholder={"Address"}
          value={state.address}
        />
        <Input
          onChang={onChangeHandle}
          name="house_name"
          placeholder={"House Name"}
          value={state.house_name}
        />
        <Input
          onChang={onChangeHandle}
          name="room"
          placeholder={"Rooms"}
          value={state.room}
        />
      </Section>

      <Advanced.Title>Price</Advanced.Title>

      <Section>
        <Input
          onChang={onChangeHandle}
          name="min_price"
          placeholder={"Min price"}
          value={state.min_price}
        />
        <Input
          onChang={onChangeHandle}
          name="max_price"
          placeholder={"Max price"}
          value={state.max_price}
        />

        <Select
          style={{ minWidth: "131px", height: "44px" }}
          name=""
          id=""
          value={Number(category) || "Category"}
          onChange={onSelect}
        >
          {data?.data?.map((value) => {
            return (
              <Option key={value.id} value={value.id}>
                {value?.name}
              </Option>
            );
          })}
        </Select>
      </Section>

      <Section>
        <Button onClick={onClear} width={"131px"} ml={20} type="secondary">
          Reset
        </Button>
      </Section>
    </Advanced>
  );
  return (
    <Container>
      <Input
        pl={"50px"}
        placeholder={"Enter an address, neighborhood, city, or ZIP code"}
      >
        <Icon.Home />
      </Input>

      <Popover placement="bottomRight" content={advancedSearch} trigger="click">
        <Button onClick={onSearchLocation} width={"131px"} type={"secondary"}>
          <Icon.Setting />
          Advanced
        </Button>
      </Popover>

      <Button width={"131px"} type={"primary"}>
        <Icon.Search />
        Search
      </Button>
    </Container>
  );
};
