import React, { useEffect } from "react";
import "./style/DashboardBlogContent.css";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Card,
  List,
  Form,
  Input,
  Button,
  Space,
  Skeleton,
  message,
} from "antd";
import moment from "moment";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import actions from "../redux/LogingActions";
import { useForm } from "antd/lib/form/Form";
const { Meta } = Card;
const { TextArea } = Input;

function DashboardBlogContent() {
  const [myForm] = useForm();
  const [editform] = useForm();
  const dispatch = useDispatch();
  const logininfo = localStorage.getItem("SigninResponse");
  const LoginInfoObject = JSON.parse(logininfo);
  const all_data_of_post = useSelector(
    (state) => state.published_show_request_response_data
  );
  const user_details_of_published_posts = useSelector(
    (state) => state.user_details_for_published_post
  );
  const edit_data_for_comment = useSelector(
    (state) => state.edit_data_for_comment
  );
  const all_comments_data = useSelector((state) => state.all_comments_data);
  const dashboard_loader = useSelector((state) => state.dashboard_loader);
  const comment_loader = useSelector((state) => state.comment_loader);

  function HandleCommentDelet(item) {
    if (Object.keys(edit_data_for_comment).length === 0) {
      dispatch({
        type: actions.DELETE_COMMENT,
        payload: item,
        LoginInfoObject,
      });
    } else {
      message.error("You Cannot Delete Comment Now");
    }
  }

  function HandleCommentEdit(item) {
    dispatch({
      type: actions.COMMENT_EDIT_DATA,
      payload: item,
    });
  }

  function onFinish(values) {
    dispatch({
      type: actions.CREATE_COMMENT,
      payload: values,
      LoginInfoObject,
      all_data_of_post,
    });
    myForm.resetFields();
  }

  useEffect(() => {
    editform.setFieldsValue(edit_data_for_comment);
  }, [edit_data_for_comment, editform]);

  function HandleCancelForEdit() {
    dispatch({
      type: actions.COMMENT_EDIT_DATA,
      payload: {},
    });
  }

  function onFinishEdit(value) {
    dispatch({
      type: actions.EDIT_COMMENT,
      payload: value,
      LoginInfoObject,
      all_data_of_post,
      user_details_of_published_posts,
      edit_data_for_comment,
    });

    dispatch({
      type: actions.COMMENT_EDIT_DATA,
      payload: {},
    });
  }
  return (
    <div>
      {dashboard_loader ? (
        <Skeleton />
      ) : (
        <div className="wholeblogcontent">
          <div className="contentheading">
            <h1>{all_data_of_post.name}</h1>
          </div>
          <div className="contentavatar">
            <Card
              size="small"
              style={{
                width: 300,
                backgroundColor: "white",
              }}
            >
              <Meta
                avatar={
                  user_details_of_published_posts.user.profile_url ? (
                    <Avatar
                      src={user_details_of_published_posts.user.profile_url}
                      size={50}
                    />
                  ) : (
                    <Avatar icon={<UserOutlined />} size={50} />
                  )
                }
                title={user_details_of_published_posts.user.first_name}
                description={`${moment(all_data_of_post.updated_at).format(
                  "DD-MMM-YYYY"
                )}`}
              />
            </Card>
          </div>
          <div className="maincontentofpost">{all_data_of_post.content}</div>
          <div className="imageincontent">
            {all_data_of_post?.image_url ? (
              <img
                src={all_data_of_post?.image_url}
                alt="Cannot Be Displayed"
              ></img>
            ) : null}
          </div>
          <div className="commentsposting">
            <Form
              form={myForm}
              layout="vertical"
              name="MyForm"
              onFinish={onFinish}
            >
              <Form.Item
                label="Write Your Comments"
                name="comment"
                rules={[{ required: true, message: "write something to post" }]}
              >
                <TextArea rows={3} placeholder="Enter you comments....." />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={comment_loader}
                    disabled={Object.keys(edit_data_for_comment).length !== 0}
                  >
                    Post Comment
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
          <div className="commentsoncontent">
            <List
              itemLayout="horizontal"
              // dataSource={all_data_of_post.comments}
              dataSource={all_comments_data}
              renderItem={(item) => (
                <List.Item
                  style={{
                    // cursor: "pointer",
                    padding: 10,
                    width: "380px",
                  }}
                  actions={[
                    LoginInfoObject.data.email === item.user?.email ? (
                      <div className="commentactions">
                        <DeleteOutlined
                          style={{ color: "red" }}
                          onClick={() => HandleCommentDelet(item)}
                        />

                        <EditOutlined
                          style={{ color: "blue" }}
                          onClick={() => HandleCommentEdit(item)}
                        />
                      </div>
                    ) : null,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      item?.user?.profile_url ? (
                        <Avatar src={item.user.profile_url} size="large" />
                      ) : (
                        <Avatar icon={<UserOutlined />} size="large" />
                      )
                    }
                    title={item?.user?.first_name}
                    description={
                      Object.keys(edit_data_for_comment).length ? (
                        item.user.email === LoginInfoObject.data.email &&
                        edit_data_for_comment.id === item.id ? (
                          <>
                            <Form
                              form={editform}
                              layout="horizontal"
                              name="editform"
                              onFinish={onFinishEdit}
                            >
                              <Form.Item
                                name="comment"
                                rules={[
                                  {
                                    required: true,
                                    message: "write something to update",
                                  },
                                ]}
                              >
                                <TextArea
                                  style={{ minWidth: "150px" }}
                                  placeholder="Update your comment....."
                                ></TextArea>
                              </Form.Item>
                              <Form.Item>
                                <Space>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={comment_loader}
                                  >
                                    Update
                                  </Button>
                                  <Button onClick={HandleCancelForEdit}>
                                    Cancel
                                  </Button>
                                </Space>
                              </Form.Item>
                            </Form>
                          </>
                        ) : (
                          item.comment
                        )
                      ) : (
                        item.comment
                      )
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardBlogContent;
