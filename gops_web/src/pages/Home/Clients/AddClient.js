import React, { useState, useEffect } from "react";

import {
  Button,
  Drawer,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker
} from "antd";
const { Option } = Select;
let colSpace = { padding: 10 };
export default ({ onClose, addUser, visible }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lastName, setLastName] = useState("");
  const [PAN, setPAN] = useState("");
  const [beginning, setBeginning] = useState("");
  const [account, setAccount] = useState("zerodha");
  const [accountSettings, setAccountSettings] = useState({});
  useEffect(() => {
    // action on update of movies
  }, []);
  return (
    <Drawer
      title="Add Client"
      placement="right"
      closable={false}
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              addUser({
                firstName,
                lastName,
                PAN,
                account,
                accountSettings,
                beginning,
                email,
                phone
              });
              setFirstName("");
              setLastName("");
              setPAN("");
              setBeginning("");
              // setAccount("");
              setAccountSettings({});
            }}
            type="primary"
          >
            Submit
          </Button>
        </div>
      }
    >
      <div>
        <Row>
          <Col span={12} style={colSpace}>
            <label>First Name</label>
            <Input
              placeholder="Please enter First name"
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
              }}
            />
          </Col>
          <Col span={12} style={colSpace}>
            <label>Last Name</label>
            <Input
              placeholder="Please enter Last name"
              value={lastName}
              onChange={e => {
                setLastName(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={colSpace}>
            <label>Email</label>
            <Input
              placeholder="Please enter Email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </Col>
          <Col span={12} style={colSpace}>
            <label>Phone</label>
            <Input
              placeholder="Please enter phone"
              value={phone}
              onChange={e => {
                setPhone(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={colSpace}>
            <label>PAN</label>
            <Input
              placeholder="Please enter PAN number"
              value={PAN}
              onChange={e => {
                setPAN(e.target.value);
              }}
            />
          </Col>
          <Col span={12} style={colSpace}>
            <label>Beginning</label>
            <Input
              placeholder="Please enter beginning balance"
              value={beginning}
              onChange={e => {
                setBeginning(e.target.value);
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24} style={colSpace}>
            <label>Account</label>
            <div>
              <Select
                style={{ width: 300 }}
                placeholder="Please choose the Account"
                value={account}
                onChange={value => {
                  setAccount(value);
                }}
              >
                <Option value="zerodha">Zerodha</Option>
              </Select>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={8} style={colSpace}>
            <label>User ID</label>
            <Input
              placeholder="Please enter User ID"
              value={accountSettings["userId"]}
              onChange={e => {
                setAccountSettings({
                  ...accountSettings,
                  userId: e.target.value
                });
              }}
            />
          </Col>
          <Col span={8} style={colSpace}>
            <label>Password</label>
            <Input
              placeholder="Please enter password"
              type="password"
              value={accountSettings["password"]}
              onChange={e => {
                setAccountSettings({
                  ...accountSettings,
                  password: e.target.value
                });
              }}
            />
          </Col>
          <Col span={8} style={colSpace}>
            <label>Pin</label>
            <Input
              placeholder="Please enter the pin"
              type="pin"
              value={accountSettings["pin"]}
              onChange={e => {
                setAccountSettings({
                  ...accountSettings,
                  pin: e.target.value
                });
              }}
            />
          </Col>
        </Row>
      </div>
    </Drawer>
  );
};
