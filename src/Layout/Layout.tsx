import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
