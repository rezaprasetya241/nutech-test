import Navbar from "@/components/layout-component/Navbar";
import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center w-full mt-5">
        <div className="max-w-5xl w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
