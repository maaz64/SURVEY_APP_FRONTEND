import { Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar";
import SignUpPage from "./Components/SignUpPage";
import SignInPage from "./Components/SignInPage";
import SurveyForm from "./Components/SuveyForm";
import Profile from "./Components/Profile";
import ErrorPage from "./Components/ErrorPage";
import RequireAuth from "./Components/RequireAuth";
// import PersistLogin from "./Components/PersistLogin";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<SurveyForm />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />

          {/* protected route */}
          {/* <Route element={<PersistLogin/>}> */}
            <Route element={<RequireAuth />}>
              <Route path="profile" element={<Profile />} />
            </Route>
          {/* </Route> */}

          {/* Missing route */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
