import React, { useCallback, useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { MdHomeFilled } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RootState } from "@/redux/store";
import AccountMenu from "./AccountMenu";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);

  const username = useSelector(
    (state: RootState) => state.authReducer.username
  );

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-[90%] lg:h-[122px] m-auto mt-[3%] flex items-center border-2 rounded-[20px] px-6 bg-white gap-3">
      <div
        onClick={() => navigate("/")}
        className="text-[32px] lg:text-[64px] font-semibold text-[#D0D0FF] grow cursor-pointer"
      >
        Mozhi
      </div>
      <div
        onClick={toggleAccountMenu}
        className="lg:hidden flex-row items-center cursor-pointer relative"
      >
        <div className="py-6 pr-4 text-2xl font-medium whitespace-nowrap cursor-pointer">
          <FaUser />
        </div>
        <AccountMenu visible={showAccountMenu} />
      </div>
      <div className="lg:hidden flex items-center">
        <Sheet>
          <SheetTrigger>
            <div className="py-6 text-2xl font-medium whitespace-nowrap cursor-pointer">
              <AiOutlineMenuUnfold />
            </div>
          </SheetTrigger>
          <SheetContent>
            <div
              onClick={() => navigate("/")}
              className={`flex gap-3 px-6 py-6 text-xl font-medium whitespace-nowrap items-center ${
                pathname === "/" ? "bg-violet-500 rounded-xl text-white" : ""
              }`}
            >
              <MdHomeFilled /> Home
            </div>
            <div
              onClick={() => navigate("/history")}
              className={`flex gap-3 px-6 py-6 text-xl font-medium whitespace-nowrap items-center ${
                pathname === "/history"
                  ? "bg-violet-500 rounded-xl text-white"
                  : ""
              }`}
            >
              <BiHistory />
              History
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div
        onClick={() => navigate("/")}
        className={`hidden lg:flex gap-3 justify-center px-10 py-6 text-2xl font-medium hover:text-white whitespace-nowrap hover:bg-violet-500 hover:rounded-2xl cursor-pointer border-l border-black ${
          pathname === "/" ? "bg-violet-500 rounded-2xl text-white" : ""
        }`}
      >
        <MdHomeFilled /> Home
      </div>
      <div
        onClick={() => navigate("/history")}
        className={`hidden lg:flex gap-3 justify-center px-10 py-6 text-2xl font-medium hover:text-white whitespace-nowrap hover:bg-violet-500 hover:rounded-2xl cursor-pointer border-l border-black ${
          pathname === "/history" ? "bg-violet-500 rounded-2xl text-white" : ""
        }`}
      >
        <BiHistory />
        History
      </div>
      <div
        onClick={toggleAccountMenu}
        className="hidden lg:flex flex-row items-center cursor-pointer relative"
      >
        <div className="pl-10 py-6 pr-4 text-2xl font-medium whitespace-nowrap cursor-pointer border-l border-black">
          {username ? username : "User Name"}
        </div>
        <IoChevronDown
          className={`w-4 transition ${
            showAccountMenu ? "-rotate-180" : "rotate-0"
          }`}
        />
        <AccountMenu visible={showAccountMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
