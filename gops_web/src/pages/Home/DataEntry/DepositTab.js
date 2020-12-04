import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  useRouteMatch,
  Switch,
  Route
} from "react-router-dom";

import {
  Table,
  Tag,
  Space,
  PageHeader,
  Button,
  Descriptions,
  AutoComplete,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  message
} from "antd";
import request from "../../../request";
const { Option } = Select;
let colStyle = { padding: 5 };

const columns = [
  {
    title: "Date",
    dataIndex: "dDate",
    key: "dDate"
  },
  {
    title: "Ammount",
    dataIndex: "ammount",
    key: "ammount"
  }
];
export default () => {
  let { path, url } = useRouteMatch();
  const [options, setOptions] = useState([]);
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [clientId, setClientId] = useState("");
  const [client, setClient] = useState({});
  const [deposits, setDeposits] = useState([]);

  const loadPnl = async clientId => {
    let deposits = await request.get(`clients/${clientId}/deposits`, {
      headers: { authorization: localStorage.getItem("authorization") }
    });
    setDeposits(deposits.data);
  };
  const onSearch = async searchText => {
    let clients = await request.get(`employeeClients?key=${searchText}`, {
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
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 20, fontSize: 30 }}>Deposits</div>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 1 }}>
          <table style={{ margin: 20 }}>
            <tr>
              <td>User:</td>
              <td>
                <AutoComplete
                  options={options}
                  style={{ width: 200 }}
                  onSelect={async (e, obj) => {
                    console.log(e, obj, obj.client.id);
                    setClientId(obj.client.id);
                    setClient(obj.client);
                    loadPnl(obj.client.id);
                  }}
                  onSearch={onSearch}
                  placeholder="Search User"
                />
              </td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>
                <Input
                  placeholder="Enter Date"
                  type="date"
                  value={date}
                  onChange={e => {
                    setDate(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Ammount:</td>
              <td>
                <Input
                  placeholder="Enter PNL ammount"
                  value={ammount}
                  onChange={e => {
                    setAmmount(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>User:</td>
              <td>
                <Button
                  onClick={async () => {
                    let res = await request.post(
                      "/deposits",
                      {
                        client: clientId,
                        ammount,
                        dDate: date
                      },
                      {
                        headers: {
                          authorization: localStorage.getItem("authorization")
                        }
                      }
                    );
                    if ((res.status = 200)) message.success("deposits added");
                    else message.error("Unable to update");
                    loadPnl(clientId);
                    console.log(ammount, date, clientId);
                  }}
                >
                  Add
                </Button>
              </td>
            </tr>
          </table>

          <div style={{ padding: 20 }}>
            <Descriptions
              title="User Info"
              layout="vertical"
              style={{ maxWidth: 590 }}
            >
              <Descriptions.Item label="UserName">
                <span style={{ textTransform: "uppercase", fontWeight: 600 }}>
                  {" "}
                  {client.firstName} {client.lastName}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <span style={{ textTransform: "uppercase", fontWeight: 600 }}>
                  {" "}
                  {client.phone}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <span style={{ textTransform: "uppercase", fontWeight: 600 }}>
                  {" "}
                  {client.email}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Pan">
                <span style={{ textTransform: "uppercase", fontWeight: 600 }}>
                  {client.PAN}
                </span>
              </Descriptions.Item>
              {/* <Descriptions.Item label="Remark">empty</Descriptions.Item> */}
            </Descriptions>
          </div>
        </div>

        <div style={{ overflow: "scroll" }}>
          <Table
            dataSource={deposits}
            columns={columns}
            style={{ minWidth: 400 }}
          />
        </div>
      </div>
    </div>
  );
};
