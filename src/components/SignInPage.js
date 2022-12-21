import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageSide from "./ImageSide";
import "./style/SignInPage.css";
import Bloglogo from "../components/images/Bloglogo.png";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/LogingActions";

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const LoginDetails = useSelector((state) => state.LoginDetails);
  const Loader = useSelector((state) => state.loader);

  const logininfo = localStorage.getItem("SigninResponse");

  const onFinish = (values) => {
    dispatch({
      type: actions.USER_SIGNIN,
      payload: values,
      navigate,
    });
  };

  useEffect(() => {
    if (!logininfo) {
      navigate("/");
    } else {
      // navigate("/home");
      navigate("/home/post");
    }
  }, [logininfo, navigate]);

  return (
    <div className="wholewindow">
      <div className="signupside">
        <div className="bloglogo">
          <img src={Bloglogo} alt="logo" />
        </div>
        <div className="formpart">
          <Form name="signin" layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email">
              <Input placeholder="Email" className="inputarea" />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password placeholder="Password" className="inputarea" />
            </Form.Item>
            <Form.Item className="submitbutton">
              <Button type="primary" htmlType="submit" loading={Loader}>
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="footerlink">
          Don't have an account?
          <Link to="/signup">Signup</Link>
        </div>
      </div>
      <div className="imageside">
        <ImageSide />
      </div>
    </div>
  );
}

export default SignInPage;
