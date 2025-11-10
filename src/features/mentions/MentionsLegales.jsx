import React, { useState } from "react";
import { Typography, Stack, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../navigation/components/Navbar";

const mentionsLegalesData = [
  {
    id: "mentions",
    title: "Mentions légales – ALL TRADE BUSINESS",
    content: `Éditeur du site

ALL TRADE BUSINESS (ATB)

Forme juridique : Société par Actions Simplifiée (SAS)
Capital social : 2 000 €
Immatriculée au Registre du Commerce et des Sociétés d’Évry sous le numéro 934 737 974
Siège social : 6 Rue de la Grange, 91330 Yerres, France

Directeur de la publication
M. Saidi MAHIOUT
Né le 17/02/1965 à Aïn El Hammem (Algérie)
Président d’ALL TRADE BUSINESS

Hébergement du site
Le site est hébergé par :
Namecheap, Inc.
Adresse : 4600 East Washington Street, Suite 305, Phoenix, AZ 85034, USA
Site web : www.namecheap.com
Téléphone : +1 (661) 310-2107

Contact
📧 Email : ${process.env.REACT_APP_CONTACT_EMAIL}
📞 Téléphone : ${process.env.REACT_APP_CONTACT_NUMBER}`,
  },
];

export const MentionsLegales = () => {
  const [activeId, setActiveId] = useState(mentionsLegalesData[0].id);
  const activeSection = mentionsLegalesData.find((s) => s.id === activeId);

  return (
    <>
    <Navbar/>
    <Box
      sx={{
        display: "flex",
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 6 },
        backgroundColor: "#FDFCF8",
        color: "#101620",
      }}
    >
      {/* Sommaire (caché si une seule section) */}
      {mentionsLegalesData.length > 1 && (
        <Box
          sx={{
            width: { xs: "0", md: "250px" },
            mr: 4,
            display: { xs: "none", md: "block" },
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#2B4A6F", mb: 2, fontWeight: 700 }}
          >
            Sommaire
          </Typography>
          <Stack spacing={1}>
            {mentionsLegalesData.map((section) => (
              <Typography
                key={section.id}
                sx={{
                  cursor: "pointer",
                  fontWeight: activeId === section.id ? 700 : 500,
                  color: activeId === section.id ? "#AA9139" : "#101620",
                  "&:hover": { color: "#c4a94f" },
                }}
                onClick={() => setActiveId(section.id)}
              >
                {section.title}
              </Typography>
            ))}
          </Stack>
        </Box>
      )}

      {/* Contenu principal */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={700}
          sx={{ color: "#AA9139", mb: 4 }}
        >
          Mentions légales
        </Typography>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                mb: 6,
                p: 3,
                borderRadius: 2,
                border: "1px solid #AA9139",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#2B4A6F", fontWeight: 600, mb: 2 }}
              >
                {activeSection.title}
              </Typography>
              <Typography
                component="div"
                whiteSpace="pre-line"
                sx={{ lineHeight: 1.6, fontSize: 14 }}
              >
                {activeSection.content}
              </Typography>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
    </>
  );
};
