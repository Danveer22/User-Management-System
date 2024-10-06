import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import User from "./components/User";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/user/:id" element={<User />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
