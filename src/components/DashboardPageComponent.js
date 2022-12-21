import React from "react";
import "./style/DashboardPageComponent.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/LogingActions";
import { Layout, Avatar, List, Divider, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";

import moment from "moment";
import DashboardBlogContent from "./DashboardBlogContent";
import InfiniteScroll from "react-infinite-scroll-component";

// Header, Footer,
const { Sider, Content } = Layout;
function DashboardPageComponent() {
  const dispatch = useDispatch();
  const logininfo = localStorage.getItem("SigninResponse");
  const LoginInfoObject = JSON.parse(logininfo);
  const published_posts = useSelector((state) => state.published_posts_data);
  const all_data_of_post = useSelector(
    (state) => state.published_show_request_response_data
  );
  const offset_increment = useSelector((state) => state.offset_increment);
  const hasmoredata = useSelector((state) => state.hasmoredata);

  useEffect(() => {
    dispatch({
      type: actions.GET_PUBLISHED_POSTS,
      payload: LoginInfoObject,
      offset: offset_increment,
    });
    // eslint-disable-next-line
  }, [offset_increment]);

  useEffect(() => {
    dispatch({
      type: actions.RESET_OFFSET_VALUE,
      payload: 1,
    });
    // eslint-disable-next-line
  }, []);

  function loadMoreData() {
    dispatch({
      type: actions.OFFSET_INCREMENT,
      payload: offset_increment,
    });
  }

  function ShowPublishedPosts(item) {
    dispatch({
      type: actions.SHOW_PUBLISHED_POSTS,
      payload: LoginInfoObject,
      item: item,
      id: item.id,
    });

    dispatch({
      type: actions.COMMENT_EDIT_DATA,
      payload: {},
    });
  }
  return (
    <div>
      <Layout>
        <Sider id="sider" width={"300px"}>
          <h2>Recent Blogs</h2>
          <div
            id="scrollableDiv"
            style={{
              height: "83vh",
              overflow: "scroll",
              padding: "0 16px",
              border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
          >
            <InfiniteScroll
              dataLength={published_posts}
              next={loadMoreData}
              hasMore={hasmoredata}
              loader={
                <Skeleton
                  avatar
                  paragraph={{
                    rows: 1,
                  }}
                  active
                />
              }
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                itemLayout="horizontal"
                dataSource={published_posts}
                renderItem={(item) => (
                  <List.Item
                    onClick={() => ShowPublishedPosts(item)}
                    style={{
                      cursor: "pointer",
                      padding: 10,
                      height: 100,
                      // borderRight: ["solid 1px lightgray"],
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        item.user.profile_url ? (
                          <Avatar
                            src={item.user.profile_url}
                            shape="square"
                            size="large"
                          />
                        ) : (
                          <Avatar
                            icon={<UserOutlined />}
                            shape="square"
                            size="large"
                          />
                        )
                      }
                      title={item.name}
                      description={`- ${item.user.first_name}, ${moment(
                        item.updated_at
                      ).format("DD-MMM-YYYY")}`}
                    />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </Sider>
        <Content>
          {all_data_of_post ? (
            <DashboardBlogContent />
          ) : (
            <h3>Select Some Post</h3>
          )}
        </Content>
      </Layout>
    </div>
  );
}

export default DashboardPageComponent;
