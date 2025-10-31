import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export const AboutBlock = () => {
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
        background: "linear-gradient(135deg, #1A2433 0%, #101620 100%)",
        py: { xs: 6, md: 8 },
        px: { xs: 3, md: 8 },
      }}
    >
      {/* --- Formes géométriques animées en fond --- */}
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.4, 0.2], rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "350px",
          height: "350px",
          borderRadius: "25% 75% 70% 30% / 30% 40% 60% 70%",
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
        spacing={3}
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
          À propos de nous
        </Typography>

        <Typography variant="body1" sx={textStyle}>
          Fondée en 2024, <strong>ALL TRADE BUSINESS (ATB)</strong> est une entreprise
          spécialisée dans le <strong>négoce de palettes en bois</strong> et de{" "}
          <strong>matériaux de construction</strong>. Nous mettons notre expertise au
          service des professionnels et particuliers à la recherche de produits fiables,
          durables et compétitifs.
        </Typography>

        <Typography variant="body1" sx={textStyle}>
          Située à Yerres, en Essonne, notre société offre des solutions logistiques
          modernes et un suivi personnalisé. Grâce à une équipe expérimentée et
          passionnée, nous assurons une qualité de service constante et une relation de
          confiance durable avec nos partenaires.
        </Typography>

        <Typography variant="body1" sx={textStyle}>
          Sous la direction de <strong>M. Saidi MAHIOUT</strong>, notre mission est
          d’apporter des produits de qualité supérieure tout en soutenant des pratiques
          commerciales responsables et durables.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            ...titleStyle,
            fontSize: "1.2rem",
            mt: 3,
            textShadow: "0 0 6px rgba(170,145,57,0.4)",
          }}
        >
          Pourquoi nous choisir ?
        </Typography>

        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li" sx={textStyle}>
            Expertise reconnue dans le domaine de la logistique et du négoce.
          </Typography>
          <Typography component="li" sx={textStyle}>
            Produits sélectionnés avec rigueur et contrôle qualité permanent.
          </Typography>
          <Typography component="li" sx={textStyle}>
            Service client réactif et solutions sur mesure.
          </Typography>
          <Typography component="li" sx={textStyle}>
            Engagement envers la durabilité et la performance.
          </Typography>
        </Box>

        <Typography variant="body1" sx={textStyle}>
          Contactez-nous dès aujourd’hui et découvrez nos offres exclusives.
        </Typography>
      </Stack>
    </Box>
  );
};
