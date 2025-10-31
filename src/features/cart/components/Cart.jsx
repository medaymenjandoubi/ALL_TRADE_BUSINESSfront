import React, { useEffect } from "react";
import { CartItem } from "./CartItem";
import {
  Button,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import {
  resetCartItemRemoveStatus,
  selectCartItemRemoveStatus,
  selectCartItems,
} from "../CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SHIPPING, TAXES } from "../../../constants";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export const Cart = ({ checkout }) => {
  const items = useSelector(selectCartItems);
  const subtotal = items.reduce(
    (acc, item) => item.product.price * item.quantity + acc,
    0
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900));

  const cartItemRemoveStatus = useSelector(selectCartItemRemoveStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (items.length === 0) navigate("/");
  }, [items]);

  useEffect(() => {
    if (cartItemRemoveStatus === "fulfilled") toast.success("Produit retiré du panier");
    else if (cartItemRemoveStatus === "rejected") toast.error("Erreur lors du retrait !");
  }, [cartItemRemoveStatus]);

  useEffect(() => () => dispatch(resetCartItemRemoveStatus()), []);

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 3, md: 8 },
        background: "linear-gradient(135deg, #F5F7FA 0%, #E9EEF6 100%)",
        minHeight: "100vh",
      }}
    >
      <Stack justifyContent="flex-start" alignItems="center" rowGap={4}>
        <Typography
          variant="h4"
          sx={{ color: "#AA9139", fontWeight: 700, mb: 4, textAlign: "center" }}
        >
          Mon Panier
        </Typography>

        <Stack
          width={is900 ? "100%" : "60rem"}
          spacing={4}
          alignItems="stretch"
        >
          {/* Cart Items */}
          <Stack spacing={2}>
            {items.map((item) => (
              <CartItem
                key={item._id}
                id={item._id}
                title={item.product.title}
                brand={item.product.brand.name}
                category={item.product.category.name}
                price={item.product.price}
                quantity={item.quantity}
                thumbnail={item.product.thumbnail.Location}
                stockQuantity={item.product.stockQuantity}
                productId={item.product._id}
                sx={{
                  border: "1px solid #AA9139",
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(170,145,57,0.2)",
                  backgroundColor: "#fffdf8",
                  p: 2,
                }}
              />
            ))}
          </Stack>

          {/* Summary */}
          <Stack
            spacing={3}
            p={4}
            border="1px solid #AA9139"
            borderRadius={2}
            boxShadow="0 2px 12px rgba(170,145,57,0.2)"
            backgroundColor="#fffdf8"
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" fontWeight={600}>Sous-total</Typography>
              <Typography variant="h6" fontWeight={600}>€{subtotal}</Typography>
            </Stack>
            {checkout && (
              <>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Frais de livraison</Typography>
                  <Typography>€{SHIPPING}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Taxes</Typography>
                  <Typography>€{TAXES}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ borderTop: "1px solid #AA9139", pt: 1 }}>
                  <Typography fontWeight={700}>Total</Typography>
                  <Typography fontWeight={700}>€{subtotal + SHIPPING + TAXES}</Typography>
                </Stack>
              </>
            )}
          </Stack>

          {/* Actions */}
          {!checkout && (
            <Stack direction={is900 ? "column" : "row"} spacing={2} mt={3} justifyContent="flex-end">
              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                sx={{
                  backgroundColor: "#AA9139",
                  color: "#101620",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#c4a94f" },
                }}
              >
                Passer à la caisse
              </Button>

              <motion.div whileHover={{ y: 2 }}>
                <Chip
                  component={Link}
                  to="/"
                  label="ou continuer vos achats"
                  variant="outlined"
                  sx={{
                    borderColor: "#AA9139",
                    color: "#101620",
                    "&:hover": { borderColor: "#c4a94f", color: "#AA9139" },
                  }}
                />
              </motion.div>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
