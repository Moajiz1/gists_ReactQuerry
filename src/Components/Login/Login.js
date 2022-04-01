import React from "react";
import { Menu, Dropdown } from "antd";
import "./login.css";
import { Link } from "react-router-dom";
import { userConstants } from "../../constants/constants";
import GitHubLogin from "../../Auth";
import { getUserToken, localToken } from "../util/Utfn";
import { useDataOfUser } from "../../hooks/use-gists";
import { useLogout } from "../../hooks/useBack";

const Login = () => {
  const { userInfo } = useDataOfUser();
  const { clientID, redirectUrl } = userConstants;

  const onSuccessGithub = async (data) => {
    const { code } = data;
    const accessToken = await getUserToken(code);
    localStorage.setItem("accessToken", accessToken);
    window.location.reload(false);
  };
  const { logout } = useLogout();

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>Sign in as {userInfo?.name}</span>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="form">Add Gist</Link>
      </Menu.Item>

      {/* <Menu.Item key="3">
        <Link to="personalgists">Your Gists</Link>
      </Menu.Item> */}

      <Menu.Item key="3">
        <Link to="starredgists">Starred Gists</Link>
      </Menu.Item>

      <Menu.Item key="4">
        <Link to="userprofile">Github Profile</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <span onClick={logout}>Log Out</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {localToken && (
        <ul className="list">
          <li className="list-item">
            <Dropdown overlay={menu} placement="bottomLeft">
              <img src={userInfo?.avatar_url} alt="" className="avatar" />
            </Dropdown>
          </li>
        </ul>
      )}
      {!localToken && (
        <GitHubLogin
          clientId={clientID}
          onSuccess={onSuccessGithub}
          buttonText="LOGIN"
          className="btn-login"
          // valid={true}
          redirectUri={redirectUrl}
          scope="gist"
          uxMode="redirect"
        />
      )}
    </>
  );
};

export default Login;
