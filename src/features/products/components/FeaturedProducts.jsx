import React, { useRef, useState } from "react";
import {
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  IconButton,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

export const FeaturedMateriauxCarousel = ({ featuredProducts = [], categories = [] }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "right" ? width : -width,
        behavior: "smooth",
      });
    }
  };

  const materiauxCategory = categories.find(
    (cat) => cat.name === "Matériaux de construction"
  );
  const materiauxCategoryId = materiauxCategory?._id;

  const materiaux = featuredProducts.filter(
    (product) => product.category === materiauxCategoryId
  );

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="materiaux-content"
        id="materiaux-header"
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#2B4A6F" }}>
          {materiauxCategory?.name || "Matériaux populaires"}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {materiauxCategory?.description && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 4, px: { xs: 2, md: 12 } }}
          >
            {materiauxCategory.description}
          </Typography>
        )}

        <Box
  sx={{
    position: "relative",
    width: { xs: "95%", md: "80%" },
    mx: "auto",            // centers horizontally
    display: "flex",
    justifyContent: "center",
  }}
>
          {/* Flèches */}
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              top: "50%",
              left: -20,
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "rgba(255,255,255,0.7)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              boxShadow: 3,
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              top: "50%",
              right: -20,
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "rgba(255,255,255,0.7)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              boxShadow: 3,
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {/* Carousel */}
          <Stack
            direction="row"
            spacing={3}
            ref={scrollRef}
            sx={{
              overflowX: "hidden",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              py: 3,
              px: 1,
            }}
          >
            {materiaux.length > 0 ? (
              materiaux.map((product) => (
                <Card
                  key={product._id}
                  sx={{
                    minWidth: "28%",
                    maxWidth: 280,
                    flexShrink: 0,
                    cursor: "pointer",
                    borderRadius: 0,
                    overflow: "hidden",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    scrollSnapAlign: "center",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                    },
                  }}
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={product.thumbnail?.Location || "/assets/images/default-product.jpg"}
                    alt={product.title}
                    sx={{ transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }}
                  />
                  <CardContent sx={{ py: 2, backgroundColor: "rgba(255,255,255,0.95)" }}>
                    {product.category?.name && (
                      <Badge badgeContent={product.category.name} color="primary" sx={{ mb: 1 }} />
                    )}
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {product.isNew && <Badge badgeContent="Nouveau" color="warning" />}
                      <Typography variant="body1" fontWeight={600}>
                        {product.title}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {product.brand} - {product.price}€
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography
                variant="body1"
                color="gray"
                sx={{ width: "100%", textAlign: "center", py: 4 }}
              >
                Aucun produit disponible pour le moment.
              </Typography>
            )}
          </Stack>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
