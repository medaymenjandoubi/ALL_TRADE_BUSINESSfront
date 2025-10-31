import {
  Button,
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOtpVerificationError,
  clearResendOtpError,
  clearResendOtpSuccessMessage,
  resendOtpAsync,
  resetOtpVerificationStatus,
  resetResendOtpStatus,
  selectLoggedInUser,
  selectOtpVerificationError,
  selectOtpVerificationStatus,
  selectResendOtpError,
  selectResendOtpStatus,
  selectResendOtpSuccessMessage,
  verifyOtpAsync,
} from "../AuthSlice";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const OtpVerfication = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const resendOtpStatus = useSelector(selectResendOtpStatus);
  const resendOtpError = useSelector(selectResendOtpError);
  const resendOtpSuccessMessage = useSelector(selectResendOtpSuccessMessage);
  const otpVerificationStatus = useSelector(selectOtpVerificationStatus);
  const otpVerificationError = useSelector(selectOtpVerificationError);

  // handles the redirection
  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    } else if (loggedInUser && loggedInUser?.isVerified) {
      navigate("/");
    }
  }, [loggedInUser]);

  const handleSendOtp = () => {
    const data = { user: loggedInUser?._id };
    dispatch(resendOtpAsync(data));
  };

  const handleVerifyOtp = (data) => {
    const cred = { ...data, userId: loggedInUser?._id };
    dispatch(verifyOtpAsync(cred));
  };

  // handles resend otp error
  useEffect(() => {
    if (resendOtpError) {
      toast.error(resendOtpError.message);
    }
    return () => {
      dispatch(clearResendOtpError());
    };
  }, [resendOtpError]);

  // handles resend otp success message
  useEffect(() => {
    if (resendOtpSuccessMessage) {
      toast.success(resendOtpSuccessMessage.message);
    }
    return () => {
      dispatch(clearResendOtpSuccessMessage());
    };
  }, [resendOtpSuccessMessage]);

  // handles error while verifying otp
  useEffect(() => {
    if (otpVerificationError) {
      toast.error(otpVerificationError.message);
    }
    return () => {
      dispatch(clearOtpVerificationError());
    };
  }, [otpVerificationError]);

  useEffect(() => {
    if (otpVerificationStatus === "fullfilled") {
      toast.success(
        "E-mail vérifié ! Nous sommes heureux de vous avoir parmi nous"
      );
      dispatch(resetResendOtpStatus());
    }
    return () => {
      dispatch(resetOtpVerificationStatus());
    };
  }, [otpVerificationStatus]);

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      noValidate
      flexDirection={"column"}
      rowGap={3}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        component={Paper}
        elevation={1}
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}
        p={"2rem"}
        rowGap={"2rem"}
      >
        <Typography mt={4} variant="h5" fontWeight={500}>
          Vérifiez votre adresse e-mail
        </Typography>

        {resendOtpStatus === "fullfilled" ? (
          <Stack
            width={"100%"}
            rowGap={"1rem"}
            component={"form"}
            noValidate
            onSubmit={handleSubmit(handleVerifyOtp)}
          >
            <Stack rowGap={"1rem"}>
              <Stack>
                <Typography color={"GrayText"}>
                  Entrez le code OTP à 4 chiffres envoyé à
                </Typography>
                <Typography fontWeight={"600"} color={"GrayText"}>
                  {loggedInUser?.email}
                </Typography>
              </Stack>
              <Stack>
                <TextField
                  {...register("otp", {
                    required: "Le code OTP est requis",
                    minLength: {
                      value: 4,
                      message: "Veuillez entrer un code OTP de 4 chiffres",
                    },
                  })}
                  fullWidth
                  type="number"
                />
                {errors?.otp && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.otp.message}
                  </FormHelperText>
                )}
              </Stack>
            </Stack>
            <LoadingButton
              loading={otpVerificationStatus === "pending"}
              type="submit"
              fullWidth
              variant="contained"
            >
              Vérifier
            </LoadingButton>
          </Stack>
        ) : (
          <>
            <Stack>
              <Typography color={"GrayText"}>
                Nous allons vous envoyer un code OTP à
              </Typography>
              <Typography fontWeight={"600"} color={"GrayText"}>
                {loggedInUser?.email}
              </Typography>
            </Stack>
            <LoadingButton
              onClick={handleSendOtp}
              loading={resendOtpStatus === "pending"}
              fullWidth
              variant="contained"
            >
              Recevoir le code OTP
            </LoadingButton>
          </>
        )}
      </Stack>
    </Stack>
  );
};
