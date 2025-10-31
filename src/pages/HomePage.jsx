import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProducts,
  selectProductFetchStatus,
  fetchProductsAsync,
} from "../features/products/ProductSlice";
import { Navbar } from "../features/navigation/components/Navbar";
import { Footer } from "../features/footer/Footer";
import {
  Stack,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Box,
  Card,
} from "@mui/material";
import banner from "../assets/images/banner.jpg";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { FeaturedMateriauxCarousel, FeaturedProductsCarousel } from "../features/products/components/FeaturedProducts";
import { motion } from "framer-motion";
import { ProductList } from "../features/products/components/ProductList";
import { selectCategories } from "../features/categories/CategoriesSlice";
import { WoodProducts } from "../features/products/components/WoodProducts.jsx";

export const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const products = useSelector(selectProducts);
  const fetchStatus = useSelector(selectProductFetchStatus);
  const categories = useSelector(selectCategories);

  // ✅ Fetch products only once when needed
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProductsAsync(filters));
      
    }
  }, [filters]);

  // 🟡 Safely handle when products is undefined
  const featuredProducts = Array.isArray(products)
    ? products.filter((p) => !p.isDeleted)
    : [];

  return (
    <>
      <Navbar isProductList={false} />
      {/* HERO SECTION */}
      <Box
        sx={{
          height: { xs: 350, md: 550 },
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.6)), url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          px: 3,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Stack spacing={3} sx={{ maxWidth: 700, mx: "auto" }}>
            <Typography
              variant={isMobile ? "h4" : "h2"}
              sx={{ fontWeight: 800, textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
            >
              ALL TRADE BUSINESS
            </Typography>
            <Typography
              variant={isMobile ? "body1" : "h5"}
              sx={{ textShadow: "1px 1px 6px rgba(0,0,0,0.4)" }}
            >
              Fournisseur de palettes et matériaux de construction de qualité
            </Typography>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#AA9139",
                  color: "#fff",
                  fontWeight: 600,
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#AA7E39",
                    transform: "scale(1.05)",
                  },
                  transition: "0.3s",
                }}
                onClick={() => navigate("/boutique")}
              >
                Voir nos produits
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  fontWeight: 600,
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#E9EEF6",
                    color: "#2B4A6F",
                    borderColor: "#E9EEF6",
                    transform: "scale(1.05)",
                  },
                  transition: "0.3s",
                }}
                onClick={() => navigate("/contact")}
              >
                Demander un devis
              </Button>
            </Stack>
          </Stack>
        </motion.div>
      </Box>

      {/* ABOUT SECTION */}
      <Stack
        sx={{
          mt: 12,
          px: 3,
          width: { xs: "95%", md: "80%" },
          mx: "auto",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#2B4A6F" }}>
          🏢 À propos de ALL TRADE BUSINESS
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#AA9139" }}>
          Qui sommes-nous ?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          ALL TRADE BUSINESS (ATB) est une société basée à Yerres (Essonne,
          Île-de-France) et immatriculée au Registre du Commerce et des Sociétés
          d’Évry sous le numéro 934 737 974. Fondée en 2024, notre mission est de
          devenir un acteur de référence dans le négoce, le commerce de gros et
          l’import-export de produits divers.
          <br />
          <br />
          Nous opérons sur plusieurs marchés : matériaux de construction, palettes
          et bois, ainsi que des solutions d’approvisionnement fiables.
          <br />
          <br />
          Notre engagement : offrir qualité, compétitivité et accompagnement
          personnalisé à nos clients.
          <br />
          <br />
          Dirigée par M. Saidi MAHIOUT, ALL TRADE BUSINESS incarne des valeurs de
          rigueur, transparence et excellence.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#AA9139",
            color: "#fff",
            fontWeight: 600,
            px: 4,
            "&:hover": {
              backgroundColor: "#AA7E39",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => navigate("/about")}
        >
          En savoir plus
        </Button>
      </Stack>

      {/* FEATURED PRODUCTS */}
      <Box sx={{ mt: 10 }}>
        <FeaturedMateriauxCarousel featuredProducts={featuredProducts} categories={categories}/>
      </Box>
      <Box >
        <WoodProducts featuredProducts={featuredProducts} categories={categories}/>
      </Box>

      {/* WHY CHOOSE US SECTION */}
      <Stack sx={{ mt: 12, px: 3, alignItems: "center", gap: 5 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#2B4A6F", textAlign: "center" }}
        >
          Pourquoi choisir All Trade Business ?
        </Typography>

        <Stack spacing={5} sx={{ width: "100%", alignItems: "center" }}>
          {[
            {
              title: "Qualité Premium",
              description:
                "Nos matériaux et palettes respectent des standards stricts de durabilité et de sécurité.",
              color: "#AA9139",
            },
            {
              title: "Livraison Rapide",
              description:
                "Une logistique performante garantit la livraison rapide de vos commandes sur site.",
              color: "#2B4A6F",
            },
            {
              title: "Service Client Dédié",
              description:
                "Une équipe à votre écoute, du conseil initial à la livraison finale.",
              color: "#AA9139",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  width: { xs: "100%", md: "75%" },
                  borderRadius: 4,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: item.color,
                    flexBasis: { xs: "100%", md: "35%" },
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 4,
                  }}
                >
                  <CheckCircleOutlineIcon sx={{ fontSize: 36, mb: 1 }} />
                  <Typography variant="h6" fontWeight={700}>
                    {item.title}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flexBasis: { xs: "100%", md: "65%" },
                    p: 3,
                    textAlign: "center",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </Card>
            </motion.div>
          ))}
        </Stack>
      </Stack>

      {/* FINAL CTA */}
      <Stack alignItems="center" sx={{ mt: 10, mb: 8 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: "#2B4A6F",
            color: "#AA9139",
            fontWeight: 700,
            px: 6,
            py: 1.5,
            borderRadius: 3,
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.3)",
            },
            transition: "0.4s",
          }}
          onClick={() => navigate("/contact")}
        >
          Contactez-nous pour un devis
        </Button>
      </Stack>

      <Footer />
    </>
  );
};
