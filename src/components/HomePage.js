import React, { useEffect } from "react";
import "./style/HomePage.css";
import PlainBloglogo from "../components/images/PlainBlogLogo.png";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Dropdown, Menu } from "antd";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import actions from "../redux/LogingActions";

function HomePage() {
  const logininfo = localStorage.getItem("SigninResponse");
  const LoginInfoObject = JSON.parse(logininfo);
  const firstname = LoginInfoObject.data.first_name;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   console.log(firstname);

  useEffect(() => {
    dispatch({
      type: actions.VALIDATE_USER,
      payload: LoginInfoObject,
      navigate,
    });
  });
  function HandleLogout() {
    dispatch({
      type: actions.USER_SIGNOUT,
      payload: LoginInfoObject,
      navigate,
    });
  }
  const menu = (
    <Menu
      items={[
        {
          label: <Link to="profile">Profile</Link>,
          key: "0",
        },
        {
          label: <p onClick={HandleLogout}>Logout</p>,
          key: "1",
        },
      ]}
    />
  );

  return (
    <div className="wholepagecontent">
      <div className="header">
        <div className="bloglogoindashboard">
          <img src={PlainBloglogo} alt="logo" />
        </div>
        <div className="otherlinksnavigation">
          <nav>
            <NavLink to="profile">Profile</NavLink>
            <NavLink to="dashboard">dashboard</NavLink>
            <NavLink to="post">Post</NavLink>
          </nav>
        </div>

        <div className="profiledisplay">
          <Dropdown overlay={menu} trigger={["click"]}>
            <Space>
              <span id="spanusername">{firstname}</span>
              <Avatar
                src={LoginInfoObject.data.profile_url}
                size={30}
                icon={<UserOutlined />}
              />
            </Space>
          </Dropdown>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;
