import { Routes, Route, useParams, BrowserRouter } from "react-router-dom";
import TouchDeviceFlow from "./App";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<TouchDeviceFlow />} />
      </Routes>
    </BrowserRouter>
  );
}
