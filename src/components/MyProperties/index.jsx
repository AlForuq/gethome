import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "../Generics";
// import { HouseCard } from "../HouseCard";
import {
  Container,
  Table,
  Loading,
  Section,
  Wrapper,
  Tr,
  Th,
  Icon,
  Td,
} from "./style";
import { message, Popconfirm } from "antd";
import { useHttp } from "../../Hooks/useHttp";

// const { REACT_APP_BASE_URL: url } = process.env;

export const MyProperties = () => {
  const navigate = useNavigate();
  const { request } = useHttp();
  const [addedHouse, setAddedHouse] = useState([]);

  const { refetch, isLoading, isRefetching } = useQuery(
    "properties_youAdded",
    () => request({ url: "v1/houses/me", token: true }),
    {
      onSuccess: (res) => {
        // console.log(res?.data, "properties");
        setAddedHouse(res?.data || []);
      },
    }
  );

  const { mutate } = useMutation((id) => {
    return request({ url: `v1/houses/${id}`, method: "DELETE", token: true });
  });

  const confirm = (id) => {
    mutate(id, {
      onSuccess: (res) => {
        if (res?.success) {
          refetch();
          message.success("Deleted");
        }
      },
    });
  };

  return (
    <div className="center">
      <Wrapper>
        <Section>
          <div className="title">Properties</div>
          <Button
            width={131}
            type={"primary"}
            onClick={() => navigate("/profile/add")}
          >
            Add New House
          </Button>
        </Section>

        {addedHouse.length ? (
          <Table>
            <thead>
              <Tr>
                <Th>Title - Category</Th>
                <Th>Location</Th>
                <Th>Status</Th>
                <Th>Price</Th>
                <Th>Action</Th>
              </Tr>
            </thead>

            {addedHouse?.map((value) => {
              return (
                <tbody key={value.id}>
                  <Tr>
                    <Td>
                      {value.name} - {value?.category?.name}
                    </Td>
                    <Td>{value.city}</Td>
                    <Td> {value?.status ? "for Sale" : "for Rent"} </Td>
                    <Td>${value.price}</Td>
                    <Td>
                      <Container>
                        <Icon>
                          <Icon.Edit
                            onClick={() => navigate(`/profile/add/${value.id}`)}
                          />
                        </Icon>
                        <Popconfirm
                          title="Wanna delete"
                          onConfirm={() => confirm(value?.id)}
                          // onCancel={cancel}
                          // okText={'Yes'}
                          // cancelText={'No'}
                        >
                          <Icon>
                            <Icon.Trash />
                          </Icon>
                        </Popconfirm>
                      </Container>
                    </Td>
                  </Tr>
                </tbody>
              );
            })}
          </Table>
        ) : (
          <div className="center" >
            {(isLoading || isRefetching) && (
              <Loading>
                <Loading.In />
              </Loading>
            )}
          </div>
        )}
      </Wrapper>
    </div>
  );
};
