import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import request from "../request";
import { Input, Button, message } from "antd";
export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  useEffect(() => {
    checkForSession();
  }, []);
  const checkForSession = async () => {
    console.log("begin");
    // const authorization = localStorage.getItem("authorization");
    try {
      let cl = await request.post(
        "me",
        { email, password },

        { headers: { authorization: localStorage.getItem("authorization") } }
      );
      console.log(cl);
      if (cl.status === 200) history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{ paddingTop: 200 }}>
      <div
        style={{
          padding: 50,
          width: 500,
          background: "#f1f1f1",
          margin: "auto",
          // marginTop: 200,
          textAlign: "center"
        }}
      >
        <h2 onClick={checkForSession}>G-ops Login</h2>
        <div style={{}}>
          <div style={{ padding: 10 }}>
            <Input
              placeholder="Email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <Input
              placeholder="passworde"
              type="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <Button
              type="primary"
              size="large"
              onClick={async () => {
                try {
                  if (!email || !password || email === "" || password === "") {
                    message.error("Missing Email or password");
                    return;
                  }
                  let cl = await request.post("login", { email, password });
                  if (cl.status == 200) {
                    localStorage.setItem("authorization", cl.data);
                    history.push("/");
                  }
                } catch (e) {
                  message.error("Login failed");
                }
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
