import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Client } from "../API/methods";

/**
 * старый файл - в программе не используется
 */
export default function ItemList({ client = {} }) {
  useEffect(() => {
    setInfo(client);
  }, []);
  // const { phoneNumber, balance, name, nameOrganization } = client;
  const [info, setInfo] = useState({
    name: "",
    phoneNumber: "",
    balance: "",
    nameOrganization: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  const onClickDelete = () => {
    Client.deleteClient((res) => console.log(res), info.id);
  };
  const url = "https://localhost:5001/api/Client/";
  const onBlur = () => {
    fetch(url + info.id, {
      method: "PUT",
      body: JSON.stringify(info),
      headers: { "Content-Type": "application/json" },
      // 'Accept': 'application/json, application/xml, text/plain, text/html, .',}
    });
  };
  return (
    <div>
      <Input
        value={info.name ?? info.nameOrganization}
        onChange={onChange}
        onBlur={onBlur}
        name={info.name ? "name" : "nameOrganization"}
      />
      <Input
        value={info.phoneNumber}
        onChange={onChange}
        onBlur={onBlur}
        name={"phoneNumber"}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={onClickDelete}
        startIcon={<DeleteIcon />}
      >
        Удалить
      </Button>
    </div>
  );
}
