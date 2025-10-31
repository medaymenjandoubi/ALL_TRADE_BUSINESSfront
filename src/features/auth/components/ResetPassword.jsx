import {
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearResetPasswordError,
  clearResetPasswordSuccessMessage,
  resetPasswordAsync,
  resetResetPasswordStatus,
  selectResetPasswordError,
  selectResetPasswordStatus,
  selectResetPasswordSuccessMessage,
} from "../AuthSlice";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const status = useSelector(selectResetPasswordStatus);
  const error = useSelector(selectResetPasswordError);
  const successMessage = useSelector(selectResetPasswordSuccessMessage);
  const { userId, passwordResetToken } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const is500 = useMediaQuery(theme.breakpoints.down(500));

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    return () => {
      dispatch(clearResetPasswordError());
    };
  }, [error]);

  useEffect(() => {
    if (status === "fullfilled") {
      toast.success(successMessage?.message);
      navigate("/login");
    }
    return () => {
      dispatch(clearResetPasswordSuccessMessage());
    };
  }, [status]);

  useEffect(() => {
    return () => {
      dispatch(resetResetPasswordStatus());
    };
  }, []);

  const handleResetPassword = async (data) => {
    const cred = { ...data, userId: userId, token: passwordResetToken };
    delete cred.confirmPassword;
    dispatch(resetPasswordAsync(cred));
    reset();
  };

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack>
        <Stack component={Paper} elevation={2}>
          <Stack
            component={"form"}
            width={is500 ? "95vw" : "30rem"}
            p={"1rem"}
            rowGap={"1rem"}
            noValidate
            onSubmit={handleSubmit(handleResetPassword)}
          >
            <Stack rowGap={".3rem"}>
              <Typography variant="h4" fontWeight={600}>
                Réinitialiser le mot de passe
              </Typography>
              <Typography color={"GrayText"}>
                Veuillez entrer et confirmer votre nouveau mot de passe
              </Typography>
            </Stack>

            <Stack rowGap={".5rem"}>
              <MotionConfig whileHover={{ y: -2 }}>
                <motion.div>
                  <TextField
                    type="password"
                    fullWidth
                    sx={{ mt: 1 }}
                    {...register("password", {
                      required: "Veuillez entrer un mot de passe",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `Au moins 8 caractères, doit contenir au moins 1 lettre majuscule, 1 lettre minuscule et 1 chiffre. Peut contenir des caractères spéciaux.`,
                      },
                    })}
                    placeholder="Nouveau mot de passe"
                  />
                  {errors.password && (
                    <FormHelperText sx={{ mt: 1 }} error>
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </motion.div>

                <motion.div>
                  <TextField
                    type="password"
                    fullWidth
                    sx={{ mt: 1 }}
                    {...register("confirmPassword", {
                      required: "Veuillez confirmer le mot de passe",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "Les mots de passe ne correspondent pas",
                    })}
                    placeholder="Confirmer le nouveau mot de passe"
                  />
                  {errors.confirmPassword && (
                    <FormHelperText sx={{ mt: 1 }} error>
                      {errors.confirmPassword.message}
                    </FormHelperText>
                  )}
                </motion.div>
              </MotionConfig>
            </Stack>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
              <LoadingButton
                sx={{ height: "2.5rem" }}
                fullWidth
                loading={status === "pending"}
                type="submit"
                variant="contained"
              >
                Réinitialiser le mot de passe
              </LoadingButton>
            </motion.div>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
