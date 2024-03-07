import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";

interface IAccountMenuProps {
  visible: boolean;
}

const AccountMenu: React.FC<IAccountMenuProps> = ({ visible }) => {
  const dispatch = useDispatch<AppDispatch>();
  const username = useSelector(
    (state: RootState) => state.authReducer.username
  );
  if (!visible) return;
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <p className="text-white text-sm group-hover/item:underline">
            {username}
          </p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div
        onClick={() => dispatch(logout())}
        className="px-3 text-center text-white text-sm hover:underline"
      >
        Sign out of Mozhi
      </div>
    </div>
  );
};

export default AccountMenu;
