import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  Divider,
  TextField,
  Slider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAsync,
  resetProductFetchStatus,
  selectProductFetchStatus,
  selectProductIsFilterOpen,
  selectProductTotalResults,
  selectProducts,
  toggleFilters,
} from "../ProductSlice";
import { ProductCard } from "./ProductCard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { selectBrands } from "../../brands/BrandSlice";
import { fetchAllCategoriesAsync, selectCategories } from "../../categories/CategoriesSlice";
import Pagination from "@mui/material/Pagination";
import { ITEMS_PER_PAGE } from "../../../constants";
import {
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  resetWishlistItemAddStatus,
  resetWishlistItemDeleteStatus,
  selectWishlistItemAddStatus,
  selectWishlistItemDeleteStatus,
  selectWishlistItems,
} from "../../wishlist/WishlistSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { toast } from "react-toastify";
import { loadingAnimation } from "../../../assets";
import {
  resetCartItemAddStatus,
  selectCartItemAddStatus,
} from "../../cart/CartSlice";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { axiosi } from "../../../config/axios";

const sortOptions = [
  { name: "Prix : du plus bas au plus élevé", sort: "price", order: "asc" },
  { name: "Prix : du plus élevé au plus bas", sort: "price", order: "desc" },
  { name: "Nouveautés", sort: "createdAt", order: "desc" },
  { name: "Populaires", sort: "rating", order: "desc" },
];

