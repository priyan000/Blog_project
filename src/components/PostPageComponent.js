import React from "react";
import "./style/PostPageComponent.css";
import { Input } from "antd";
import DrawerComponent from "./DrawerComponent";
import PostTableComponent from "./PostTableComponent";
import { useDispatch } from "react-redux";
import actions from "../redux/LogingActions";

const { Search } = Input;

function PostPageComponent() {
  const dispatch = useDispatch();
  const logininfo = localStorage.getItem("SigninResponse");
  const LoginInfoObject = JSON.parse(logininfo);

  function onChange(value) {
    const search = value.target.value;
    dispatch({
      type: actions.SEARCH_FILTER,
      payload: LoginInfoObject,
      search: search,
    });
  }

  function onBlur(value) {
    dispatch({
      type: actions.SEARCH_FILTER,
      payload: LoginInfoObject,
      search: null,
    });
  }

  return (
    <div>
      <div className="postpageheadingcontent">
        <div className="postheading">
          <h1>Post</h1>
        </div>
        <div className="searchanddrawer">
          <div className="searchcomponent">
            <Search
              placeholder="input search text"
              allowClear="true"
              onChange={onChange}
              onBlur={(value) => onBlur(value)}
              style={{
                width: 250,
              }}
            />
          </div>
          <div>
            <DrawerComponent />
          </div>
        </div>
      </div>
      <div className="postpagetablecontent">
        <div className="tablecontent">
          <PostTableComponent />
        </div>
      </div>
    </div>
  );
}

export default PostPageComponent;
