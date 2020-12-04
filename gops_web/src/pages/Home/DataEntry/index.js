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
  Drawer,
  Descriptions,
  Col,
  Row,
  Input,
  Select,
  DatePicker
} from "antd";
import PNLTab from "./PNLTab";
import WithdrawalsTab from "./WithdrawalsTab";
import DepositTab from "./DepositTab";
const { Option } = Select;

export default () => {
  let { path, url } = useRouteMatch();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ width: 250, background: "#f7f7f7" }}>
        {[
          {
            title: "PNL",
            link: "pnl"
          },
          { title: "Withdrowals", link: "withdrowals" },
          { title: "Deposit", link: "deposit" }
        ].map((d, i) => (
          <div
            key={"min_side_data" + i}
            style={{
              padding: "10px 10px",
              borderBottom: "1px solid #ccc",
              cursor: "pointer"
            }}
          >
            <Link to={`${url}/${d.link}`}>{d.title}</Link>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <Switch>
          <Route exact path={path}>
            <h1 style={{ padding: 20 }}>
              {"<< "}Click on Options to add data.
            </h1>
            <Descriptions title="User Info" layout="vertical">
              <Descriptions.Item label="UserName">
                Zhou Maomao
              </Descriptions.Item>
              <Descriptions.Item label="Telephone">
                1810000000
              </Descriptions.Item>
              <Descriptions.Item label="Live">
                Hangzhou, Zhejiang
              </Descriptions.Item>
              <Descriptions.Item label="Address" span={2}>
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
              </Descriptions.Item>
              <Descriptions.Item label="Remark">empty</Descriptions.Item>
            </Descriptions>
          </Route>
          <Route path={`${path}/pnl`}>
            <PNLTab />
          </Route>
          <Route path={`${path}/withdrowals`}>
            <WithdrawalsTab />
          </Route>
          <Route path={`${path}/deposit`}>
            <DepositTab />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