export const ProductList = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();

  const is1200 = useMediaQuery(theme.breakpoints.down(1200));
  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const is600 = useMediaQuery(theme.breakpoints.down(600));
  const is500 = useMediaQuery(theme.breakpoints.down(500));

  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const [categoryData, setCategoryData] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const products = useSelector(selectProducts);
  const totalResults = useSelector(selectProductTotalResults);
  const loggedInUser = useSelector(selectLoggedInUser);

  const productFetchStatus = useSelector(selectProductFetchStatus);

  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus);
  const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus);

  const cartItemAddStatus = useSelector(selectCartItemAddStatus);

  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const dispatch = useDispatch();

  const filteredProducts = selectedSubcategory
    ? products.filter((product) => product.subcategory === selectedSubcategory)
    : products;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const fetchSubcategories = async () => {
        const newArrayCategories = {};

        try {
          const responses = await Promise.all(
            categories.map((category) =>
              axiosi
                .get(`/categories/${category._id}/subcategories`)
                .then((res) => ({ id: category._id, data: res.data }))
            )
          );

          responses.forEach(({ id, data }) => {
            newArrayCategories[id] = data;
          });

          setCategoryData(newArrayCategories);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };

      fetchSubcategories();
    }
  }, [categories]);

  useEffect(() => {
    setPage(1);
  }, [totalResults]);

  useEffect(() => {
    const finalFilters = { ...filters };

    finalFilters["pagination"] = { page: page, limit: ITEMS_PER_PAGE };
    finalFilters["sort"] = sort;

    if (selectedSubcategory) {
      finalFilters["subcategory"] = [selectedSubcategory];
    }
    if (!loggedInUser?.isAdmin) {
      finalFilters["user"] = true;
    }

    dispatch(fetchProductsAsync(finalFilters));
    dispatch(fetchAllCategoriesAsync());
  }, [filters, page, sort, selectedSubcategory]);

  const handleAddRemoveFromWishlist = (e, productId) => {
    if (e.target.checked) {
      const data = { user: loggedInUser?._id, product: productId };
      dispatch(createWishlistItemAsync(data));
    } else if (!e.target.checked) {
      const index = wishlistItems.findIndex(
        (item) => item.product._id === productId
      );
      dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
    }
  };

  useEffect(() => {
    if (wishlistItemAddStatus === "fulfilled") {
      toast.success("Produit ajouté à la liste de souhaits");
    } else if (wishlistItemAddStatus === "rejected") {
      toast.error("Erreur lors de l'ajout du produit à la liste de souhaits!");
    }
  }, [wishlistItemAddStatus]);

  useEffect(() => {
    if (wishlistItemDeleteStatus === "fulfilled") {
      toast.success("Produit retiré de la liste de souhaits");
    } else if (wishlistItemDeleteStatus === "rejected") {
      toast.error("Erreur lors du retrait du produit de la liste de souhaits");
    }
  }, [wishlistItemDeleteStatus]);

  useEffect(() => {
    if (cartItemAddStatus === "fulfilled") {
      toast.success("Produit ajouté au panier");
    } else if (cartItemAddStatus === "rejected") {
      toast.error("Erreur lors de l'ajout du produit au panier");
    }
  }, [cartItemAddStatus]);

  useEffect(() => {
    if (productFetchStatus === "rejected") {
      toast.error("Erreur lors de la récupération des produits");
    }
  }, [productFetchStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetProductFetchStatus());
      dispatch(resetWishlistItemAddStatus());
      dispatch(resetWishlistItemDeleteStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, []);

  const handleFilterClose = () => {
    dispatch(toggleFilters());
  };

  const handleClearFilters = () => {
    setSelectedSubcategory(null);
    setSelectedCategory(null);
    setPriceRange([0, 10000]);
    setSearchTerm("");
  };

  const FilterSidebar = () => (
    <Box sx={{ p: 3, height: "100%", overflowY: "auto" }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Filtres
        </Typography>
        <IconButton onClick={handleFilterClose} size="small">
          <CloseIcon />
        </IconButton>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Search */}
      <Stack mb={3}>
        <Typography variant="subtitle2" fontWeight="bold" mb={1.5}>
          Rechercher
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
        />
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Categories */}
      <Stack mb={3}>
        <Typography variant="subtitle2" fontWeight="bold" mb={2}>
          Catégories
        </Typography>
        {categories.map((category, index) => (
          <Accordion 
            key={index}
            sx={{
              boxShadow: "none",
              "&:before": { display: "none" },
              mb: 1
            }}
          >
            <AccordionSummary 
              expandIcon={<AddIcon />}
              sx={{
                minHeight: "40px",
                "&.Mui-expanded": { minHeight: "40px" },
                "& .MuiAccordionSummary-content": { 
                  margin: "8px 0",
                  "&.Mui-expanded": { margin: "8px 0" }
                }
              }}
            >
              <Typography variant="body2" fontWeight={500}>
                {category.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              {categoryData[category._id] ? (
                categoryData[category._id].map((item, subIndex) => (
                  <Box
                    key={subIndex}
                    sx={{
                      py: 1,
                      px: 2,
                      cursor: "pointer",
                      borderRadius: 1,
                      backgroundColor: selectedSubcategory === item._id ? "primary.light" : "transparent",
                      color: selectedSubcategory === item._id ? "primary.contrastText" : "text.primary",
                      "&:hover": {
                        backgroundColor: selectedSubcategory === item._id ? "primary.light" : "action.hover",
                      },
                      transition: "all 0.2s",
                    }}
                    onClick={() => {
                      setSelectedSubcategory(item._id);
                      setSelectedCategory(category._id);
                    }}
                  >
                    <Typography variant="body2">
                      {item.name}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" sx={{ pl: 2, fontStyle: "italic", color: "text.secondary" }}>
                  Aucune sous-catégorie
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Price Range */}
      <Stack mb={3}>
        <Typography variant="subtitle2" fontWeight="bold" mb={2}>
          Fourchette de prix
        </Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
          sx={{ mx: 1 }}
        />
        <Stack direction="row" justifyContent="space-between" mt={1}>
          <Typography variant="caption" color="text.secondary">
            {priceRange[0]} DT
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {priceRange[1]} DT
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Clear Filters Button */}
      {(selectedSubcategory || searchTerm) && (
        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={handleClearFilters}
          sx={{ mt: 2 }}
        >
          Réinitialiser les filtres
        </Button>
      )}

      {/* Footer Link */}
      <Stack mt="auto" pt={3}>
        <Button onClick={() => navigate("/conditions")} fullWidth>
          <Typography variant="body2" color="text.secondary">
            Conditions générales
          </Typography>
        </Button>
      </Stack>
    </Box>
  );

  return (
    <>
      {productFetchStatus === "pending" ? (
        <Stack
          width={is500 ? "35vh" : "25rem"}
          height={"calc(100vh - 4rem)"}
          justifyContent={"center"}
          marginRight={"auto"}
          marginLeft={"auto"}
        >
          <Lottie animationData={loadingAnimation} />
        </Stack>
      ) : (
        <>
          {/* Filter Drawer */}
          <Drawer
            anchor="left"
            open={isProductFilterOpen}
            onClose={handleFilterClose}
            sx={{
              "& .MuiDrawer-paper": {
                width: is500 ? "100vw" : "350px",
                boxSizing: "border-box",
              },
            }}
          >
            <FilterSidebar />
          </Drawer>

          {/* Main Content */}
          <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
            {/* Header Section */}
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                py: is600 ? 4 : 6,
                px: 3,
                mb: 4,
              }}
            >
              <Stack maxWidth="1400px" mx="auto">
                <Typography
                  variant={is600 ? "h4" : "h3"}
                  fontWeight="bold"
                  mb={1}
                  textAlign="center"
                >
                  Alltradebusiness
                </Typography>
                <Typography
                  variant={is600 ? "body1" : "h6"}
                  textAlign="center"
                  sx={{ opacity: 0.9 }}
                >
                  Spécialiste en palettes de bois et matériaux de construction
                </Typography>
              </Stack>
            </Box>

            {/* Toolbar */}
            <Stack
              maxWidth="1400px"
              mx="auto"
              px={is600 ? 2 : 4}
              mb={3}
            >
              <Stack
                direction={is700 ? "column" : "row"}
                justifyContent="space-between"
                alignItems={is700 ? "stretch" : "center"}
                gap={2}
              >
                {/* Filter Button & Active Filters */}
                <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap">
                  <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    onClick={() => dispatch(toggleFilters())}
                    sx={{ minWidth: "120px" }}
                  >
                    Filtres
                  </Button>
                  
                  {selectedSubcategory && (
                    <Chip
                      label={
                        categoryData[selectedCategory]?.find(
                          (item) => item._id === selectedSubcategory
                        )?.name || "Filtre actif"
                      }
                      onDelete={() => setSelectedSubcategory(null)}
                      color="primary"
                      variant="outlined"
                    />
                  )}
                </Stack>

                {/* Sort Dropdown */}
                <FormControl sx={{ minWidth: is700 ? "100%" : "250px" }}>
                  <InputLabel id="sort-label">Trier par</InputLabel>
                  <Select
                    labelId="sort-label"
                    label="Trier par"
                    value={sort || ""}
                    onChange={(e) => setSort(e.target.value || null)}
                    size="small"
                  >
                    <MenuItem value="">
                      <em>Par défaut</em>
                    </MenuItem>
                    {sortOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              {/* Results Count */}
              <Typography variant="body2" color="text.secondary" mt={2}>
                {totalResults} produit{totalResults > 1 ? "s" : ""} trouvé{totalResults > 1 ? "s" : ""}
              </Typography>
            </Stack>

            {/* Products Grid */}
            <Stack maxWidth="1400px" mx="auto" px={is600 ? 2 : 4} pb={6}>
              <Grid
                container
                spacing={is600 ? 2 : 3}
                justifyContent={is900 ? "center" : "flex-start"}
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(
                    (product) =>
                      !product.isDeleted && (
                        <Grid item key={product._id}>
                          <ProductCard
                            id={product._id}
                            title={product.title}
                            thumbnail={product.thumbnail}
                            brand={product.brand.name}
                            price={product.price}
                            handleAddRemoveFromWishlist={
                              handleAddRemoveFromWishlist
                            }
                          />
                        </Grid>
                      )
                  )
                ) : (
                  <Grid item xs={12}>
                    <Stack alignItems="center" justifyContent="center" py={8}>
                      <Typography variant="h6" color="text.secondary" textAlign="center">
                        Aucun produit trouvé
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        Essayez de modifier vos filtres
                      </Typography>
                    </Stack>
                  </Grid>
                )}
              </Grid>

              {/* Pagination */}
              {totalResults > ITEMS_PER_PAGE && (
                <Stack alignItems="center" mt={6} gap={2}>
                  <Pagination
                    size={is600 ? "medium" : "large"}
                    page={page}
                    onChange={(e, page) => setPage(page)}
                    count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
                    color="primary"
                    showFirstButton
                    showLastButton
                  />
                  <Typography variant="body2" color="text.secondary">
                    Affichage de {(page - 1) * ITEMS_PER_PAGE + 1} à{" "}
                    {Math.min(page * ITEMS_PER_PAGE, totalResults)} sur {totalResults} résultats
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Box>
        </>
      )}
    </>
  );
};