import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "@/redux/store";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  return children;
};

export default PrivateRoute;
