import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import request from "../../../request";
import {
  Table,
  Tag,
  Space,
  PageHeader,
  Button,
  Drawer,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker
} from "antd";
import AddClient from "./AddClient";
const { Option } = Select;
const columns = [
  {
    title: "name",
    dataIndex: "name",
    key: "name",
    render: (text, a) => <Link to={`/employees/${a.key}`}>{text}</Link>
  },

  {
    title: "email",
    key: "email",
    dataIndex: "email"
  },
  {
    title: "phone",
    key: "phone",
    dataIndex: "phone"
  },
  {
    title: "PAN",
    key: "PAN",
    dataIndex: "PAN"
  }
];

const data = [];

export default () => {
  const [visible, setVisible] = useState(false);
  const [clients, setClients] = useState(data);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const loadData = async () => {
    let cl = await request.get("/employees", {
      headers: { authorization: localStorage.getItem("authorization") }
    });
    console.log("cl.data");
    console.log(cl.data);
    setClients(
      cl.data.map(u => {
        return {
          key: u.id,
          name: (u.firstName || "--") + " " + (u.lastName || "--"),
          PAN: u.PAN,
          email: u.email,
          phone: u.phone
        };
      })
    );
  };
  useEffect(() => {
    loadData();
    return () => {
      console.log("cleaning");
    };
  }, []);
  const addUser = async ({
    firstName,
    lastName,
    PAN,
    password,
    email,
    phone
  }) => {
    let cl = await request.post(
      "/createEmployee",
      {
        PAN,
        firstName,
        lastName,
        email,
        phone,
        password
      },
      { headers: { authorization: localStorage.getItem("authorization") } }
    );
    if (cl.status <= 299 && cl.status >= 200) {
      console.log(cl);
      setClients([
        ...clients,
        {
          key: cl.data.id,
          name: firstName + " " + lastName,
          PAN: PAN,
          email,
          phone
        }
      ]);
      setVisible(false);
    } else alert("something went wrong please fix it");
  };
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Employees"
        subTitle="Gturn Employees"
        extra={[
          <Button key="1" type="primary" onClick={showDrawer}>
            + Add Employee
          </Button>
        ]}
      />

      <Table columns={columns} dataSource={clients} />
      <AddClient addUser={addUser} onClose={onClose} visible={visible} />
    </div>
  );
};
