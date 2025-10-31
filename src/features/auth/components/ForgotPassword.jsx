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
  clearForgotPasswordError,
  clearForgotPasswordSuccessMessage,
  forgotPasswordAsync,
  resetForgotPasswordStatus,
  selectForgotPasswordError,
  selectForgotPasswordStatus,
  selectForgotPasswordSuccessMessage,
} from "../AuthSlice";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const status = useSelector(selectForgotPasswordStatus);
  const error = useSelector(selectForgotPasswordError);
  const successMessage = useSelector(selectForgotPasswordSuccessMessage);
  const theme = useTheme();
  const is500 = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (error) toast.error(error?.message);
    return () => dispatch(clearForgotPasswordError());
  }, [error]);

  useEffect(() => {
    if (status === "fullfilled") toast.success(successMessage?.message);
    return () => dispatch(clearForgotPasswordSuccessMessage());
  }, [status]);

  useEffect(() => {
    return () => dispatch(resetForgotPasswordStatus());
  }, []);

  const handleForgotPassword = (data) => {
    dispatch(forgotPasswordAsync(data));
    reset();
  };

  return (
    <Stack
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "#E9EEF6",
      }}
    >
      <Stack
        width="100%"
        maxWidth={420}
        component={Paper}
        elevation={4}
        p={is500 ? 3 : 5}
        borderRadius={4}
        alignItems="center"
      >
        {/* Header */}
        <Stack alignItems="center" mb={3}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: "#2B4A6F" }}
          >
            {status === "fullfilled"
              ? "Email envoyé !"
              : "Mot de passe oublié ?"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mt={1}
          >
            {status === "fullfilled"
              ? "Veuillez vérifier votre boîte de réception et cliquer sur le lien reçu pour réinitialiser votre mot de passe."
              : "Entrez votre adresse e-mail enregistrée ci-dessous pour recevoir un lien de réinitialisation du mot de passe."}
          </Typography>
        </Stack>

        {/* Formulaire */}
        {status !== "fullfilled" && (
          <Stack
            spacing={2.5}
            component="form"
            noValidate
            width="100%"
            onSubmit={handleSubmit(handleForgotPassword)}
          >
            {/* Email */}
            <motion.div whileHover={{ y: -3 }}>
              <TextField
                fullWidth
                {...register("email", {
                  required: "Veuillez entrer un email",
                  pattern: {
                    value:
                      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                    message: "Veuillez entrer un email valide",
                  },
                })}
                placeholder="Adresse e-mail"
                label="Email"
              />
              {errors.email && (
                <FormHelperText error>{errors.email.message}</FormHelperText>
              )}
            </motion.div>

            {/* Bouton d'envoi */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <LoadingButton
                fullWidth
                loading={status === "pending"}
                variant="contained"
                type="submit"
                sx={{
                  py: 1.2,
                  backgroundColor: "#AA9139",
                  "&:hover": { backgroundColor: "#917C30" },
                }}
              >
                Envoyer le lien
              </LoadingButton>
            </motion.div>
          </Stack>
        )}

        {/* Retour connexion */}
        <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
          <Typography
            mt={3}
            component={Link}
            to="/login"
            variant="body2"
            sx={{
              textDecoration: "none",
              color: "text.primary",
            }}
          >
            Retour à la{" "}
            <span style={{ color: "#AA9139", fontWeight: 600 }}>
              connexion
            </span>
          </Typography>
        </motion.div>
      </Stack>
    </Stack>
  );
};
