import React from "react";
import { Menu, Button } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useLocation
} from "react-router-dom";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;

export default () => {
  let { pathname } = useLocation();
  let selected = () => {
    return [pathname.split("/")[1]];
  };
  return (
    <div style={{ width: 260 }}>
      {/* <Button
          type="primary"
          onClick={this.toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {React.createElement(
            this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button> */}
      <h3 style={{ margin: 20, color: "#999", fontWeight: 300 }}>Apps</h3>
      <Menu
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        selectedKeys={selected()}
        mode="inline"
        //   theme="dark"
        // inlineCollapsed={this.state.collapsed}
      >
        <Menu.Item key="employees" icon={<PieChartOutlined />}>
          <Link to={"/employees"}>Employees</Link>
        </Menu.Item>
        <Menu.Item key="clients" icon={<DesktopOutlined />}>
          <Link to={"/clients"}>Clients</Link>
        </Menu.Item>
        <Menu.Item key="dataentry" icon={<DesktopOutlined />}>
          <Link to={"/dataentry"}>Data Entry</Link>
        </Menu.Item>
        <Menu.Item key="pnl" icon={<ContainerOutlined />}>
          <Link to={"/pnl"}>PNL</Link>
        </Menu.Item>
        {/* <Menu.Item key="topics" icon={<ContainerOutlined />}>
          <Link to={"/topics"}>Accounts</Link>
        </Menu.Item> */}
        <Menu.Item key="login" icon={<ContainerOutlined />}>
          <Link
            to={"/login"}
            onClick={() => {
              localStorage.clear();
            }}
          >
            Logout
          </Link>
        </Menu.Item>
        {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu> */}
        {/* <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title="Navigation Two"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu> */}
      </Menu>
    </div>
  );
};
