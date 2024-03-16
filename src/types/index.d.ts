declare type LoginParams = {
  username: string;
  password: string;
  rememberMe: boolean;
};

declare type RegisterParams = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

declare type ForgotPasswordParams = {
  email: string;
}

declare type VerifyOTPParams = {
  email: string;
  otp: string;
}

declare type ResetPasswordParams = {
  email: string;
  otp: string;
  password: string;
}
