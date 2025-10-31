import {
  Box,
  FormHelperText,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import React, { useEffect } from "react";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerAnimation } from "../../../assets/index"; // ✅ Nouvelle animation d'inscription
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import {
  selectLoggedInUser,
  signupAsync,
  selectSignupStatus,
  selectSignupError,
  clearSignupError,
  resetSignupStatus,
} from "../AuthSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export const Signup = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectSignupStatus);
  const error = useSelector(selectSignupError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down("lg"));
  const is480 = useMediaQuery(theme.breakpoints.down("sm"));

  // Redirection après signup
  useEffect(() => {
    if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    } else if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);

  // Gestion des erreurs
  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  // Gestion du statut
  useEffect(() => {
    if (status === "fullfilled") {
      toast.success("Bienvenue ! Vérifiez votre e-mail !");
      reset();
    }
    return () => {
      dispatch(clearSignupError());
      dispatch(resetSignupStatus());
    };
  }, [status]);

  // Soumission du formulaire
  const handleSignup = (data) => {
    const cred = { ...data };
    delete cred.confirmPassword;
    dispatch(signupAsync(cred));
  };

  return (
    <Stack
      width="100vw"
      height="100vh"
      direction={is900 ? "column" : "row"}
      sx={{
        overflow: "hidden",
        backgroundColor: "#E9EEF6",
      }}
    >
      {/* Animation Section */}
      {!is900 && (
        <Stack
          flex={1}
          bgcolor="#2B4A6F"
          justifyContent="center"
          alignItems="center"
          p={4}
        >
          <Lottie animationData={registerAnimation} style={{ width: "80%", maxWidth: 500 }} />
        </Stack>
      )}

      {/* Form Section */}
      <Stack
        flex={1}
        justifyContent="center"
        alignItems="center"
        p={is480 ? 2 : 6}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            p: is480 ? 3 : 5,
            backgroundColor: "#fff",
          }}
        >
          <Stack alignItems="center" mb={3}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ color: "#2B4A6F" }}
            >
              Créer un compte
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Rejoignez-nous dès aujourd’hui
            </Typography>
          </Stack>

          <Stack
            spacing={2.5}
            component="form"
            noValidate
            onSubmit={handleSubmit(handleSignup)}
          >
            {/* Nom */}
            <motion.div whileHover={{ y: -3 }}>
              <TextField
                fullWidth
                {...register("name", {
                  required: "Le nom est requis",
                })}
                placeholder="Nom complet"
                label="Nom"
              />
              {errors.name && (
                <FormHelperText error>{errors.name.message}</FormHelperText>
              )}
            </motion.div>

            {/* Email */}
            <motion.div whileHover={{ y: -3 }}>
              <TextField
                fullWidth
                {...register("email", {
                  required: "L'email est requis",
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

            {/* Mot de passe */}
            <motion.div whileHover={{ y: -3 }}>
              <TextField
                fullWidth
                type="password"
                {...register("password", {
                  required: "Le mot de passe est requis",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/gm,
                    message:
                      "8 caractères minimum, avec majuscule, minuscule et chiffre",
                  },
                })}
                placeholder="Mot de passe"
                label="Mot de passe"
              />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
            </motion.div>

            {/* Confirmation mot de passe */}
            <motion.div whileHover={{ y: -3 }}>
              <TextField
                fullWidth
                type="password"
                {...register("confirmPassword", {
                  required: "La confirmation du mot de passe est requise",
                  validate: (value, formValues) =>
                    value === formValues.password ||
                    "Les mots de passe ne correspondent pas",
                })}
                placeholder="Confirmer le mot de passe"
                label="Confirmer le mot de passe"
              />
              {errors.confirmPassword && (
                <FormHelperText error>
                  {errors.confirmPassword.message}
                </FormHelperText>
              )}
            </motion.div>

            {/* Bouton d'inscription */}
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
                S’inscrire
              </LoadingButton>
            </motion.div>

            {/* Liens bas */}
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              mt={1}
            >
              <Typography
                component={Link}
                to="/forgot-password"
                color="#2B4A6F"
                variant="body2"
                sx={{ textDecoration: "none" }}
              >
                Mot de passe oublié ?
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Déjà un compte ?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#AA9139",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Connexion
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
};
