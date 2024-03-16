/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch, RootState } from "@/redux/store";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { verifyOTP } from "@/redux/slices/authSlice";

interface IError {
  email?: string;
  otp?: string;
}

const VerifyOTP = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.authReducer);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [errors, setErrors] = useState<IError>({});

  const handleVerifyOTP = useCallback(async () => {
    let newErrors: IError = {};

    if (!email.trim()) {
      newErrors = {
        ...newErrors,
        email: "Email is required.",
      };
    }

    if (!otp.trim()) {
      newErrors = {
        ...newErrors,
        otp: "Email is required.",
      };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      dispatch(verifyOTP({ email, otp })).then((res: any) => {
        if (res.error) {
          toast({
            variant: "destructive",
            title: "Some error occurred",
            description: res.error.message,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        } else {
          toast({
            title: "OTP verified successfully",
            description: res.payload.message,
          });
          navigate("/login");
        }
      });
    }
  }, [email, otp, dispatch, toast, navigate]);

  return (
    <div className="w-[100%] lg:w-[90%] h-[100vh] lg:h-[90vh] m-auto bg-[#F5F4F8] rounded-[80px] lg:rounded-[100px] border-[7px] lg:border-[15px] border-[#8F6EFE] flex">
      <div className="w-1/2 h-full hidden lg:block"></div>
      <div className="w-full md:w-4/5 lg:w-1/3 h-full px-8 py-16 self-center m-auto lg:m-0">
        <h2 className="text-3xl lg:text-4xl mb-8 font-semibold">Verify OTP</h2>
        <div className="flex flex-col gap-4 mt-8">
          <p className="text-[#27476E] text-xl lg:text-2xl font-medium leading-none">
            Enter Your Email
          </p>
          <Input
            value={email}
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="py-6 px-4 text-xl lg:text-2xl -mt-2"
          />
          {errors.email && (
            <p className="text-sm text-red-400 leading-none -mt-2">
              {errors.email}
            </p>
          )}
          <p className="text-[#27476E] text-xl lg:text-2xl font-medium leading-none">
            Enter OTP
          </p>
          <Input
            value={otp}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOtp(e.target.value)
            }
            className="py-6 px-4 text-xl lg:text-2xl -mt-2"
          />
          {errors.otp && (
            <p className="text-sm text-red-400 leading-none -mt-2">
              {errors.otp}
            </p>
          )}
        </div>
        <div className="w-full flex justify-center mt-[5%]">
          <Button
            disabled={isLoading}
            onClick={handleVerifyOTP}
            className="w-full px-20 py-6 bg-[#D0D0FF] text-[#575757] text-2xl hover:bg-[#8F6EFE] hover:text-white font-bold transition"
          >
            {isLoading ? "Verifying OTP..." : "Verify OTP"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
