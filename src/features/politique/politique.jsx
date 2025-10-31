import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export const Politique = () => {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 6 },
        backgroundColor: "#FDFCF8",
        color: "#101620",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={700}
          sx={{ color: "#AA9139", mb: 4 }}
        >
          Politique de Confidentialité
        </Typography>

        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #AA9139",
            borderRadius: 2,
            p: 3,
            boxShadow: "0px 4px 8px rgba(0,0,0,0.05)",
            lineHeight: 1.7,
          }}
        >
          <Typography variant="h5" sx={{ color: "#AA9139", mb: 2 }}>
            1. Collecte des données
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            All Trade Business collecte uniquement les données nécessaires à la
            gestion commerciale, à la facturation, au suivi des commandes et à
            la communication. Ces données sont traitées conformément au RGPD
            (UE 2016/679) et à la loi Informatique et Libertés.
          </Typography>

          <Typography variant="h5" sx={{ color: "#AA9139", mb: 2 }}>
            2. Finalités du traitement
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Les données personnelles sont utilisées pour :
            <ul>
              <li>La gestion des commandes, devis et livraisons,</li>
              <li>La gestion administrative et comptable,</li>
              <li>La communication commerciale avec consentement préalable.</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ color: "#AA9139", mb: 2 }}>
            3. Durée de conservation
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Les données sont conservées uniquement pour la durée nécessaire aux
            finalités du traitement, puis archivées ou supprimées selon la
            réglementation en vigueur.
          </Typography>

          <Typography variant="h5" sx={{ color: "#AA9139", mb: 2 }}>
            4. Droits des personnes concernées
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Conformément au RGPD, chaque utilisateur dispose d’un droit d’accès,
            de rectification, de suppression, d’opposition et de limitation des
            données le concernant.  
            Ces droits peuvent être exercés à :  
            📧 contact@alltradebusiness.site
          </Typography>

          <Typography variant="h5" sx={{ color: "#AA9139", mb: 2 }}>
            5. Sécurité des données
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            All Trade Business applique les mesures techniques et
            organisationnelles appropriées pour garantir la confidentialité et
            la sécurité des données personnelles.
          </Typography>

          <Typography variant="h5" sx={{ color: "#AA9139", mb: 2 }}>
            6. Contact et réclamations
          </Typography>
          <Typography variant="body1">
            Pour toute question ou réclamation relative à la gestion des
            données, vous pouvez écrire à :  
            📧 contact@alltradebusiness.site  
            📮 6 Rue de la Grange, 91330 Yerres, France.
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};
