import React, { useState } from "react";
import "./style/ProfilePageComponent.css";
import {
  Avatar,
  Card,
  Modal,
  Button,
  Form,
  Input,
  Upload,
  message,
} from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import actions from "../redux/LogingActions";

const { Meta } = Card;

function ProfilePageComponent() {
  const dispatch = useDispatch();
  const logininfo = localStorage.getItem("SigninResponse");
  const LoginInfoObject = JSON.parse(logininfo);
  const firstname = LoginInfoObject.data.first_name;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return Upload.LIST_IGNORE;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return Upload.LIST_IGNORE;
    }

    return isJpgOrPng && isLt2M;
  };

  function handleCancel() {
    setIsModalOpen(false);
  }

  function EditProfile() {
    setIsModalOpen(true);
  }

  function onFinish(values) {
    console.log("form on finish", values);
    dispatch({
      type: actions.UPDATE_PROFILE,
      payload: values,
      LoginInfoObject,
    });
    setIsModalOpen(false);
  }
  return (
    <div>
      <div className="profilecard">
        <Card
          size="small"
          style={{
            width: 300,
            backgroundColor: "white",
          }}
          actions={[<EditOutlined onClick={EditProfile} />]}
        >
          <Meta
            avatar={
              <Avatar src={LoginInfoObject?.data?.profile_url} size={50} />
            }
            title={firstname}
            description={`Mail ID: ${LoginInfoObject.data.email}     
           Account Created At: ${moment(LoginInfoObject.data.created_at).format(
             "DD-MMM-YYYY"
           )}`}
          />
        </Card>
      </div>
      <div className="modal"></div>
      <Modal
        title="Profile Update"
        open={isModalOpen}
        destroyOnClose="true"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form="myForm" key="submit" type="primary" htmlType="submit">
            Update
          </Button>,
        ]}
      >
        <Form name="myForm" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Profile Image" name="image">
            <Upload
              name="profile"
              listType="picture-card"
              beforeUpload={beforeUpload}
              maxCount={1}
            >
              <div
                style={{
                  marginTop: 5,
                }}
              >
                <PlusOutlined />
                Upload
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProfilePageComponent;
