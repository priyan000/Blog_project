import React, { useState } from "react";
import { Button, Drawer, Form, Input, message, Upload, Space } from "antd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/LogingActions";

const { Dragger } = Upload;
const { TextArea } = Input;

function SeperateDrawer({ open }) {
  const dispatch = useDispatch();
  const logininfo = localStorage.getItem("SigninResponse");
  const LoginInfoObject = JSON.parse(logininfo);
  //   const drawerOpen = useSelector((state) => state.drawerOpen);
  const edit_data = useSelector((state) => state.edit_data);
  // const post_loader = useSelector((state) => state.post_loader);
  const post_create_loader = useSelector((state) => state.post_create_loader);
  const [previewImage, setPreviewImage] = useState(edit_data.image_url);

  const props = {
    name: "coverimage",

    onChange(info) {
      const imageurl = URL.createObjectURL(info.file.originFileObj);
      setPreviewImage(imageurl);
      // eslint-disable-next-line
      if (info.fileList == 0) {
        setPreviewImage(edit_data.image_url);
      }
    },

    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";

      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        return Upload.LIST_IGNORE;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
        return Upload.LIST_IGNORE;
      }

      return isJpgOrPng;
    },
  };

  const onClose = () => {
    dispatch({
      type: actions.DRAWER_OPEN,
      payload: false,
    });
    dispatch({
      type: actions.DATA_TO_BE_EDITED,
      payload: {},
    });
  };

  const onFinish = (fileList) => {
    if (Object.keys(edit_data).length) {
      dispatch({
        type: actions.EDIT_POSTS,
        payload: edit_data,
        LoginInfoObject,
        fileList,
      });
    } else {
      if (fileList.coverimage === 0) {
        message.error("Image Required");
      } else {
        dispatch({
          type: actions.CREATE_POSTS,
          payload: fileList,
          LoginInfoObject,
        });
      }
    }
  };
  return (
    <div>
      <Drawer
        title={edit_data.id === undefined ? "Create" : "Update"}
        placement="right"
        onClose={onClose}
        open={open}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              form="myForm"
              htmlType="submit"
              loading={post_create_loader}
            >
              {edit_data && Object.keys(edit_data).length ? "Update" : "Save"}
            </Button>
          </Space>
        }
        footerStyle={{
          textAlign: "right",
        }}
      >
        <Form id="myForm" name="basic" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Blog title"
            name="blogtitle"
            initialValue={edit_data?.name}
            rules={[{ required: true, message: "Title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cover Image"
            name="coverimage"
            initialValue={0}
            rules={[{ required: true, message: "Image required" }]}
          >
            {edit_data.image_url ? (
              <>
                <Form.Item name="coverimage">
                  <Upload {...props} maxCount={1}>
                    {edit_data.image_url ? (
                      <img
                        src={previewImage}
                        alt="content related"
                        style={{
                          width: "100%",
                          height: "60%",
                        }}
                      />
                    ) : (
                      <PlusOutlined />
                    )}
                  </Upload>
                </Form.Item>
              </>
            ) : Object.keys(edit_data).length === 0 ? (
              <Dragger {...props} maxCount={1}>
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="preview of uploaded item"
                    style={{
                      width: "100%",
                      height: "60%",
                    }}
                  ></img>
                ) : (
                  <>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Cover Image</p>
                    <p className="ant-upload-hint :pre">
                      Image format: .jpg or .png & Image Size: Below 2MB
                    </p>
                  </>
                )}
              </Dragger>
            ) : (
              <img
                style={{
                  width: "100%",
                  height: "60%",
                }}
                src={previewImage}
                alt="preview of the item"
              ></img>
            )}
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            initialValue={edit_data?.content}
            rules={[{ required: true, message: "Content Missing" }]}
          >
            <TextArea rows={5} />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default SeperateDrawer;
