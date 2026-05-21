import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import Admin from "./pages/admin/Admin";
import ProjectDetails from "./pages/user/ProjectDetails";

function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<Home />} />
        {}
        <Route path="/admin" element={<Admin />} />
        {}
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
