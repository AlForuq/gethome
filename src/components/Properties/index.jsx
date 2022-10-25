import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Filter } from "../Filter";
import { HouseCard } from "../HouseCard";
import { Body, Container, Message, Wrapper } from "./style";
import { UseSearch } from "../../Hooks/useSearch";
const { REACT_APP_BASE_URL: url } = process.env;

export const Properties = () => {
  const navigate = useNavigate()
  const query = UseSearch();
  const { search } = useLocation();
  const [title, setTitle] = useState("");
  const [datas, setData] = useState([]);

  useEffect(() => {
    if (!query.get("category_id")) {
      setTitle("Properties");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get("category_id")]);

  useQuery(
    ["getHouses", search],
    () => {
      return fetch(`${url}/v1/houses/list${search || ""}`).then((res) =>
        res.json()
      );
    },
    {
      onSuccess: (res) => {
        // console.log(res, "idd");
        setData(res || []);
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const { isLoading, isRefetching } = useQuery(
    ["getHome", [query.get("category_id")]],
    () => {
      return query.get("category_id") && fetch(`${url}/v1/categories/${query.get("category_id")}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json());
    },
    {
      onSuccess: (res) => {
       query.get("category_id") &&  setTitle(res?.data?.name);
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const onClick = (id) => {
    navigate(`/properties/${id}`);
  };

  return (
    <>
      <div className="center">
        <Filter />
      </div>
      <div className="center">
        <Container>
          <Wrapper className="nocopy">
            <div className="title center">
              {isLoading || isRefetching ? (
                <div>Loading...</div>
              ) : (
                title || "Properties"
              )}
            </div>
            <div className="description center">
              The Houses that You Want and dream!!!
            </div>
          </Wrapper>

          <Body>
            {datas?.data != null ? (
              datas?.data?.map((value) => (
                <HouseCard
                  onClick={() => onClick(value?.id)}
                  key={value.id}
                  info={value}
                />
              ))
            ) : (
              <Message>{datas.message} </Message>
            )}
          </Body>
        </Container>
      </div>
    </>
  );
};
