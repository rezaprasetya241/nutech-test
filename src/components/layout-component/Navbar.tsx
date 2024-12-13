import { Link, useLocation } from "react-router-dom";
import logoImg from "../../assets/png/Logo.png";
const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  return (
    <div className="flex justify-center pt-12 pb-3 border-b">
      <div className="flex items-center justify-between max-w-5xl  w-full">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logoImg} alt="logo-brand" />
          <p>SIMS PPOB</p>
        </Link>
        <div className="flex items-center gap-12">
          <Link
            to={"/top-up"}
            className={isActive("/top-up") ? "text-red-500" : ""}
          >
            Top Up
          </Link>
          <Link
            to={"/transaction"}
            className={isActive("/transaction") ? "text-red-500" : ""}
          >
            Transaction
          </Link>
          <Link
            to={"/profile"}
            className={isActive("/profile") ? "text-red-500" : ""}
          >
            Akun
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
