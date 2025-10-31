import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import { selectBrands } from "../../brands/BrandSlice";
import { selectCategories } from "../../categories/CategoriesSlice";
import { ProductCard } from "../../products/components/ProductCard";
import {
  deleteProductByIdAsync,
  fetchProductsAsync,
  selectProductIsFilterOpen,
  selectProductTotalResults,
  selectProducts,
  toggleFilters,
  undeleteProductByIdAsync,
} from "../../products/ProductSlice";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ClearIcon from "@mui/icons-material/Clear";
import { ITEMS_PER_PAGE } from "../../../constants";
import { axiosi } from "../../../config/axios";

const sortOptions = [
  { name: "Prix : du plus bas au plus élevé", sort: "price", order: "asc" },
  { name: "Prix : du plus élevé au plus bas", sort: "price", order: "desc" },
];

export const AdminDashBoard = () => {
  const navigate = useNavigate(); // Hook to navigate

  const [filters, setFilters] = useState({});
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const [categoryData, setCategoryData] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const theme = useTheme();
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);
  const totalResults = useSelector(selectProductTotalResults);

  const is1200 = useMediaQuery(theme.breakpoints.down(1200));
  const is800 = useMediaQuery(theme.breakpoints.down(800));
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const is600 = useMediaQuery(theme.breakpoints.down(600));
  const is488 = useMediaQuery(theme.breakpoints.down(488));

  useEffect(() => {
    setPage(1);
  }, [totalResults]);

  useEffect(() => {
    const finalFilters = { ...filters };

    finalFilters["pagination"] = { page: page, limit: ITEMS_PER_PAGE };
    finalFilters["sort"] = sort;
    if (selectedSubcategory) {
      //console.log("executed")
      finalFilters["subcategory"] = [selectedSubcategory]; // Add subcategory as an array
    }
    dispatch(fetchProductsAsync(finalFilters));
  }, [filters, sort, page]);

  const filteredProducts = selectedSubcategory
    ? products.filter((product) => product.subcategory === selectedSubcategory)
    : products;

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

  const handleProductDelete = (productId) => {
    dispatch(deleteProductByIdAsync(productId));
  };

  const handleProductUnDelete = (productId) => {
    dispatch(undeleteProductByIdAsync(productId));
  };

  const handleFilterClose = () => {
    dispatch(toggleFilters());
  };
  const fields = [
    {
      title: "Informatique et Mobiles",
      items: [
        "Smartphones",
        "Tablettes",
        "Ordinateurs portables",
        "Ordinateurs de bureau",
        "Écrans et moniteurs",
        "Imprimantes et scanners",
        "Accessoires",
        "Composants",
      ],
    },
    {
      title: "Image et Son",
      items: [
        "Téléviseurs",
        "Home cinéma",
        "Enceintes Bluetooth et Wi-Fi",
        "Casques et écouteurs",
        "Barres de son",
        "Platines vinyles",
        "Vidéoprojecteurs",
        "Appareils photo et caméras",
      ],
    },
    {
      title: "Électroménager",
      items: [
        "Aspirateurs",
        "Réfrigérateurs",
        "Lave-linge et sèche-linge",
        "Lave-vaisselle",
        "Fours et micro-ondes",
        "Machines à café et bouilloires",
        "Fer à repasser et centrales vapeur",
      ],
    },
    {
      title: "Maison connectée et Sécurité",
      items: [
        "Assistants vocaux",
        "Caméras de surveillance",
        "Sonnette connectée",
        "Alarmes et détecteurs de mouvement",
        "Prises et ampoules connectées",
        "Thermostats intelligents",
      ],
    },
    {
      title: "Mobilité et Transport",
      items: [
        "Trottinettes électriques",
        "Vélos électriques",
        "Gyropodes et hoverboards",
        "Chargeurs et accessoires pour voitures électriques",
      ],
    },
    {
      title: "Jeux vidéo et Consoles",
      items: [
        "Consoles de jeux",
        "Manettes et accessoires",
        "Jeux vidéo",
        "Sièges gaming",
      ],
    },
    {
      title: "Bien-être et Santé",
      items: [
        "Montres et bracelets connectés",
        "Pèse-personnes connectés",
        "Purificateurs et humidificateurs d’air",
      ],
    },
  ];

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          backgroundColor: "white",
          height: "100vh",
          padding: "1rem",
          overflowY: "scroll",
          width: is500 ? "100vw" : "30rem",
          zIndex: 500,
        }}
        variants={{ show: { left: 0 }, hide: { left: -500 } }}
        initial={"hide"}
        transition={{ ease: "easeInOut", duration: 0.7, type: "spring" }}
        animate={isProductFilterOpen === true ? "show" : "hide"}
      >
        {/* Section des filtres */}
        <Stack
          mb={"5rem"}
          sx={{ scrollBehavior: "smooth", overflowY: "scroll" }}
          style={{ height: "90%" }}
        >
          <Typography variant="h4">Catégories</Typography>
          <IconButton
            onClick={handleFilterClose}
            style={{ position: "absolute", top: 15, right: 15 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ClearIcon fontSize="medium" />
            </motion.div>
          </IconButton>

          <Stack rowGap={2} mt={4}>
            {categories.map((category, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<AddIcon />}>
                  <Typography>{category.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {categoryData[category._id] ? (
                    categoryData[category._id].map((item, subIndex) => (
                      <Typography
                        key={subIndex}
                        sx={{ cursor: "pointer", pl: 2 }}
                        onClick={() => setSelectedSubcategory(item._id)}
                      >
                        {item.name}
                      </Typography>
                    ))
                  ) : (
                    <Typography
                      sx={{ pl: 2, fontStyle: "italic", color: "gray" }}
                    >
                      No subcategories found
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
            {/* Reset Filter Button */}
            {selectedSubcategory && (
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={() => setSelectedSubcategory(null)}
              >
                Reset Filter
              </Button>
            )}
          </Stack>

          <Stack mt={4} style={{ marginTop: "auto" }}>
            <Button onClick={() => navigate("/conditions")}>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                Conditions générales
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </motion.div>

      <Stack rowGap={5} mt={is600 ? 2 : 5} mb={"3rem"}>
        {/* Options de tri */}
        <Stack
          flexDirection={"row"}
          mr={"2rem"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          columnGap={5}
        >
          <Stack alignSelf={"flex-end"} width={"12rem"}>
            <FormControl fullWidth>
              <InputLabel id="sort-dropdown">Trier</InputLabel>
              <Select
                variant="standard"
                labelId="sort-dropdown"
                label="Trier"
                onChange={(e) => setSort(e.target.value)}
                value={sort}
              >
                <MenuItem bgcolor="text.secondary" value={null}>
                  Réinitialiser
                </MenuItem>
                {sortOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <Grid
          gap={is700 ? 1 : 2}
          container
          justifyContent="center"
          alignItems="flex-start"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) =>
              !product.isDeleted && (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <Stack sx={{ opacity: product.isDeleted ? 0.7 : 1 }}>
                    <ProductCard
                      id={product._id}
                      title={product.title}
                      thumbnail={product.thumbnail}
                      brand={product.brand.name}
                      price={product.price}
                      isAdminCard={true}
                    />

                    <Stack
                      paddingLeft={2}
                      paddingRight={2}
                      flexDirection="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      columnGap={is488 ? 1 : 2}
                      mt={1}
                    >
                      <Button
                        component={Link}
                        to={`/admin/product-update/${product._id}`}
                        variant="contained"
                      >
                        Modifier
                      </Button>
                      {product.isDeleted ? (
                        <Button
                          onClick={() => handleProductUnDelete(product._id)}
                          color="error"
                          variant="outlined"
                        >
                          Restaurer
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleProductDelete(product._id)}
                          color="error"
                          variant="outlined"
                        >
                          Supprimer
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </Grid>
              )
            )
          ) : (
            <Typography variant="h6" color="gray">
              Aucun produit trouvé pour cette sous-catégorie.
            </Typography>
          )}
        </Grid>


        <Stack
          alignSelf={is488 ? "center" : "flex-end"}
          mr={is488 ? 0 : 5}
          rowGap={2}
          p={is488 ? 1 : 0}
        >
          <Pagination
            size={is488 ? "medium" : "large"}
            page={page}
            onChange={(e, page) => setPage(page)}
            count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
            variant="outlined"
            shape="rounded"
          />
          <Typography textAlign={"center"}>
            Affichage de {(page - 1) * ITEMS_PER_PAGE + 1} à{" "}
            {page * ITEMS_PER_PAGE > totalResults
              ? totalResults
              : page * ITEMS_PER_PAGE}{" "}
            sur {totalResults} résultats
          </Typography>
        </Stack>
      </Stack>
    </>
  );

};
