import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import {
  Table,
  Tag,
  Space,
  PageHeader,
  AutoComplete,
  Button,
  Drawer,
  Form,
  Col,
  Row,
  Input,
  Select,
  message
} from "antd";
import request from "../../../request";
const { Option } = Select;

export default props => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, c) => (
        <a>
          {c.firstName} {c.lastName}
        </a>
      )
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
      key: "bc",
      dataIndex: "bc"
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
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "od",
      render: (text, c) => (
        <a
          onClick={async () => {
            "employeeClients";
            console.log(c);
            let cl = await request.post(
              "/deleteClients",
              { clientId: c.id, employeeId: employee.id },
              {
                headers: {
                  authorization: localStorage.getItem("authorization")
                }
              }
            );
            if (cl.status === 200) loadData();
            else message.error("delete failed");
          }}
        >
          delete
        </a>
      )
    }
  ];
  const [visible, setVisible] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [options, setOptions] = useState([]);
  const [ammount, setAmmount] = useState(0);
  const [clientId, setClientId] = useState("");
  let match = useRouteMatch();
  const onSearch = async searchText => {
    let clients = await request.get(`searchclients?key=${searchText}`, {
      headers: { authorization: localStorage.getItem("authorization") }
    });
    console.log(clients);

    setOptions(
      !searchText
        ? []
        : clients.data.map(u => {
            return { value: u.firstName + " " + u.lastName, client: u };
          })
    );
  };
  const loadData = async () => {
    let cl = await request.get("/employees/" + match.params.id, {
      headers: { authorization: localStorage.getItem("authorization") }
    });
    console.log("cl.data");
    console.log(cl.data);
    setEmployee(cl.data);
  };
  useEffect(() => {
    loadData();
    return () => {
      console.log("cleaning");
    };
  }, []);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Employee"
        subTitle="Gturn employee"
        extra={
          [
            // <Button key="1" type="primary" onClick={showDrawer}>
            //   + Add Employee
            // </Button>
          ]
        }
      />
      <div style={{ padding: 20 }}>
        <div>
          <span style={{ color: "#999" }}>Name: </span>
          <span>
            {employee.firstName} {employee.lastName}
          </span>
        </div>
        <div>
          <span style={{ color: "#999" }}>email: </span>
          <span>{employee.email}</span>
        </div>
        <div>
          <span style={{ color: "#999" }}>phone: </span>
          <span>{employee.phone}</span>
        </div>
        <div>
          <span style={{ color: "#999" }}>PAN: </span>
          <span>{employee.PAN}</span>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", width: 400, padding: 20 }}>
          <AutoComplete
            options={options}
            style={{ width: 200 }}
            onSelect={async (e, obj) => {
              console.log(e, obj, obj.client.id);
              setClientId(obj.client.id);
            }}
            onSearch={onSearch}
            placeholder="Search User"
          />
          <Button
            key="1"
            type="primary"
            onClick={async () => {
              if (!employee.clients.find(c => c.id == clientId)) {
                let cl = await request.post(
                  "/EmployeeClients",
                  {
                    employee: employee.id,
                    client: clientId
                  },
                  {
                    headers: {
                      authorization: localStorage.getItem("authorization")
                    }
                  }
                );
                loadData();
              } else {
                alert("Already added");
              }
            }}
          >
            + Add Cllient
          </Button>
        </div>
        <div style={{ padding: 20, fontSize: 16 }}>Cliecnts</div>
        <div style={{ padding: 5 }}>
          {employee.clients && (
            <Table columns={columns} dataSource={employee.clients} />
          )}
        </div>
      </div>
    </div>
  );
};
