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
const mockVal = (str, repeat = 1) => {
  return {
    value: str.repeat(repeat)
  };
};
let users = ["Ganesh", "Ameya", "Raghu", "Lakshmi"];
function filterItems(arr, query) {
  return arr.filter(function(el) {
    return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });
}
const dataSource = [];
// for (let i = 0; i < 100; i++)
//   dataSource.push({
//     key: i + 1,
//     date: `${i}/1/2020`,
//     pnl: Math.floor(Math.random() * 10000)
//   });
const columns = [
  {
    title: "Date",
    dataIndex: "profitDate",
    key: "profitDate"
  },
  {
    title: "profit",
    dataIndex: "profit",
    key: "profit",
    render: profit => (
      <span style={{ color: profit < 0 ? "red" : "green" }}>{profit}</span>
    )
  }
];
export default () => {
  let { path, url } = useRouteMatch();
  const [options, setOptions] = useState([]);
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [clientId, setClientId] = useState("");
  const [pnl, setPnl] = useState([]);

  const loadPnl = async clientId => {
    let pnl = await request.get(`clients/${clientId}/pnl`, {
      headers: { authorization: localStorage.getItem("authorization") }
    });
    setPnl(pnl.data);
  };
  const onSearch = async searchText => {
    console.log(filterItems(users, searchText));
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
      <div style={{ padding: 20, fontSize: 30 }}>PNL</div>
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
                      "/upsertpnl",
                      {
                        client: clientId,
                        profit: ammount,
                        profitDate: date
                      },
                      {
                        headers: {
                          authorization: localStorage.getItem("authorization")
                        }
                      }
                    );
                    if ((res.status = 200)) message.success("pnl added");
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
        </div>

        <div style={{ overflow: "scroll" }}>
          <Table dataSource={pnl} columns={columns} style={{ minWidth: 400 }} />
        </div>
      </div>
    </div>
  );
};
