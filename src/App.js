import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import NoMatch from "./components/NoMatch";
import store from "./redux/Store";
import { Provider } from "react-redux";
// import DashboardPage from "./components/HomePage";
import RequireAuth from "./components/RequireAuth";
import PostPageComponent from "./components/PostPageComponent";
import ProfilePageComponent from "./components/ProfilePageComponent";
import HomePage from "./components/HomePage";
import DashboardPageComponent from "./components/DashboardPageComponent";
import BlogPage from "./components/BlogPage";
import BlogContent from "./components/BlogContent";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            >
              <Route path="profile" element={<ProfilePageComponent />} />
              <Route path="dashboard" element={<DashboardPageComponent />} />
              <Route path="post" element={<PostPageComponent />} />
            </Route>
            <Route path="home/post/blogcontent" element={<BlogPage />}>
              <Route path=":id" element={<BlogContent />} />
            </Route>

            <Route
              path="*"
              element={
                <RequireAuth>
                  <NoMatch />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;
