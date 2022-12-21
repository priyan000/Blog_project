import React from "react";
import "./style/BlogPage.css";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/LogingActions";
import SeperateDrawer from "./SeperateDrawer";

function BlogPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logininfo = localStorage.getItem("SigninResponse");
  const objectinfo = JSON.parse(logininfo);
  const current = useSelector((state) => state.CreatedPosts);
  const drawerOpen = useSelector((state) => state.drawerOpen);
  const publish_loader = useSelector((state) => state.publish_loader);

  function confirm(current) {
    dispatch({
      type: actions.DELETE_POSTS,
      payload: objectinfo,
      current,
    });
    navigate(-1);
  }
  function HandleEdit(current) {
    dispatch({
      type: actions.DRAWER_OPEN,
      payload: true,
    });
    dispatch({
      type: actions.DATA_TO_BE_EDITED,
      payload: current,
    });
  }

  function HandlePublish(current) {
    dispatch({
      type: actions.PUBLISH_POSTS,
      payload: objectinfo,
      current,
      id: current.id,
    });
  }
  return (
    <div>
      <div className="blogHeading">
        <div className="backbutton">
          <Button onClick={() => navigate(-1)}>Back</Button>
        </div>
        <div className="options">
          <Popconfirm
            placement="bottom"
            title="Are you sure? Want to delete this post?"
            onConfirm={() => confirm(current)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "#f6a0b3", fontWeight: "bold" }} />
          </Popconfirm>
          <Button type="primary" onClick={() => HandleEdit(current)}>
            Edit
          </Button>
          {drawerOpen ? <SeperateDrawer open={drawerOpen} /> : null}
          <Button
            type="primary"
            onClick={() => HandlePublish(current)}
            loading={publish_loader}
          >
            {current.is_published ? "Un Publish" : "Publish"}
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default BlogPage;
