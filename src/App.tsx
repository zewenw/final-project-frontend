import MyLayout from "./components/MyLayout";
import { Routes, Route } from "react-router-dom";
import Tracing from "./pages/monitor/Tracing";
import Hardware from "./pages/monitor/Hardware";
import Log from "./pages/monitor/Log";
import Service from "./pages/monitor/Service";
import API from "./pages/monitor/API";
import Users from "./pages/user/Users";
import Roles from "./pages/user/Roles";

import Upload from "./pages/photo/Upload";
import View from "./pages/photo/View";
import Download from "./pages/photo/Download";
import Permission from "./pages/user/Permission";

function App() {
  return (
    <MyLayout>
      <Routes>
        <Route path="tracing" element={<Tracing />} />
        <Route path="hardware" element={<Hardware />} />
        <Route path="log" element={<Log />} />
        <Route path="service" element={<Service />} />
        <Route path="api" element={<API />} />
        <Route path="user" element={<Users />} />
        <Route path="role" element={<Roles />} />
        <Route path="permission" element={<Permission />} />
        <Route path="upload" element={<Upload />} />
        <Route path="view" element={<View />} />
        <Route path="download" element={<Download />} />
      </Routes>
    </MyLayout>
  );
}

export default App;
