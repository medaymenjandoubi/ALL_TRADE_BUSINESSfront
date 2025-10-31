import {
  Paper,
  Stack,
  Typography,
  Button,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWishlistItems,
} from "../../wishlist/WishlistSlice";
import {
  addToCartAsync,
  selectCartItems,
} from "../../cart/CartSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { defaultThumbnail } from "../../../assets";

const TVA = 5.5;

export const ProductCard = ({
  id,
  title,
  price,
  thumbnail,
  brand,
  stockQuantity,
  isLiquid = false,
  handleAddRemoveFromWishlist,
  isWishlistCard,
  isAdminCard,
  nbrParPaquet,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);

  const isProductAlreadyinWishlist = wishlistItems.some(
    (item) => item?.product?._id === id
  );
  const isProductAlreadyInCart = cartItems.some(
    (item) => item.product._id === id
  );

  const handleAddToCart = (quantity) => {
    const data = { user: loggedInUser?._id, product: id, quantity };
    dispatch(addToCartAsync(data));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 150 }}
      onClick={() => navigate(`/product-details/${id}`)}
    >
      <Paper
        elevation={4}
        sx={{
          overflow: "hidden",
          cursor: "pointer",
          bgcolor: "#fff",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Image Section */}
        <Stack
          sx={{
            position: "relative",
            width: "100%",
            height: 180,
            bgcolor: "#fafafa",
          }}
        >
          <img
            src={thumbnail?.Location || defaultThumbnail}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {!isAdminCard && (
            <Checkbox
              onClick={(e) => e.stopPropagation()}
              checked={isProductAlreadyinWishlist}
              onChange={(e) => handleAddRemoveFromWishlist(e, id)}
              icon={<FavoriteBorder sx={{ color: "#fff" }} />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(255,255,255,0.7)",
                borderRadius: "50%",
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              }}
            />
          )}
        </Stack>

        {/* Product Info */}
        <Stack p={2} spacing={1} flexGrow={1}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "0.95rem",
            }}
          >
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {brand}
          </Typography>

          <Stack spacing={0.3} mt={1}>

            <Typography fontSize="0.8rem">
              TTC: {price} 
            </Typography>
          </Stack>

          {/* Stock Info */}
          {stockQuantity <= 20 && (
            <FormHelperText sx={{ fontSize: "0.8rem", color: "red" }}>
              {stockQuantity === 1
                ? "Il ne reste qu’un seul en stock !"
                : "Stock limité"}
            </FormHelperText>
          )}

          {/* Add to cart buttons */}
          {!isWishlistCard && !isAdminCard && (
            <Stack mt={2} spacing={1}>
              <Button
                variant="contained"
                size="small"
                fullWidth
                sx={{
                  bgcolor: "#2B4A6F",
                  "&:hover": { bgcolor: "#1a5cacff" },
                  borderRadius: "10px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(nbrParPaquet);
                }}
              >
                Ajouter au panier
              </Button>
            </Stack>
          )}
        </Stack>
      </Paper>
    </motion.div>
  );
};