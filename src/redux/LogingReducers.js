import actions from "./LogingActions";

const initialState = {
  RegisterDetail: [],
  LoginDetails: null,
  PostsFromApi: [],
  drawerOpen: false,
  CreatedPosts: {},
  edit_data: {},
  publish_response: [],
  published_posts_data: [],
  published_show_request_response_data: null,
  user_details_for_published_post: [],
  comments_response: [],
  edit_data_for_comment: null,
  offset_increment: 1,
  hasmoredata: true,
  loader: false,
  post_loader: false,
  dashboard_loader: false,
  comment_loader: false,
  publish_loader: false,
  post_create_loader: false,
  post_from_api_with_filter: [],
  all_comments_data: [],
  response_from_create_post: [],
  table_datas_only: [],
};

export default function Reducers(state = initialState, action) {
  switch (action.type) {
    case actions.USER_REGISTER: {
      return {
        ...state,
        // loader: true,
      };
    }
    case actions.USER_REGISTER_SUCCESS: {
      return {
        ...state,
        RegisterDetail: [...state.RegisterDetail, action.payload],
        // RegisterDetail: action.payload,
        // loader: false,
      };
    }

    case actions.USER_REGISTER_FAILED: {
      return {
        ...state,
        // loader: false,
      };
    }
    case actions.USER_SIGNIN: {
      return {
        ...state,
        loader: true,
      };
    }
    case actions.USER_SIGNIN_SUCCESS: {
      return {
        ...state,
        LoginDetails: action.payload,
        loader: false,
      };
    }
    case actions.USER_SIGNIN_FAILED: {
      return {
        ...state,
        loader: false,
      };
    }

    case actions.USER_SIGNOUT: {
      return { ...state, loader: true };
    }

    case actions.USER_SIGNOUT_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case actions.USER_SIGNOUT_FAILED: {
      return {
        ...state,
        loader: false,
      };
    }
    case actions.POSTS_GET: {
      return {
        ...state,
        post_loader: true,
      };
    }
    case actions.POSTS_GET_SUCCESS: {
      return {
        ...state,
        PostsFromApi: action.payload,
        post_loader: false,
        table_datas_only: action.payload.data,
      };
    }
    case actions.POSTS_GET_FAILED: {
      return {
        ...state,
        post_loader: false,
      };
    }
    case actions.CREATE_POSTS: {
      return {
        ...state,
        post_create_loader: true,
      };
    }
    case actions.CREATE_POSTS_SUCCESS: {
      return {
        ...state,
        post_create_loader: false,
        drawerOpen: false,
        table_datas_only: [...state.table_datas_only, action.payload],
      };
    }
    case actions.CREATE_POSTS_FAILED: {
      return {
        post_create_loader: false,
        ...state,
      };
    }
    case actions.DELETE_POSTS: {
      return {
        ...state,
      };
    }
    case actions.DELETE_POSTS_SUCCESS: {
      console.log("delete post success response", { action });
      return {
        ...state,
        table_datas_only: state.table_datas_only.filter((list) => {
          if (list.id !== action.payload.post_id) {
            return list;
          }
          return 0;
        }),
      };
    }
    case actions.DELETE_POSTS_FAILED: {
      return {
        ...state,
      };
    }
    case actions.EDIT_POSTS: {
      return {
        ...state,
        post_create_loader: true,
      };
    }
    case actions.EDIT_POSTS_SUCCESS: {
      console.log("action for edit post success", { action });
      if (action.new_post_data_after_edit.coverimage !== 0) {
        state.CreatedPosts.name = action.new_post_data_after_edit.blogtitle;
        state.CreatedPosts.content = action.new_post_data_after_edit.content;
        const newimageblob = URL.createObjectURL(
          action.new_post_data_after_edit.coverimage.file.originFileObj
        );
        state.CreatedPosts.image_url = newimageblob;
        return {
          ...state,
          CreatedPosts: { ...state.CreatedPosts },
          post_create_loader: false,
          drawerOpen: false,
        };
      } else {
        state.CreatedPosts.name = action.new_post_data_after_edit.blogtitle;
        state.CreatedPosts.content = action.new_post_data_after_edit.content;
        return {
          ...state,
          CreatedPosts: { ...state.CreatedPosts },
          post_create_loader: false,
          drawerOpen: false,
        };
      }
    }
    case actions.EDIT_POSTS_FAILED: {
      return {
        ...state,
        post_create_loader: false,
      };
    }
    case actions.VALIDATE_USER: {
      return {
        ...state,
        // loader: true,
      };
    }
    case actions.VALIDATE_USER_SUCCESS: {
      return {
        ...state,
        // validation_response: action.payload,
        // loader: false,
      };
    }
    case actions.VALIDATE_USER_FAILED: {
      return {
        ...state,
        // loader: false,
      };
    }
    case actions.DRAWER_OPEN: {
      return {
        ...state,
        drawerOpen: action.payload,
      };
    }
    case actions.SHOW_CREATED_POSTS: {
      return {
        ...state,
        // post_loader: true,
      };
    }
    case actions.SHOW_CREATED_POSTS_SUCCESS: {
      return {
        ...state,
        CreatedPosts: action.payload,
        // post_loader: false,
      };
    }
    case actions.SHOW_CREATED_POSTS_FAILED: {
      return {
        ...state,
        // post_loader: false,
      };
    }
    case actions.DATA_TO_BE_EDITED: {
      return {
        ...state,
        edit_data: action.payload,
      };
    }
    case actions.PUBLISH_POSTS: {
      return {
        ...state,
        publish_loader: true,
      };
    }
    case actions.PUBLISH_POSTS_SUCCESS: {
      var current_date_time = new Date();
      if (action.payload.message === "Post published successfully") {
        state.CreatedPosts.is_published = true;
        state.table_datas_only.map((list) => {
          if (list.id === action.id) {
            list.is_published = true;
            list.updated_at = current_date_time;
            // state.CreatedPosts.is_published = true;
            return list;
          }
          return 0;
        });
      }
      if (action.payload.message === "Post un published successfully") {
        state.CreatedPosts.is_published = false;
        state.table_datas_only.map((list) => {
          if (list.id === action.id) {
            list.is_published = false;
            list.updated_at = current_date_time;
            // state.CreatedPosts.is_published = true;
            return list;
          }
          return 0;
        });
      }

      return {
        ...state,
        publish_response: action.payload,
        publish_loader: false,
      };
    }
    case actions.PUBLISH_POSTS_FAILED: {
      return {
        ...state,
        publish_loader: false,
      };
    }
    case action.GET_PUBLISHED_POSTS: {
      return {
        ...state,
      };
    }
    case actions.GET_PUBLISHED_POSTS_SUCCESS: {
      if (state.offset_increment === 1) {
        return {
          ...state,
          hasmoredata: true,
          published_posts_data: [...action.payload],
        };
      } else {
        if (action.payload.length < 10) {
          if (action.payload.length === 0) {
            return {
              ...state,
              hasmoredata: false,
            };
          } else {
            return {
              ...state,
              // hasmoredata: false,

              published_posts_data: [
                ...state.published_posts_data,
                ...action.payload,
              ],
              hasmoredata: false,
            };
          }
        } else {
          return {
            ...state,
            // hasmoredata: true,
            published_posts_data: [
              ...state.published_posts_data,
              ...action.payload,
            ],
            hasmoredata: true,
          };
        }
      }
    }
    case actions.GET_PUBLISHED_POSTS_FAILED: {
      return {
        ...state,
      };
    }
    case actions.SHOW_PUBLISHED_POSTS: {
      return {
        ...state,
        dashboard_loader: true,
      };
    }
    case actions.SHOW_PUBLISHED_POSTS_SUCCESS: {
      return {
        ...state,
        published_show_request_response_data: action.payload,
        user_details_for_published_post: action.item,
        dashboard_loader: false,
        all_comments_data: action.payload.comments,
        // all_comments_data: state.published_show_request_response_data.comments,
      };
    }
    case actions.SHOW_PUBLISHED_POSTS_FAILED: {
      return {
        ...state,
        dashboard_loader: false,
      };
    }
    case actions.CREATE_COMMENT: {
      return {
        ...state,
        comment_loader: true,
        // all_comments_data: state.published_show_request_response_data.comments,
      };
    }
    case actions.CREATE_COMMENT_SUCCESS: {
      return {
        ...state,
        all_comments_data: [...state.all_comments_data, action.payload[0]],
        comment_loader: false,
      };
    }
    case actions.CREATE_COMMENT_FAILED: {
      return {
        ...state,
        comment_loader: false,
      };
    }
    case actions.DELETE_COMMENT: {
      return {
        ...state,
        // comment_loader: true,
      };
    }
    case actions.DELETE_COMMENT_SUCCESS: {
      // console.log({ action });
      // debugger;
      return {
        ...state,
        all_comments_data: state.all_comments_data.filter((list) => {
          if (list.id !== action.payload.comment_id) {
            return list;
          }
          return 0;
        }),
        // comment_loader: false,
      };
    }

    case actions.DELETE_COMMENT_FAILED: {
      return {
        ...state,
        // comment_loader: false,
      };
    }
    case actions.EDIT_COMMENT: {
      return {
        ...state,
        comment_loader: true,
      };
    }
    case actions.EDIT_COMMENT_SUCCESS: {
      return {
        ...state,
        comment_loader: false,
        // ...state.all_comments_data,
        all_comments_data:
          // ...state.all_comments_data,
          state.all_comments_data.filter((list) => {
            if (list.id === action.id_of_comment) {
              list.comment = action.new_comment.comment;
              return [list];
            }
            return [...state.all_comments_data];
          }),
      };
    }
    case actions.EDIT_COMMENT_FAILED: {
      return {
        ...state,
        comment_loader: false,
      };
    }
    case actions.COMMENT_EDIT_DATA: {
      // console.log({ action });
      return {
        ...state,
        edit_data_for_comment: action.payload,
      };
    }
    case actions.OFFSET_INCREMENT: {
      // console.log("offset increment", { action });
      return {
        ...state,
        offset_increment: state.offset_increment + 1,
      };
    }
    case actions.UPDATE_PROFILE: {
      return {
        ...state,
      };
    }
    case actions.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
      };
    }
    case actions.UPDATE_PROFILE_FAILED: {
      return {
        ...state,
      };
    }
    case actions.RESET_OFFSET_VALUE: {
      return {
        ...state,
        offset_increment: action.payload,
        // hasmoredata: true,
      };
    }
    case actions.SEARCH_FILTER: {
      return {
        ...state,
      };
    }
    case actions.SEARCH_FILTER_SUCCESS: {
      // console.log({ action });
      return {
        ...state,
        post_from_api_with_filter: action.payload,
      };
    }
    case actions.SEARCH_FILTER_FAILED: {
      return {
        ...state,
      };
    }

    default:
      return { ...state };
  }
}
