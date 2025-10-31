import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Navbar } from "../navigation/components/Navbar";
import { Footer } from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductsAsync,
  selectProducts,
  selectProductTotalResults,
} from "./ProductSlice";
import {
  fetchAllCategoriesAsync,
  selectCategories,
} from "../categories/CategoriesSlice";
import { FiltersBar } from "./components/FiltersBar";
import { ProductGrid } from "./components/ProductGrid";
import { PaginationControl } from "./components/PaginationControl";
import { ITEMS_PER_PAGE } from "../../constants";
import banner from "../../assets/images/Materiaux.jpg"
import palette from "../../assets/images/Palette.jpeg"
import banner1 from "../../assets/images/banner8.png"

export const ShopPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const totalResults = useSelector(selectProductTotalResults);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    const params = {
      pagination: { page, limit: ITEMS_PER_PAGE },
      sort,
      filters: { ...filters },
      search: searchQuery,
    };
    if (selectedCategory) params.filters.category = [selectedCategory];
    dispatch(fetchProductsAsync(params));
  }, [page, sort, filters, selectedCategory, searchQuery]);

  return (
    <Stack spacing={6} sx={{ bgcolor: "#F5F3ED" }}>
      {/* NAVBAR */}
      <Navbar />



      {/* --- MAIN CONTENT --- */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        px={{ xs: 2, md: 8 }}
      >
        <Stack flex={1} spacing={4}>
          {/* SEARCH BAR */}
<Stack flex={1} spacing={4}>
  {/* SEARCH BAR - DARK MODE */}
  <Stack
    direction="row"
    spacing={2}
    alignItems="center"
    sx={{
      bgcolor: "#1E1E1E", // dark background
      borderRadius: "1rem",
      px: 3,
      py: 1.5,
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    }}
  >
    <TextField
      fullWidth
      variant="standard"
      placeholder="Rechercher un produit ou une catégorie..."
      value={searchQuery}
      onChange={(e) => {
        setPage(1);
        setSearchQuery(e.target.value);
      }}
      InputProps={{
        disableUnderline: true,
        style: {
          fontSize: 16,
          color: "#F0F0F0", // light text
          paddingLeft: 8,
        },
      }}
      sx={{
        "& .MuiInputBase-root": {
          color: "#F0F0F0",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "#B0B0B0", // placeholder lighter
        },
      }}
    />
  </Stack>
</Stack>


          {/* FILTERS */}
          <FiltersBar
            sort={sort}
            setSort={setSort}
            filters={filters}
            setFilters={setFilters}
            onReset={() => {
              setSort(null);
              setFilters({});
              setSelectedCategory(null);
              setSearchQuery("");
            }}
          />

    {/* --- CATÉGORIES --- */}
<Typography
  variant="h5"
  fontWeight="600"
  color="#2F3E46"
  mt={2}
  textAlign="center"
>
  Parcourez nos catégories
</Typography>

<Stack
  direction="row"
  flexWrap="wrap"
  justifyContent="center"
  alignItems="center"
  mt={2}
  spacing={0}
  sx={{ width: "100%" }}
>
  {categories.slice(0, 2).map((category, index) => {
    const backgrounds = [
      {
        image: banner, // à remplacer
        overlay: "rgba(45, 106, 79, 0.55)", // vert doux
      },
      {
        image: palette, // à remplacer
        overlay: "rgba(27, 73, 101, 0.55)", // bleu profond
        hoverOverlay: "rgba(230, 57, 70, 0.65)", // rouge corail
      },
    ];
    const { image, overlay, hoverOverlay } = backgrounds[index];

    return (
      <motion.div
        key={category._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        style={{
          flex: "1 1 50%",
          position: "relative",
          height: "200px",
          overflow: "hidden",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/collection/${category._id}`)}
        >
          <motion.div
            initial={{ backgroundColor: overlay }}
            whileHover={{ backgroundColor: hoverOverlay }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.4rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              textShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            {category.name}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  })}
</Stack>





          {/* PRODUCT GRID */}
          <ProductGrid products={products} />

          {/* PAGINATION */}
          <PaginationControl
            totalResults={totalResults}
            page={page}
            setPage={setPage}
          />
        </Stack>
      </Stack>

      {/* --- ENGAGEMENT SECTION --- */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-around"
        alignItems="center"
        py={6}
        mx={4}
        spacing={4}
        className="bg-white rounded-2xl shadow-md"
      >
        {[
          { icon: "🚚", text: "Livraison rapide et fiable" },
{ icon: "♻️", text: "Produit durable et qualité assurée" },
          { icon: "🤝", text: "Partenaire de confiance des pros" },
        ].map((item) => (
          <Stack alignItems="center" spacing={1} key={item.text}>
            <Typography fontSize={36}>{item.icon}</Typography>
            <Typography fontWeight={600} color="#2F3E46">
              {item.text}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  );
};
