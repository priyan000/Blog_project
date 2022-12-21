import React from "react";
import "./style/PostTableComponent.css";
import { Space, Table, Button, Badge, Popconfirm } from "antd";
import { Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import actions from "../redux/LogingActions";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";

function PostTableComponent() {
  const dispatch = useDispatch();
  const logininfo = localStorage.getItem("SigninResponse");
  const LoginInfoObject = JSON.parse(logininfo);
  const post_loader = useSelector((state) => state.post_loader);
  const publish_loader = useSelector((state) => state.publish_loader);

  const post_from_api_with_filter = useSelector(
    (state) => state.post_from_api_with_filter
  );
  const table_datas_only = useSelector((state) => state.table_datas_only);
  const columns = [
    {
      title: "Post Name",
      dataIndex: "name",
      key: "name",
      render: (text, current) => (
        <Link to={`blogcontent/${current.id}`}>{text}</Link>
      ),
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (data, current) => (
        <>
          {/* {console.log(current)} */}
          <Badge color={current.is_published ? "green" : "red"} />
          {moment(data).format("DD/MM/YYYY HH:mm:ss")}
        </>
      ),
    },
    {
      title: "Updated at",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (data) => moment(data).format("DD/MM/YYYY  HH:mm:ss"),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, current) => (
        <div className="actions">
          <Space size="small">
            <Popconfirm
              placement="top"
              title={"Are You sure? You want to delete this post?"}
              onConfirm={() => confirm(current)}
              // onCancel={Cancle}
              okText="Yes"
              cancelText="No"
              // destroyTooltipOnHide={false}
            >
              <DeleteOutlined
                style={{ color: "#f6a0b3", fontWeight: "bold" }}
                theme="outlined"
              />
            </Popconfirm>
            <Button
              type="primary"
              onClick={() => HandlePublish(current)}
              loading={publish_loader}
              // style={{ maxWidth: "90px" }}
            >
              {current.is_published ? "Un Publish" : "Publish"}
            </Button>
          </Space>
        </div>
      ),
    },
  ];

  function confirm(current) {
    dispatch({
      type: actions.DELETE_POSTS,
      payload: LoginInfoObject,
      current,
    });

    // message.success
  }

  useEffect(() => {
    dispatch({
      type: actions.POSTS_GET,
      payload: LoginInfoObject,
    });
    // eslint-disable-next-line
  }, []);

  function HandlePublish(current) {
    dispatch({
      type: actions.PUBLISH_POSTS,
      payload: LoginInfoObject,
      id: current.id,
      current,
    });
  }
  return (
    <div>
      {post_loader ? (
        <Skeleton />
      ) : (
        <Table
          columns={columns}
          key={table_datas_only.id}
          dataSource={
            // eslint-disable-next-line
            (post_from_api_with_filter == 0 ||
              post_from_api_with_filter == null) &&
            table_datas_only
              ? table_datas_only
              : post_from_api_with_filter
          }
          pagination={{ defaultCurrent: 1, defaultPageSize: 5 }}
        />
      )}
    </div>
  );
}

export default PostTableComponent;
