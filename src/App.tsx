import { Routes, Route } from "react-router-dom";
import { Home, LoginPage, RegisterPage, NotFoundPage, Profile ,  EditProfile } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/editprofile" element ={<EditProfile/>}/>
      </Routes>
    </>
  );
}

export default App;
