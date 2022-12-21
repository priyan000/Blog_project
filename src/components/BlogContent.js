import React from "react";
import "./style/BlogContent.css";
import { useEffect } from "react";
import { Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import actions from "../redux/LogingActions";

function BlogContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logininfo = localStorage.getItem("SigninResponse");
  const objectinfo = JSON.parse(logininfo);
  const CreatedPosts = useSelector((state) => state.CreatedPosts);
  const post_loader = useSelector((state) => state.post_loader);

  useEffect(() => {
    dispatch({
      type: actions.SHOW_CREATED_POSTS,
      payload: objectinfo,
      id: id,
      navigate,
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {post_loader ? (
        <Skeleton />
      ) : (
        <div className="wholecontent">
          <div className="imageofblog">
            <img src={CreatedPosts.image_url} alt="Post Related Content"></img>
          </div>
          <div className="content">
            <div className="titleofblog">{CreatedPosts.name}</div>
            <div className="maincontent">{CreatedPosts.content}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogContent;
