import {
  Box,
  FormHelperText,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,Button
} from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import React, { useEffect } from "react";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginAnimation } from "../../../assets/index";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import {
  selectLoggedInUser,
  loginAsync,
  selectLoginStatus,
  selectLoginError,
  clearLoginError,
  resetLoginStatus,
} from "../AuthSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import logo from "../../../assets/images/logo.png";

export const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);
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

  // Redirection
  useEffect(() => {
    if (loggedInUser && loggedInUser?.isVerified) {
      navigate("/");
    } else if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    }
  }, [loggedInUser]);

  // Handle login error
  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  // Handle status cleanup
  useEffect(() => {
    if (status === "fullfilled" && loggedInUser?.isVerified) {
      toast.success("Connexion réussie");
      reset();
    }
    return () => {
      dispatch(clearLoginError());
      dispatch(resetLoginStatus());
    };
  }, [status]);

  const handleLogin = (data) => {
    const cred = { ...data };
    delete cred.confirmPassword;
    dispatch(loginAsync(cred));
  };

  return (
    <Stack
      width="100vw"
      height="100vh"
      direction={is900 ? "column" : "row"}
      sx={{
        overflow: "hidden",
        backgroundColor: "#E9EEF6", // light background
      }}
    >
      {/* Animation Section */}
      {!is900 && (
        <Stack
          flex={1}
          justifyContent="center"
          alignItems="center"
          sx={{
            background: "linear-gradient(180deg, #2B4A6F 0%, #1C334D 100%)",
            color: "#fff",
          }}
        >
          <Lottie
            animationData={LoginAnimation}
            style={{ width: "80%", maxWidth: 480 }}
          />
<Typography
  variant="h5"
  fontWeight={600}
  mt={2}
  sx={{
    color: "#E9EEF6",
    display: "flex",
    alignItems: "center",
    gap: 1,
  }}
>
  Bienvenue chez All Trade Business
  <Box
    component="img"
    src={logo}
    alt="All Trade Business Logo"
    sx={{
      width: 40,
      height: 40,
      objectFit: "contain",
      filter: "brightness(0) invert(1)", // rend le logo clair si fond sombre
    }}
  />
</Typography>

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
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            p: is480 ? 3 : 5,
            backgroundColor: "#fff",
            borderTop: "5px solid #AA9139",
          }}
        >
          <Stack alignItems="center" mb={3}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ color: "#2B4A6F" }}
            >
              Connexion
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Connectez-vous pour continuer votre expérience
            </Typography>
          </Stack>

          <Stack
            spacing={2.5}
            component="form"
            noValidate
            onSubmit={handleSubmit(handleLogin)}
          >
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

            <motion.div whileHover={{ y: -3 }}>
              <TextField
                fullWidth
                type="password"
                {...register("password", {
                  required: "Le mot de passe est requis",
                })}
                placeholder="Mot de passe"
                label="Mot de passe"
              />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <LoadingButton
                fullWidth
                loading={status === "pending"}
                variant="contained"
                type="submit"
                sx={{
                  py: 1.2,
                  backgroundColor: "#AA9139",
                  "&:hover": { backgroundColor: "#8D7930" },
                }}
              >
                Se connecter
              </LoadingButton>
            </motion.div>

            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              mt={1}
            >
              <Typography
                component={Link}
                to="/forgot-password"
                sx={{
                  color: "#2B4A6F",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
                variant="body2"
              >
                Mot de passe oublié ?
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Pas de compte ?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: "#AA9139",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  S’inscrire
                </Link>
              </Typography>
            </Stack>
            <Stack alignItems="center" mt={3}>
  <Button
    component={Link}
    to="/"
    variant="outlined"
    startIcon={<ArrowBackOutlinedIcon />}
    sx={{
      borderColor: "#AA9139",
      color: "#AA9139",
      fontWeight: 600,
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#AA9139",
        color: "#fff",
      },
    }}
  >
    Retour à l’accueil
  </Button>
</Stack>

          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
};
