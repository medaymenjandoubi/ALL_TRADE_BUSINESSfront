import React from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../auth/AuthSlice";

export const Footer = () => {
  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);

  const textStyle = {
    color: "#2B4A6F",
    cursor: "pointer",
    fontWeight: 300,
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: -2,
      width: 0,
      height: 2,
      backgroundColor: "#AA9139",
      transition: "width 0.3s ease",
    },
    "&:hover::after": { width: "100%" },
    "&:hover": { color: "#AA9139" },
  };

  const titleStyle = {
    color: "#AA9139",
    fontWeight: 700,
    fontSize: "1.1rem",
    letterSpacing: ".02rem",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Stack
        sx={{
          backgroundColor: "#E9EEF6",
          color: "#2B4A6F",
          paddingTop: "3rem",
          paddingBottom: "2rem",
          paddingX: is700 ? "1.5rem" : "4rem",
          rowGap: "3rem",
        }}
      >
        {/* --- Top Section --- */}
        <Stack
          direction={is700 ? "column" : "row"}
          justifyContent="space-between"
          alignItems={is700 ? "flex-start" : "flex-start"}
          spacing={is700 ? 4 : 2}
          flexWrap="wrap"
        >
          {/* COMPANY INFO */}
          <Stack spacing={1.5} maxWidth={350}>
            <Typography sx={titleStyle}>ALL TRADE BUSINESS</Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Forme juridique : <strong>SAS</strong> au capital de 2 000 €
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Adresse : 6 Rue de la Grange, 91330 Yerres
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Téléphone : +33 6 12 34 56 78
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Email : contact@amicaldistribution.fr
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              RCS Évry 934 737 974
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Date d’immatriculation : 04/11/2019
            </Typography>
          </Stack>

          {/* QUICK LINKS */}
          <Stack spacing={1.2}>
            <Typography sx={titleStyle} mb={1}>Liens utiles</Typography>
            <Typography sx={textStyle} onClick={() => navigate("/about")}>À propos</Typography>
            <Typography sx={textStyle} onClick={() => navigate("/contact")}>Contact</Typography>
            <Typography sx={textStyle} onClick={() => navigate("/devis")}>Devis</Typography>

              <Typography sx={textStyle} onClick={() => navigate("/conditions-generales")}>
    Conditions Générales
  </Typography>
  <Typography sx={textStyle} onClick={() => navigate("/politique-confidentialite")}>
    Politique de confidentialité
  </Typography>
    <Typography sx={textStyle} onClick={() => navigate("/mentions")}>
    Mentions Légales
  </Typography>
          </Stack>

          {/* ACCOUNT / CLIENT */}
          <Stack spacing={1.2}>
            <Typography sx={titleStyle} mb={1}>Espace client</Typography>
            {loggedInUser ? (
              <>
                <Typography sx={textStyle} onClick={() => navigate("/profile")}>Mon profil</Typography>
                <Typography sx={textStyle} onClick={() => navigate("/orders")}>Mes commandes</Typography>
              </>
            ) : (
              <Typography sx={textStyle} onClick={() => navigate("/login")}>Connexion / Inscription</Typography>
            )}
            <Typography sx={textStyle} onClick={() => navigate("/cart")}>Panier</Typography>
            <Typography sx={textStyle} onClick={() => navigate("/wishlist")}>Liste de souhaits</Typography>
          </Stack>

          {/* NEWSLETTER */}
          <Stack spacing={1.2} maxWidth={350}>
            <Typography sx={titleStyle} mb={1}>Newsletter</Typography>
            <Typography variant="body2" sx={{ color: "#2B4A6F", lineHeight: 1.5 }}>
              Recevez nos offres exclusives et nos actualités commerciales.
            </Typography>
            <TextField
              placeholder="Votre email"
              variant="outlined"
              size="small"
              sx={{
                input: { color: "#2B4A6F" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#AA9139" },
                  "&:hover fieldset": { borderColor: "#AA7E39" },
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton sx={{ "&:hover": { color: "#AA7E39" } }}>
                    <SendIcon sx={{ color: "#AA9139" }} />
                  </IconButton>
                ),
              }}
            />
          </Stack>
        </Stack>

{/* --- PAYMENT SECTION AVEC ICONES GOLD --- */}
<Stack
  direction="row"
  justifyContent="center"
  spacing={3}
  flexWrap="wrap"
  sx={{ mt: 2 }}
>
  {[ FaPaypal, FaGooglePay, FaApplePay, FaCcVisa, FaCcMastercard, FaCcAmex ].map(
    (IconComp, index) => (
      <IconComp
        key={index}
        size={45}
        color="#AA9139" // icône dorée
        style={{ transition: "transform 0.2s", cursor: "pointer" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    )
  )}
</Stack>


        {/* --- BOTTOM LINE --- */}
        <Box
          sx={{
            textAlign: "center",
            color: "#6B7C8E",
            borderTop: "1px solid rgba(0,0,0,0.05)",
            pt: 2,
            fontSize: "0.9rem",
          }}
        >
          © ALL TRADE BUSINESS {new Date().getFullYear()} — Tous droits réservés.
        </Box>
      </Stack>
    </motion.div>
  );
};
