import React from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosi } from "../../config/axios";
import { toast } from "react-toastify";

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const phoneNumber = process.env.REACT_APP_CONTACT_NUMBER ;

  const inputStyle = {
    "& .MuiInputBase-input": { color: "#101620" },
    "& .MuiInputBase-input::placeholder": { color: "#555", opacity: 0.8 },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#AA9139" },
      "&:hover fieldset": { borderColor: "#c4a94f" },
      "&.Mui-focused fieldset": { borderColor: "#c4a94f" },
    },
    backgroundColor: "#FDFCF8",
    borderRadius: "6px",
  };

  const labelStyle = { color: "#AA9139", fontWeight: 600, mb: 1 };

  const onSubmit = async (data) => {
    try {
      const response = await axiosi.post("/messages/send", data);
      if (response.status === 201) {
        toast.success("Message envoyé avec succès !");
        reset();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Échec de l'envoi du message");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #E9EEF6 0%, #F5F7FA 100%)",
        py: { xs: 6, md: 8 },
        px: { xs: 3, md: 8 },
        borderRadius: 2,
      }}
    >
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={4}
        sx={{ position: "relative", zIndex: 2, maxWidth: "60rem", mx: "auto" }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#AA9139",
            textShadow: "0 0 5px rgba(170,145,57,0.3)",
            fontWeight: 700,
          }}
        >
          Contactez-nous
        </Typography>

        <Stack spacing={2}>
          <Stack direction={is480 ? "column" : "row"} spacing={2}>
            <TextField
              placeholder="Votre prénom"
              {...register("name", { required: true })}
              sx={inputStyle}
            />
            <TextField
              placeholder="Votre nom"
              {...register("lastName", { required: true })}
              sx={inputStyle}
            />
          </Stack>
          <TextField
            placeholder="Email"
            {...register("email", { required: true })}
            sx={inputStyle}
          />
          <TextField
            placeholder="Message"
            multiline
            rows={4}
            {...register("message", { required: true })}
            sx={inputStyle}
          />
        </Stack>

        <Stack direction={is480 ? "column" : "row"} spacing={2} justifyContent="flex-end">
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#AA9139",
              color: "#101620",
              fontWeight: 600,
              px: 4,
              py: 1.2,
              borderRadius: "10px",
              "&:hover": { backgroundColor: "#c4a94f" },
            }}
          >
            Envoyer
          </Button>
          <Button
            variant="outlined"
            color="error"
            component={Link}
            to="/"
            sx={{
              color: "#101620",
              borderColor: "#AA9139",
              "&:hover": { borderColor: "#c4a94f", color: "#AA9139" },
            }}
          >
            Annuler
          </Button>
        </Stack>

        <Typography mt={2} textAlign="center">
          Vous pouvez nous contacter via ce formulaire ou nous appeler directement au{" "}
          <strong>{phoneNumber}</strong>.
        </Typography>
      </Stack>
    </Box>
  );
};
