import React, { useState, forwardRef } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { axiosi } from "../../config/axios";
import { toast } from "react-toastify";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DevisForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  const [deliveryDate, setDeliveryDate] = useState(null);

  const onSubmit = async (data) => {
    try {
      data.deliveryDate = deliveryDate ? deliveryDate.toISOString() : null;
      const response = await axiosi.post("/devis/sendDevis", data);
      if (response.status === 201) {
        toast.success("Demande envoyée avec succès !");
        reset();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Échec de l'envoi de la demande");
    }
  };

  const labelStyle = { color: "#AA9139", fontWeight: 600, mb: 1 };
  const inputStyle = {
    "& .MuiInputBase-input": { color: "#101620" },
    "& .MuiInputBase-input::placeholder": { color: "#555", opacity: 0.8 },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#AA9139" },
      "&:hover fieldset": { borderColor: "#c4a94f" },
      "&.Mui-focused fieldset": { borderColor: "#c4a94f" },
    },
    "& .MuiSelect-select": { color: "#101620" },
    "& .MuiSelect-icon": { color: "#AA9139" },
    backgroundColor: "#FDFCF8", // fond clair des inputs
    borderRadius: "6px",
  };

  const CustomDateInput = forwardRef(({ value, onClick, label }, ref) => (
    <TextField
      label={label}
      value={value}
      onClick={onClick}
      inputRef={ref}
      fullWidth
      sx={inputStyle}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CalendarTodayIcon sx={{ color: "#AA9139", cursor: "pointer" }} />
          </InputAdornment>
        ),
      }}
    />
  ));

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
      {/* Formes dorées animées */}
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.4, 0.2], rotate: [0, 360] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "350px",
          height: "350px",
          borderRadius: "30% 70% 70% 30% / 40% 30% 60% 70%",
          background: "radial-gradient(circle at center, rgba(170,145,57,0.25), transparent 70%)",
          zIndex: 0,
        }}
      />
      <motion.div
        initial={{ opacity: 0.1 }}
        animate={{ opacity: [0.1, 0.3, 0.1], rotate: [360, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: "-120px",
          left: "-120px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(170,145,57,0.2), transparent 70%)",
          zIndex: 0,
        }}
      />

      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={4}
        sx={{ position: "relative", zIndex: 2 }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#AA9139", textShadow: "0 0 5px rgba(170,145,57,0.3)", fontWeight: 700 }}
        >
          Demande de devis
        </Typography>

        {/* Infos client */}
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ ...labelStyle, mt: 2 }}>Informations client</Typography>
          <Stack direction={is480 ? "column" : "row"} spacing={2}>
            <TextField placeholder="Votre prénom" {...register("firstName", { required: true })} sx={inputStyle} />
            <TextField placeholder="Votre nom" {...register("lastName", { required: true })} sx={inputStyle} />
          </Stack>
          <TextField placeholder="Entreprise" {...register("company")} sx={inputStyle} />
          <TextField placeholder="SIRET / Numéro" {...register("siret")} sx={inputStyle} />
          <TextField placeholder="Email" {...register("email", { required: true })} sx={inputStyle} />
          <TextField placeholder="Téléphone" {...register("phone")} sx={inputStyle} />
          <TextField placeholder="Adresse complète" {...register("address")} sx={inputStyle} />
          <Stack direction={is480 ? "column" : "row"} spacing={2}>
            <TextField placeholder="Code Postal" {...register("zip")} sx={inputStyle} />
            <TextField placeholder="Ville" {...register("city")} sx={inputStyle} />
          </Stack>
          <TextField placeholder="Pays" {...register("country")} sx={inputStyle} />
        </Stack>

        {/* Détails projet */}
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ ...labelStyle, mt: 2 }}>Détails du projet</Typography>
          <FormControl fullWidth sx={inputStyle}>
            <InputLabel sx={{ color: "#AA9139" }}>Service</InputLabel>
            <Select {...register("service")}>
              <MenuItem value="palettes">Négoce et vente de palettes</MenuItem>
              <MenuItem value="materiaux">Fourniture de matériaux de construction</MenuItem>
              <MenuItem value="centrale">Centrale d'achat et approvisionnement</MenuItem>
            </Select>
          </FormControl>
          <TextField placeholder="Description détaillée" multiline rows={3} {...register("projectDescription")} sx={inputStyle} />
          <TextField placeholder="Quantité souhaitée" type="number" {...register("quantity")} sx={inputStyle} />
          <TextField placeholder="Dimensions / spécifications" {...register("specifications")} sx={inputStyle} />
          <TextField placeholder="Fréquence de commande" {...register("frequency")} sx={inputStyle} />
        </Stack>

        {/* Logistique & Budget */}
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ ...labelStyle, mt: 2 }}>Logistique & Budget</Typography>
          <TextField placeholder="Lieu de livraison" {...register("deliveryLocation")} sx={inputStyle} />

          <Stack width={is480 ? "100%" : "200px"}>
            <DatePicker
              selected={deliveryDate}
              onChange={(date) => setDeliveryDate(date)}
              placeholderText="Sélectionnez une date"
              customInput={<CustomDateInput label="Date souhaitée" />}
              dateFormat="dd/MM/yyyy"
            />
          </Stack>

          <TextField placeholder="Budget approximatif" type="number" {...register("budget")} sx={inputStyle} />
          <TextField placeholder="Commentaire / conditions particulières" multiline rows={2} {...register("notes")} sx={inputStyle} />
        </Stack>

        {/* Actions */}
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
              boxShadow: "0 0 10px rgba(170,145,57,0.3)",
              "&:hover": { backgroundColor: "#c4a94f", boxShadow: "0 0 20px rgba(170,145,57,0.5)" },
            }}
          >
            Envoyer
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ color: "#101620", borderColor: "#AA9139", "&:hover": { borderColor: "#c4a94f", color: "#AA9139" } }}
            onClick={() => navigate("/")}
          >
            Annuler
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
