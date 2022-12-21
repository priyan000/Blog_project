import axios from "axios";

export function PostRequest(payload) {
  var data = {
    email: payload.email,
    first_name: payload.first_name,
    last_name: payload.last_name,
    password: payload.password,
    password_confirmation: payload.password_confirmation,
  };
  // console.log(data);

  var config = {
    method: "post",
    url: "https://react-assignment-api.herokuapp.com/api/register",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    data: data,
  };

  return axios(config).then(function (response) {
    return response.data;
  });
}

export function SigninPostRequest(params) {
  var data = {
    email: params.email,
    password: params.password,
  };

  var config = {
    method: "post",
    url: "https://react-assignment-api.herokuapp.com/api/login",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    data: data,
  };

  return axios(config).then(function (response) {
    return response;
  });
}

export function SignOutDeletRequest(params) {
  const authkey = params.payload.headers.authorization;

  var config = {
    method: "delete",
    url: "https://react-assignment-api.herokuapp.com/api/logout",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
  };

  return axios(config).then(function (response) {
    return response;
  });
}

export function PostsGetRequest(params) {
  const authkey = params.payload.headers.authorization;

  var config = {
    method: "get",
    url: "https://react-assignment-api.herokuapp.com/api/posts?limit=10&page=1&sort=name&order=desc",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
  };

  return axios(config).then(function (response) {
    return response.data;
  });
}

export function CreatePostsRequest(params) {
  const formData = new FormData();
  formData.append("name", params.payload.blogtitle);
  formData.append("content", params.payload.content);
  formData.append("image", params.payload.coverimage.file.originFileObj);

  const authkey = params.LoginInfoObject.headers.authorization;
  var config = {
    method: "post",
    url: "https://react-assignment-api.herokuapp.com/api/posts",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
    data: formData,
  };

  return axios(config).then(function (response) {
    return response.data;
  });
}

export function PostsDeleteRequest(params) {
  const authkey = params.payload.headers.authorization;
  const postId = params.current.id;

  var config = {
    method: "delete",
    url: `https://react-assignment-api.herokuapp.com/api/posts/${postId}`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
  };

  return axios(config).then(function (response) {
    return response.data;
  });
}

export function PostsEditRequest(params) {
  const authkey = params.LoginInfoObject.headers.authorization;
  const id = params.payload.id;
  var formData = new FormData();
  formData.append("name", params.fileList.blogtitle);
  formData.append("content", params.fileList.content);
  if (
    params.fileList.coverimage !== 0 &&
    // eslint-disable-next-line
    params.fileList.coverimage.fileList != 0
  ) {
    formData.append("image", params.fileList.coverimage.file.originFileObj);
  }
  formData.append("_method", "patch");

  var config = {
    method: "post",
    url: `https://react-assignment-api.herokuapp.com/api/posts/${id}`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
    data: formData,
  };
  return axios(config).then(function (response) {
    return response.data;
  });
}

export function ValidationGetRequest(params) {
  const authkey = params.payload.headers.authorization;
  var config = {
    method: "get",
    url: "https://react-assignment-api.herokuapp.com/api/validate-user",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
  };

  return axios(config).then(function (response) {
    return response.data;
  });
}

export function ShowCreatedPostsRequest(params) {
  const authkey = params.payload.headers.authorization;

  var config = {
    method: "get",
    url: `https://react-assignment-api.herokuapp.com/api/posts/${params.id}`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
  };

  return axios(config).then(function (response) {
    return response.data;
  });
}

export function PublishPostsRequest(params) {
  const authkey = params.payload.headers.authorization;
  const id = params.current.id;

  var config = {
    method: "post",
    url: `https://react-assignment-api.herokuapp.com/api/posts/${id}/publish/${!params
      .current.is_published}`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
  };

  return axios(config).then(function (response) {
    // console.log(response);
    return response.data;
  });
}

export function PublishedPostsGetRequest(params) {
  const authkey = params.payload.headers.authorization;
  const offset = params.offset;

  var config = {
    method: "get",
    url: `https://react-assignment-api.herokuapp.com/api/public/posts?offset=${offset}`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
  };

  return axios(config).then(function (response) {
    return response.data;
  });
}

export function PublishedPostsShowRequest(params) {
  const authkey = params.payload.headers.authorization;
  const id = params.id;

  var config = {
    method: "get",
    url: `https://react-assignment-api.herokuapp.com/api/public/posts/${id}`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
  };

  return axios(config).then(function (response) {
    return response.data;
  });
}

export function CreateCommentRequest(params) {
  const authkey = params.LoginInfoObject.headers.authorization;
  const id = params.all_data_of_post.id;
  var data = JSON.stringify({
    comment: params.payload.comment,
  });

  var config = {
    method: "post",
    url: `https://react-assignment-api.herokuapp.com/api/posts/${id}/comments`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
    data: data,
  };

  return axios(config).then(function (response) {
    return response.data;
  });
}

export function DeletCommentRequest(params) {
  const authkey = params.LoginInfoObject.headers.authorization;
  const id = params.payload.id;

  var config = {
    method: "delete",
    url: `https://react-assignment-api.herokuapp.com/api/posts/comments/${id}`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
  };

  return axios(config).then(function (response) {
    return response.data;
  });
}

export function EditCommentRequest(params) {
  const authkey = params.LoginInfoObject.headers.authorization;
  const C_Id = params.edit_data_for_comment.id;
  var data = JSON.stringify({
    comment: params.payload.comment,
  });

  var config = {
    method: "patch",
    url: `https://react-assignment-api.herokuapp.com/api/posts/comments/${C_Id}`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
    data: data,
  };
  return axios(config).then(function (response) {
    return response.data;
  });
}

export function UpdateProfileRequest(params) {
  console.log(params);
  console.log(
    "image object file testing",
    params.payload.image.file.originFileObj
  );
  const authkey = params.LoginInfoObject.headers.authorization;
  var data = new FormData();
  data.append("first_name", params.payload.first_name);
  data.append("last_name", params.payload.last_name);
  data.append("image", params.payload.image.file.originFileObj);
  data.append("_method", "patch");

  var config = {
    method: "post",
    url: "https://react-assignment-api.herokuapp.com/api/update/profile",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
    data: data,
  };

  return axios(config).then(function (response) {
    return response.data;
  });
}

export function PostGetRequestWithFilter(params) {
  const authkey = params.payload.headers.authorization;
  var config = {
    method: "get",
    url: `https://react-assignment-api.herokuapp.com/api/posts?limit=10&page=1&sort=name&order=desc&search=${params.search}`,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: authkey,
    },
  };

  return axios(config).then(function (response) {
    return response.data;
  });
}
