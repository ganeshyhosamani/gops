import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Employees from "./Employees";
import Employee from "./Employee";
import PNL from "./PNL";
import DataEntry from "./DataEntry";
import React, { useEffect } from "react";
import request from "../../request";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import Clients from "./Clients";

export default function Home() {
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
        {},

        { headers: { authorization: localStorage.getItem("authorization") } }
      );
      console.log(cl);
      if (cl.status === 200);
      else history.push("/login");
    } catch (e) {
      console.log(e);
      history.push("/login");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid green",
        height: "100%",
        width: "100%"
      }}
    >
      <Header />
      <div style={{ flex: 1, display: "flex", overflow: "scroll" }}>
        <div style={{}}>
          <Sidebar />
        </div>
        <div
          style={{
            flex: 1,
            background: "#f1f1f1",
            overflow: "scroll"
          }}
        >
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/employees/:id">
              <Employee />
            </Route>
            <Route path="/employees">
              <Employees />
            </Route>

            <Route path="/clients">
              <Clients />
            </Route>
            <Route path="/dataentry">
              <DataEntry />
            </Route>
            <Route path="/pnl">
              <PNL />
            </Route>
            {/* <Route path="/topics">
              <Topics />
            </Route> */}
          </Switch>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Topics() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}
