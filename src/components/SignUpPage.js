import React from "react";
import { useDispatch } from "react-redux";
import ImageSide from "./ImageSide";
import Bloglogo from "../components/images/Bloglogo.png";
import "./style/SignUpPage.css";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import actions from "../redux/LogingActions";
import { useForm } from "antd/lib/form/Form";

function SignUpPage() {
  const dispatch = useDispatch();
  const [myForm] = useForm();

  const onFinish = (values) => {
    dispatch({
      type: actions.USER_REGISTER,
      payload: values,
    });

    myForm.resetFields();
  };
  return (
    <div className="wholewindow">
      <div className="wholesignupside">
        <div className="bloglogo">
          <img src={Bloglogo} alt="logo" />
        </div>
        <div className="formpartsignup">
          <Form
            form={myForm}
            name="signup"
            layout="vertical"
            className="login-form"
            onFinish={onFinish}
          >
            <div className="firstandlastname">
              <Form.Item
                label="First Name"
                name="first_name"
                rules={[{ required: true, message: "Please enter firstname!" }]}
              >
                <Input placeholder="FirstName" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[{ required: true, message: "Please enter lasttname!" }]}
              >
                <Input placeholder="LastName" />
              </Form.Item>
            </div>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input placeholder="Email" className="inputarea" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" className="inputarea" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="password_confirmation"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("The passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                className="inputarea"
              />
            </Form.Item>

            <Form.Item className="signupbutton">
              <Button type="primary" htmlType="submit">
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="footerlinkforsignin">
          Already have an account?
          <Link to="/">Signin</Link>
        </div>
      </div>
      <div className="imageside">
        <ImageSide />
      </div>
    </div>
  );
}

export default SignUpPage;
