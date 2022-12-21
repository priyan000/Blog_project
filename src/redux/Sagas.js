import {
  PostRequest,
  SigninPostRequest,
  SignOutDeletRequest,
  PostsGetRequest,
  CreatePostsRequest,
  PostsDeleteRequest,
  PostsEditRequest,
  ValidationGetRequest,
  ShowCreatedPostsRequest,
  PublishPostsRequest,
  PublishedPostsGetRequest,
  PublishedPostsShowRequest,
  CreateCommentRequest,
  DeletCommentRequest,
  EditCommentRequest,
  UpdateProfileRequest,
  PostGetRequestWithFilter,
} from "./Axios";
import actions from "./LogingActions";
import { takeEvery, put, call } from "redux-saga/effects";
import { message } from "antd";

function* HandleRegister(params) {
  try {
    const response = yield call(() => PostRequest(params.payload));
    yield put({
      type: actions.USER_REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: actions.USER_REGISTER_FAILED });
  }
}

function* HandleSignin(params) {
  try {
    const result = yield call(() => SigninPostRequest(params.payload));
    yield put({
      type: actions.USER_SIGNIN_SUCCESS,
      payload: result,
    });
    localStorage.setItem("SigninResponse", JSON.stringify(result));
    message.success("user login successful");
  } catch (error) {
    yield put({ type: actions.USER_SIGNIN_FAILED });
    message.error("user login failed");
  }
}

function* HandleSignOut(params) {
  try {
    const response = yield call(() => SignOutDeletRequest(params));
    yield put({
      type: actions.USER_SIGNOUT_SUCCESS,
      payload: response.data,
    });
    localStorage.removeItem("SigninResponse");
    params.navigate("/");
    message.success("user logged out successfully");
  } catch (error) {
    yield put({ type: actions.USER_SIGNOUT_FAILED });
    message.error("user logout failed");
  }
}

