import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
// components
import Assistant from "./components/assistant/Assistant";
// constants
import { AUTH_ROUTE, ADMIN_ROUTE, USER_ROUTE } from "./constants/routes";
import { AUTH_TOKEN_ENDPOINT, AUTH_ADMIN_TOKEN_ENDPOINT, USERS_GET_ENDPOINT, NOTIFICATIONS_GET_ENDPOINT, ACHIEVEMENTS_GET_ENDPOINT } from "./constants/endpoints";
// utils
import { getProfile } from "./utils";
// apps
import User from "./apps/User";
import Admin from "./apps/Admin";
import Auth from "./apps/Auth";
import UserContext from "./contexts/userContext";
// default settings
const defaultSettings = {
  dark: false,
  locked: true,
};

const App = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState({});
  const [settings, setSettings] = useState({});
  const [friends, setFriends] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("hackathon"));

    setSettings(localData?.settings || defaultSettings);

    const token = localData?.token;
    if (token) {
      try {
        axios.get(AUTH_TOKEN_ENDPOINT + "/" + token)
          .then(res => {
            setUser(res.data);
          })
          .catch(err => { });
      } catch (err) { }
    }

    const adminToken = localData?.adminToken;
    if (adminToken) {
      try {
        axios.get(AUTH_ADMIN_TOKEN_ENDPOINT + "/" + adminToken)
          .then(res => {
            setAdmin(res.data);
          })
          .catch(err => { });
      } catch (err) { }
    }

    try {
      axios.get(USERS_GET_ENDPOINT)
        .then(res => setUsers(res.data))
        .catch(err => { })
    } catch (err) { }
  }, []);

  useEffect(() => {
    if (user.name) {
      setFriends([]);
      user.friends?.map(friend => {
        getProfile(friend)
          .then(res => setFriends(friends => [...friends, res]))
          .catch(err => console.log(err))
      });

      try {
        axios.get(NOTIFICATIONS_GET_ENDPOINT + "/" + user.name + "/" + user.email)
          .then(res => setNotifications(res.data))
          .catch(err => { })
      } catch (err) { }

      try {
        axios.get(ACHIEVEMENTS_GET_ENDPOINT + "/" + user.email)
          .then(res => setAchievements(res.data))
          .catch(err => { })
      } catch (err) { }
    }
  }, [user]);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser, admin, setAdmin, post, setPost, settings, setSettings, users, notifications, setNotifications, friends, setFriends, achievements, setAchievements }}>
        <Assistant />
        <Switch>
          <Route path={ADMIN_ROUTE} component={Admin} />
          <Route path={AUTH_ROUTE} component={Auth} />
          <Route path={USER_ROUTE} component={User} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
