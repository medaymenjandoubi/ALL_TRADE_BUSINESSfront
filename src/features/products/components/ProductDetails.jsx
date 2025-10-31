import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  resetProductFetchStatus,
  selectProductFetchStatus,
  selectSelectedProduct,
} from "../ProductSlice";
import {
  Box,
  Checkbox,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  Button,
  Paper,
} from "@mui/material";
import {
  addToCartAsync,
  resetCartItemAddStatus,
  selectCartItemAddStatus,
  selectCartItems,
} from "../../cart/CartSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import {
  fetchReviewsByProductIdAsync,
  resetReviewFetchStatus,
  selectReviewFetchStatus,
  selectReviews,
} from "../../review/ReviewSlice";
import { Reviews } from "../../review/components/Reviews";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  resetWishlistItemAddStatus,
  resetWishlistItemDeleteStatus,
  selectWishlistItemAddStatus,
  selectWishlistItemDeleteStatus,
  selectWishlistItems,
} from "../../wishlist/WishlistSlice";
import { defaultThumbnail, loadingAnimation } from "../../../assets";
import Lottie from "lottie-react";

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectSelectedProduct);
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const cartItemAddStatus = useSelector(selectCartItemAddStatus);
  const wishlistItems = useSelector(selectWishlistItems);
  const reviews = useSelector(selectReviews);

  const productFetchStatus = useSelector(selectProductFetchStatus);
  const reviewFetchStatus = useSelector(selectReviewFetchStatus);
  const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus);
  const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
      dispatch(fetchReviewsByProductIdAsync(id));
    }
  }, [id]);

  useEffect(() => {
    if (cartItemAddStatus === "fulfilled") toast.success("Produit ajouté au panier");
    if (cartItemAddStatus === "rejected") toast.error("Erreur lors de l'ajout au panier");
  }, [cartItemAddStatus]);

  useEffect(() => {
    if (wishlistItemAddStatus === "fulfilled") toast.success("Ajouté à la wishlist");
    if (wishlistItemAddStatus === "rejected") toast.error("Erreur wishlist");
    if (wishlistItemDeleteStatus === "fulfilled") toast.success("Retiré de la wishlist");
    if (wishlistItemDeleteStatus === "rejected") toast.error("Erreur wishlist");
  }, [wishlistItemAddStatus, wishlistItemDeleteStatus]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
      dispatch(resetProductFetchStatus());
      dispatch(resetReviewFetchStatus());
      dispatch(resetWishlistItemDeleteStatus());
      dispatch(resetWishlistItemAddStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, []);

  const isInWishlist = wishlistItems.some((item) => item.product._id === id);

  const handleAddToCart = () => {
    if (!loggedInUser) return navigate("/login");
    dispatch(addToCartAsync({ user: loggedInUser._id, product: id, quantity }));
    setQuantity(1);
  };

  const handleWishlistToggle = () => {
    if (!loggedInUser) return navigate("/login");
    if (isInWishlist) {
      const item = wishlistItems.find((w) => w.product._id === id);
      dispatch(deleteWishlistItemByIdAsync(item._id));
    } else {
      dispatch(createWishlistItemAsync({ user: loggedInUser._id, product: id }));
    }
  };

  const totalReviewRating = reviews.reduce((acc, r) => acc + r.rating, 0);
  const totalReviews = reviews.length;
  const averageRating = totalReviews ? Math.ceil(totalReviewRating / totalReviews) : 0;

  if (!product) return <Lottie animationData={loadingAnimation} style={{ width: 300 }} />;

  return (
    <Stack spacing={4} sx={{ p: { xs: 2, md: 5 } }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={5}>
        {/* Image */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <img
            src={product.images?.[0]?.Location || defaultThumbnail}
            alt={product.title}
            style={{ width: "100%", maxWidth: 500, borderRadius: 10 }}
          />
        </Box>

        {/* Info */}
        <Stack spacing={2} sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700}>{product.title}</Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={averageRating} readOnly />
            <Typography variant="body2">
              ({totalReviews} {totalReviews > 1 ? "avis" : "avis"})
            </Typography>
          </Stack>

          <Typography variant="h5" fontWeight={600}>€{product.price}</Typography>
          <Typography variant="body1">{product.description}</Typography>

          {/* Quantity */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Button variant="outlined" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
            <Typography>{quantity}</Typography>
            <Button variant="outlined" onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}>+</Button>
          </Stack>

          {/* Actions */}
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              sx={{ flex: 1, py: 1.5, fontWeight: 600 }}
            >
              Ajouter au panier
            </Button>

            <Button
              variant={isInWishlist ? "contained" : "outlined"}
              color="secondary"
              onClick={handleWishlistToggle}
              startIcon={isInWishlist ? <Favorite /> : <FavoriteBorder />}
              sx={{ flex: 1, py: 1.5, fontWeight: 600 }}
            >
              {isInWishlist ? "Favori" : "Ajouter à la wishlist"}
            </Button>
          </Stack>

          {/* Stock */}
          <Typography color={product.stockQuantity > 0 ? "green" : "red"}>
            {product.stockQuantity > 0 ? "En stock" : "Rupture de stock"}
          </Typography>
        </Stack>
      </Stack>

      {/* Reviews */}
      <Reviews productId={id} averageRating={averageRating} />
    </Stack>
  );
};
