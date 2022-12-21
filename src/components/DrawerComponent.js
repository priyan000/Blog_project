import "./style/DrawerComponent.css";
import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/LogingActions";
import SeperateDrawer from "./SeperateDrawer";

const DrawerComponent = () => {
  const dispatch = useDispatch();
  // const logininfo = localStorage.getItem("SigninResponse");
  // const LoginInfoObject = JSON.parse(logininfo);
  const drawerOpen = useSelector((state) => state.drawerOpen);
  const showDrawer = () => {
    dispatch({
      type: actions.DRAWER_OPEN,
      payload: true,
    });
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Create
      </Button>
      {drawerOpen ? <SeperateDrawer open={drawerOpen} /> : null}
    </>
  );
};

export default DrawerComponent;