function* HandlePostsGet(params) {
  try {
    const response = yield call(() => PostsGetRequest(params));
    yield put({
      type: actions.POSTS_GET_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({ type: actions.POSTS_GET_FAILED });
  }
}

function* handleCreatePosts(params) {
  try {
    const response = yield call(() => CreatePostsRequest(params));
    yield put({
      type: actions.CREATE_POSTS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({ type: actions.CREATE_POSTS_FAILED });
  }
}

function* HandleDeletePosts(params) {
  try {
    const response = yield call(() => PostsDeleteRequest(params));
    yield put({
      type: actions.DELETE_POSTS_SUCCESS,
      payload: response,
    });
    message.success("post deleted successfully");
  } catch (error) {
    yield put({ type: actions.DELETE_POSTS_FAILED });
    if (error.response.data.error === "Token Expired.") {
      message.error("Token Expired Please Login Again");
    } else {
      message.error("Something Went Wrong");
    }
  }
}

function* HandleEditPosts(params) {
  try {
    yield call(() => PostsEditRequest(params));
    yield put({
      type: actions.EDIT_POSTS_SUCCESS,
      new_post_data_after_edit: params.fileList,
    });
    message.success("Post Is Edited Successfully");
  } catch (error) {
    yield put({ type: actions.EDIT_POSTS_FAILED });
    error.response.data.error !== "Token Expired."
      ? message.error("Something Went Wrong, Post Edit Failed")
      : message.error("Token Expired Please Login Again");
  }
}

function* HandelValidation(params) {
  try {
    yield call(() => ValidationGetRequest(params));
    yield put({
      type: actions.VALIDATE_USER_SUCCESS,
    });
  } catch (error) {
    yield put({ type: actions.VALIDATE_USER_FAILED });
    message.error("validation failed. Token expired");
    localStorage.removeItem("SigninResponse");
    params.navigate("/");
  }
}

function* HandleShowCreatedPosts(params) {
  try {
    const response = yield call(() => ShowCreatedPostsRequest(params));
    yield put({
      type: actions.SHOW_CREATED_POSTS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({ type: actions.SHOW_CREATED_POSTS_FAILED });
    if (error.response.data.error === "Token Expired.") {
      message.error("Validation Failed");
      localStorage.removeItem("SigninResponse");
      params.navigate("/");
    }
  }
}

function* HandlePublishPosts(params) {
  try {
    const response = yield call(() => PublishPostsRequest(params));
    yield put({
      type: actions.PUBLISH_POSTS_SUCCESS,
      payload: response,
      id: params.id,
    });
  } catch (error) {
    yield put({ type: actions.PUBLISH_POSTS_FAILED });
    error.response.data.error !== "Token Expired."
      ? message.error("Something Went Wrong, Publish Failed")
      : message.error("Token Expired Please Login Again");
  }
}

function* HandleGetPublishedPosts(params) {
  try {
    const response = yield call(() => PublishedPostsGetRequest(params));
    yield put({
      type: actions.GET_PUBLISHED_POSTS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({ type: actions.GET_PUBLISHED_POSTS_FAILED });
  }
}

function* HandleShowPublishedPosts(params) {
  try {
    const response = yield call(() => PublishedPostsShowRequest(params));
    yield put({
      type: actions.SHOW_PUBLISHED_POSTS_SUCCESS,
      payload: response,
      item: params.item,
    });
  } catch (error) {
    yield put({ type: actions.SHOW_PUBLISHED_POSTS_FAILED });
  }
}

function* HandleCreateComment(params) {
  try {
    const response = yield call(() => CreateCommentRequest(params));
    yield put({
      type: actions.CREATE_COMMENT_SUCCESS,
      payload: response,
    });
    message.success("Comment Posted Successfully");
  } catch (error) {
    yield put({ type: actions.CREATE_COMMENT_FAILED });
    error.response.data.error !== "Token Expired."
      ? message.error("Something Went Wrong, Comment Deletion Failed")
      : message.error("Token Expired Please Login Again");
  }
}

function* HandleDeletComment(params) {
  try {
    const response = yield call(() => DeletCommentRequest(params));
    yield put({
      type: actions.DELETE_COMMENT_SUCCESS,
      payload: response,
    });
    message.success("Comment deleted successfully");
  } catch (error) {
    yield put({ type: actions.DELETE_COMMENT_FAILED });
    error.response.data.error !== "Token Expired."
      ? message.error("Something Went Wrong, Comment Deletion Failed")
      : message.error("Token Expired Please Login Again");
  }
}

function* HandleEditComment(params) {
  try {
    const response = yield call(() => EditCommentRequest(params));
    yield put({
      type: actions.EDIT_COMMENT_SUCCESS,
      payload: response,
      new_comment: params.payload,
      id_of_comment: params.edit_data_for_comment.id,
    });
    message.success("your comment is edited successfully");
  } catch (error) {
    yield put({ type: actions.EDIT_COMMENT_FAILED });
    error.response.data.error !== "Token Expired."
      ? message.error("Something went wrong")
      : message.error("Token Expired Please Login Again");
  }
}

function* HandleProfileUpdate(params) {
  try {
    yield call(() => UpdateProfileRequest(params));
    yield put({
      type: actions.UPDATE_PROFILE_SUCCESS,
    });
  } catch (error) {
    yield put({ type: actions.UPDATE_PROFILE_FAILED });
  }
}

function* HandleSearchFilterForPostTable(params) {
  try {
    const response = yield call(() => PostGetRequestWithFilter(params));
    yield put({
      type: actions.SEARCH_FILTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: actions.SEARCH_FILTER_FAILED });
  }
}

export default function* HandleWatcherFunction() {
  yield takeEvery(actions.USER_REGISTER, HandleRegister);
  yield takeEvery(actions.USER_SIGNIN, HandleSignin);
  yield takeEvery(actions.USER_SIGNOUT, HandleSignOut);
  yield takeEvery(actions.POSTS_GET, HandlePostsGet);
  yield takeEvery(actions.CREATE_POSTS, handleCreatePosts);
  yield takeEvery(actions.DELETE_POSTS, HandleDeletePosts);
  yield takeEvery(actions.EDIT_POSTS, HandleEditPosts);
  yield takeEvery(actions.VALIDATE_USER, HandelValidation);
  yield takeEvery(actions.SHOW_CREATED_POSTS, HandleShowCreatedPosts);
  yield takeEvery(actions.PUBLISH_POSTS, HandlePublishPosts);
  yield takeEvery(actions.GET_PUBLISHED_POSTS, HandleGetPublishedPosts);
  yield takeEvery(actions.SHOW_PUBLISHED_POSTS, HandleShowPublishedPosts);
  yield takeEvery(actions.CREATE_COMMENT, HandleCreateComment);
  yield takeEvery(actions.DELETE_COMMENT, HandleDeletComment);
  yield takeEvery(actions.EDIT_COMMENT, HandleEditComment);
  yield takeEvery(actions.UPDATE_PROFILE, HandleProfileUpdate);
  yield takeEvery(actions.SEARCH_FILTER, HandleSearchFilterForPostTable);
}
