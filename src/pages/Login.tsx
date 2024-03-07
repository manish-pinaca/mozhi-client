/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch, RootState } from "@/redux/store";
import { useCallback, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { login } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";

interface IError {
  username?: string;
  password?: string;
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.authReducer);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPasswordMessage, setShowPasswordMessage] =
    useState<boolean>(false);
  const [passwordType, setPasswordType] = useState<string>("password");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errors, setErrors] = useState<IError>({});

  const handleLogin = useCallback(async () => {
    let newErrors: IError = {};

    if (!username.trim()) {
      newErrors = {
        ...newErrors,
        username: "Username is required.",
      };
    }
    if (!password.trim()) {
      newErrors = {
        ...newErrors,
        password: "Password is required.",
      };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      dispatch(login({ username, password, rememberMe })).then((res: any) => {
        if (res.error) {
          toast({
            variant: "destructive",
            title: "Login unsuccessful",
            description: res.error.message,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        } else {
          toast({
            title: "Login successful!",
            description: `Welcome ${username}!`,
          });
          navigate("/");
        }
      });
    }
  }, [username, password, toast, navigate, dispatch, rememberMe]);

  const togglePasswordType = useCallback(() => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  }, [passwordType]);
  return (
    <div className="w-[100%] lg:w-[90%] h-[100vh] lg:h-[90vh] m-auto bg-[#F5F4F8] rounded-[80px] lg:rounded-[100px] border-[7px] lg:border-[15px] border-[#8F6EFE] flex">
      <div className="w-1/2 h-full hidden lg:block"></div>
      <div className="w-full md:w-4/5 lg:w-1/3 h-full px-8 py-16 self-center m-auto lg:m-0">
        <h2 className="text-3xl lg:text-4xl mb-8 font-semibold">
          Welcome Back
        </h2>
        <div className="flex flex-col gap-4 mt-8">
          <p className="text-[#27476E] text-xl lg:text-2xl font-medium leading-none">
            Enter Your Username
          </p>
          <Input
            value={username}
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            className="py-6 px-4 text-xl lg:text-2xl -mt-2"
          />
          {errors.username && (
            <p className="text-sm text-red-400 leading-none -mt-2">
              {errors.username}
            </p>
          )}
          <div className="flex justify-between items-center">
            <p className="text-[#27476E] text-xl lg:text-2xl font-medium leading-none">
              Enter Your Password
            </p>
            <span
              className="cursor-pointer"
              onMouseEnter={() => setShowPasswordMessage(true)}
              onMouseLeave={() => setShowPasswordMessage(false)}
            >
              <IoMdInformationCircle />
            </span>
          </div>
          <div className="relative border border-red-100">
            <Input
              type={passwordType}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="py-6 px-4 text-xl lg:text-2xl -mt-2 block"
            />
            {passwordType === "password" ? (
              <FaEyeSlash
                onClick={togglePasswordType}
                size={24}
                className="absolute bottom-3 right-3 cursor-pointer"
              />
            ) : (
              <FaEye
                onClick={togglePasswordType}
                size={24}
                className="absolute bottom-3 right-3 cursor-pointer"
              />
            )}
          </div>
          {showPasswordMessage && (
            <p className="text-sm text-red-400 leading-none -mt-2">
              Password must have 8-16 characters with 1 upper, 1 lower, 1
              number, 1 special (@,$,_, -).
            </p>
          )}
          {errors.password && (
            <p className="text-sm text-red-400 leading-none -mt-2">
              {errors.password}
            </p>
          )}
        </div>
        <div className="w-full flex justify-between mt-[5%]">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              onCheckedChange={(checked: boolean) => setRememberMe(checked)}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember my account
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium leading-none cursor-pointer hover:underline">
              Forget Password ?
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-[5%]">
          <Button
            disabled={isLoading}
            onClick={handleLogin}
            className="w-full px-20 py-6 bg-[#D0D0FF] text-[#575757] text-2xl hover:bg-[#8F6EFE] hover:text-white font-bold transition"
          >
            {isLoading ? "Logging you..." : "Log In"}
          </Button>
        </div>
        <p className="text-neutral-500 mt-6 text-xl">
          First time using Mozhi?
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 ml-1 hover:underline cursor-pointer"
          >
            Create an account
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
