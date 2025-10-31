import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAsync,
  selectProducts,
  selectProductTotalResults, // <-- récupère le total
} from "../products/ProductSlice";
import { ProductGrid } from "../products/components/ProductGrid";
import {
  Stack,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Pagination,
} from "@mui/material";
import { ITEMS_PER_PAGE } from "../../constants";
import { axiosi } from "../../config/axios";
import { Navbar } from "../navigation/components/Navbar";

export const CollectionPage = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const totalResults = useSelector(selectProductTotalResults); // total produits

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const filters = {};

    if (type === "exclusive") {
      filters.isExclusive = true;
      setCategory(null);
    } else if (type === "new") {
      filters.new = true;
      setCategory(null);
    } else {
      setCategoryLoading(true);
      axiosi
        .get(`/categories/${type}`)
        .then((res) => setCategory(res.data))
        .catch(() => setCategory(null))
        .finally(() => setCategoryLoading(false));

      filters.category = [type];
    }

    const params = {
      pagination: { page, limit: ITEMS_PER_PAGE },
      filters,
    };

    // fetch produits avec total
    dispatch(fetchProductsAsync(params)).finally(() => setLoading(false));
  }, [dispatch, type, page]);

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE) || 1;

  return (
    <Stack spacing={4}>
      <Navbar />

      {/* HERO BANNER POUR EXCLUSIVE */}
      {type === "exclusive" && (
        <Box
          sx={{
            position: "relative",
            height: { xs: 250, md: 400 },
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          <Box
            component="img"
            alt="Exclusive Collection"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              p: { xs: 2, md: 5 },
              color: "#fff",
            }}
          >
            <Typography variant="h3" fontWeight={700}>
              Produits Exclusifs
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, fontSize: 18, maxWidth: 600 }}>
              Amical Distribution met à la disposition de ses clients une large gamme de produits en exclusivité,
              qui sont en effet très demandés par les particuliers, recherchés et en actualité.
            </Typography>
          </Box>
        </Box>
      )}

      {/* HERO BANNER CATÉGORIE */}
      {type !== "exclusive" && type !== "new" && category && category.thumbnail?.Location && (
        <Box
          sx={{
            position: "relative",
            height: { xs: 250, md: 400 },
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          <Box
            component="img"
            src={category.thumbnail.Location}
            alt={category.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              p: { xs: 2, md: 5 },
              color: "#fff",
            }}
          >
            {category.discountPercentage > 0 && (
              <Chip
                label={`-${category.discountPercentage}%`}
                color="secondary"
                sx={{ mb: 2, fontWeight: "bold", fontSize: 16 }}
              />
            )}
            <Typography variant="h3" fontWeight={700}>
              {category.name}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
              {category.description || "Pas de description disponible."}
            </Typography>
          </Box>
        </Box>
      )}

      {/* TITRE COLLECTION NEW */}
      {type === "new" && (
        <Typography variant="h3" fontWeight={700} sx={{ textAlign: "center", mt: 3 }}>
          Nouveaux Produits
        </Typography>
      )}

      {/* PRODUITS */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress size={40} />
        </Box>
      ) : products.length > 0 ? (
        <>
          <ProductGrid products={products} />

          {/* PAGINATION */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                color="primary"
                onChange={(e, value) => setPage(value)}
              />
            </Box>
          )}
        </>
      ) : (
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ py: 6 }}>
          Aucun produit trouvé pour cette sélection.
        </Typography>
      )}
    </Stack>
  );
};