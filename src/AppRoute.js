import { Routes, Route, BrowserRouter } from "react-router-dom";
import TouchDeviceFlow from "./App";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TouchDeviceFlow />} />
      </Routes>
    </BrowserRouter>
  );
}
