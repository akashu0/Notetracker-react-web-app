import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNote from "./screens/MyNote/MyNote";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import AdminScreen from "./screens/AdminScreen/AdminScreen";
import AdminLog from "./screens/AdminLog/AdminLog";
import CreateUser from "./screens/CreateUser/CreateUser";
import EditUser from "./screens/EditUser";
import { useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");

  console.log(search);

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" Component={LandingPage} exact />
          <Route path="/login" Component={LoginScreen} />
          <Route path="/register" Component={RegisterScreen} exact />
          <Route path="/mynote" Component={() => <MyNote />} />
          <Route path="/admin" Component={AdminLog} />
          <Route path="/createuser" Component={CreateUser} />
          <Route path="/admin/:id" Component={EditUser} />
          <Route
            path="/adminhome"
            Component={() => <AdminScreen search={search} />}
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
