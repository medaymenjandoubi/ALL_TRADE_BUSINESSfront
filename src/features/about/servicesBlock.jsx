import React from "react";
import { Stack, Typography, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const ServicesBlock = () => {
  const navigate = useNavigate();

  const titleStyle = {
    color: "#AA9139",
    fontWeight: 700,
    letterSpacing: ".02rem",
    mb: 2,
  };

  const textStyle = {
    color: "#E9EEF6",
    fontWeight: 300,
    lineHeight: 1.8,
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #101620 0%, #1A2433 100%)",
        py: { xs: 6, md: 8 },
        px: { xs: 3, md: 8 },
      }}
    >
      {/* --- Formes géométriques animées --- */}
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
          background:
            "radial-gradient(circle at center, rgba(170,145,57,0.25), transparent 70%)",
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
          background:
            "radial-gradient(circle at center, rgba(170,145,57,0.2), transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* --- Contenu principal --- */}
      <Stack
        spacing={4}
        sx={{
          position: "relative",
          zIndex: 2,
          color: "#E9EEF6",
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ ...titleStyle, textShadow: "0 0 10px rgba(170,145,57,0.3)" }}
        >
          Nos Services
        </Typography>

        {/* --- Négoce & vente de palettes --- */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              ...titleStyle,
              fontSize: "1.2rem",
              textShadow: "0 0 6px rgba(170,145,57,0.4)",
            }}
          >
            Négoce et vente de palettes en bois
          </Typography>
          <Typography variant="body1" component="ul">
            <Typography component="li" sx={textStyle}>
              Vente de palettes neuves et reconditionnées pour tous types
              d’activités industrielles et logistiques.
            </Typography>
            <Typography component="li" sx={textStyle}>
              Fabrication sur mesure selon vos dimensions et besoins spécifiques.
            </Typography>
            <Typography component="li" sx={textStyle}>
              Collecte, tri et revalorisation de palettes usagées.
            </Typography>
            <Typography component="li" sx={textStyle}>
              Livraison rapide en Île-de-France et sur tout le territoire national.
            </Typography>
          </Typography>
        </Box>

        {/* --- Matériaux de construction --- */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              ...titleStyle,
              fontSize: "1.2rem",
              textShadow: "0 0 6px rgba(170,145,57,0.4)",
            }}
          >
            Fourniture de matériaux de construction
          </Typography>
          <Typography variant="body1" component="ul">
            <Typography component="li" sx={textStyle}>
              Large gamme de matériaux : bois, ciment, plâtre, isolants, outillage.
            </Typography>
            <Typography component="li" sx={textStyle}>
              Produits sélectionnés pour leur durabilité et leur performance.
            </Typography>
            <Typography component="li" sx={textStyle}>
              Approvisionnement pour artisans, entreprises du BTP et particuliers.
            </Typography>
            <Typography component="li" sx={textStyle}>
              Conseil technique pour le choix des produits adaptés à vos projets.
            </Typography>
          </Typography>
        </Box>

        {/* --- Centrale d’achat & import/export --- */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              ...titleStyle,
              fontSize: "1.2rem",
              textShadow: "0 0 6px rgba(170,145,57,0.4)",
            }}
          >
            Centrale d’achat et solutions d’approvisionnement
          </Typography>
          <Typography variant="body1" component="ul">
            <Typography component="li" sx={textStyle}>
              Recherche, importation et distribution de produits selon vos besoins.
            </Typography>
            <Typography component="li" sx={textStyle}>
              Partenariats avec des fournisseurs européens et internationaux.
            </Typography>
            <Typography component="li" sx={textStyle}>
              Gestion de commandes en gros et demi-gros avec suivi logistique complet.
            </Typography>
            <Typography component="li" sx={textStyle}>
              Optimisation des coûts grâce à la puissance de notre centrale d’achat.
            </Typography>
          </Typography>
        </Box>

        {/* --- Bouton devis --- */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#AA9139",
            color: "#101620",
            fontWeight: 600,
            display: "block",
            mx: "auto",
            mt: 3,
            px: 4,
            py: 1.2,
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(170,145,57,0.4)",
            "&:hover": {
              backgroundColor: "#c4a94f",
              boxShadow: "0 0 25px rgba(170,145,57,0.6)",
            },
          }}
          onClick={() => navigate("/demanderDevis")}
        >
          Demander un devis
        </Button>
      </Stack>
    </Box>
  );
};
