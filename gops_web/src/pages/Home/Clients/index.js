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
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "PAN",
    dataIndex: "PAN",
    key: "PAN"
  },
  {
    title: "Client Code",
    key: "bnc",
    dataIndex: "bnc"
  },
  {
    title: "Beginning Ammount",
    key: "beginning",
    dataIndex: "beginning"
  },
  {
    title: "Available profit for withdraw",
    key: "apfw",
    dataIndex: "apfw"
  },
  {
    title: "Additions",
    key: "additions",
    dataIndex: "additions"
  },
  {
    title: "Brokerage and charges",
    key: "bnc",
    dataIndex: "bnc"
  },
  {
    title: "Withdraw",
    key: "withdrawals",
    dataIndex: "withdrawals"
  },
  {
    title: "Ending Capital",
    key: "ec",
    dataIndex: "ec"
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
    let cl = await request.get("/clients", {
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
          account: "zerodha",
          beginning: u.bc,
          apfw: u.apfw,
          withdrawals: u.withdrawals,
          ec: u.ec,
          additions: u.additions,
          bnc: u.bnc
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
    account,
    accountSettings,
    beginning,
    email,
    phone
  }) => {
    let cl = await request.post(
      "/clients",
      {
        PAN,
        bc: beginning,
        credentials: accountSettings,
        firstName,
        lastName,
        email,
        phone
      },
      { headers: { authorization: localStorage.getItem("authorization") } }
    );
    console.log(cl);
    if (cl.status == 201) {
      // setClients([
      //   ...clients,
      //   {
      //     key: cl.data.id,
      //     name: firstName + " " + lastName,
      //     PAN: PAN,
      //     account: account,
      //     accountSettings: accountSettings,
      //     beginning
      //   }
      // ]);
      loadData();
      setVisible(false);
    } else alert("something went wrong please fix it");
  };
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Clients"
        subTitle="Gturn Clients"
        extra={[
          <Button key="1" type="primary" onClick={showDrawer}>
            + Add Client
          </Button>
        ]}
      />

      <Table columns={columns} dataSource={clients} />
      <AddClient addUser={addUser} onClose={onClose} visible={visible} />
    </div>
  );
};
