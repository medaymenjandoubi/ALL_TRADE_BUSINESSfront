import {
  Stack,
  TextField,
  Typography,
  Button,
  Grid,
  FormControlLabel,
  Radio,
  Paper,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { Cart } from "../../cart/components/Cart";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddressAsync,
  selectAddressStatus,
  selectAddresses,
} from "../../address/AddressSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectOrderStatus,
} from "../../order/OrderSlice";
import { resetCartByUserIdAsync, selectCartItems } from "../../cart/CartSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SHIPPING, TAXES } from "../../../constants";
import { motion } from "framer-motion";

export const Checkout = () => {
  const addresses = useSelector(selectAddresses);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const addressStatus = useSelector(selectAddressStatus);
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const orderStatus = useSelector(selectOrderStatus);
  const currentOrder = useSelector(selectCurrentOrder);
  const orderTotal = cartItems.reduce(
    (acc, item) => item.product.price * item.quantity + acc,
    0
  );
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const [customerType, setCustomerType] = useState("particulier");

  const inputStyle = {
    "& .MuiInputBase-input": { color: "#101620" },
    "& .MuiInputBase-input::placeholder": { color: "#AA9139", opacity: 0.8 },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#AA9139" },
      "&:hover fieldset": { borderColor: "#c4a94f" },
      "&.Mui-focused fieldset": { borderColor: "#c4a94f" },
    },
  };

  useEffect(() => {
    if (addressStatus === "fulfilled") reset();
    else if (addressStatus === "rejected") alert("Erreur lors de l'ajout de l'adresse");
  }, [addressStatus]);

  useEffect(() => {
    if (currentOrder?._id) {
      dispatch(resetCartByUserIdAsync(loggedInUser?._id));
      navigate(`/order-success/${currentOrder?._id}`);
    }
  }, [currentOrder]);

  const handleAddAddress = (data) => {
    const address = { ...data, user: loggedInUser._id };
    dispatch(addAddressAsync(address));
  };

  const handleCreateOrder = () => {
    const order = {
      user: loggedInUser._id,
      item: cartItems,
      address: selectedAddress,
      paymentMode: selectedPaymentMethod,
      total: orderTotal + SHIPPING + TAXES,
    };
    dispatch(createOrderAsync(order));
  };

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 3, md: 8 },
        background: "linear-gradient(135deg, #F5F7FA 0%, #E9EEF6 100%)",
        minHeight: "100vh",
      }}
    >
      <Stack
        flexDirection={is900 ? "column" : "row"}
        rowGap={8}
        columnGap={4}
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* Left: Address Form */}
        <Stack spacing={6} flex={1}>
          <Stack flexDirection="row" alignItems="center" columnGap={1}>
            <motion.div whileHover={{ x: -5 }}>
              <IconButton component={Link} to="/cart">
                <ArrowBackIcon />
              </IconButton>
            </motion.div>
            <Typography variant="h4" color="#AA9139">
              Informations de livraison
            </Typography>
          </Stack>

          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit(handleAddAddress)}
          >
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Nom"
                {...register("name", { required: true })}
                sx={inputStyle}
              />
              <TextField
                fullWidth
                label="Prénom"
                {...register("lastName", { required: true })}
                sx={inputStyle}
              />
            </Stack>

            <Stack>
              <Typography>Type de client</Typography>
              <Controller
                name="customerType"
                control={control}
                render={({ field }) => (
                  <Stack direction="row" spacing={2}>
                    <FormControlLabel
                      control={
                        <Radio
                          {...field}
                          value="particulier"
                          checked={field.value === "particulier"}
                        />
                      }
                      label="Particulier"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          {...field}
                          value="entreprise"
                          checked={field.value === "entreprise"}
                        />
                      }
                      label="Entreprise"
                    />
                  </Stack>
                )}
              />
            </Stack>

            {watch("customerType") === "entreprise" && (
              <TextField
                label="Raison sociale"
                {...register("reason")}
                sx={inputStyle}
              />
            )}

            <TextField
              label="Type (Domicile, Bureau...)"
              {...register("type")}
              sx={inputStyle}
            />
            <TextField label="Rue" {...register("street")} sx={inputStyle} />
            <TextField label="Pays" {...register("country")} sx={inputStyle} />
            <TextField
              label="Numéro de téléphone"
              {...register("phoneNumber")}
              sx={inputStyle}
            />

            <Stack direction="row" spacing={2}>
              <TextField label="Ville" {...register("city")} sx={inputStyle} fullWidth />
              <TextField label="État/Région" {...register("state")} sx={inputStyle} fullWidth />
              <TextField
                label="Code postal"
                {...register("postalCode")}
                sx={inputStyle}
                fullWidth
              />
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <LoadingButton type="submit" variant="contained" sx={{ bgcolor: "#AA9139", "&:hover": { bgcolor: "#c4a94f" } }}>
                Ajouter
              </LoadingButton>
              <Button variant="outlined" color="error" onClick={() => reset()}>
                Réinitialiser
              </Button>
            </Stack>
          </Stack>

          {/* Existing Addresses */}
          <Stack spacing={2}>
            <Typography variant="h6" color="#AA9139">Adresse</Typography>
            <Grid container spacing={2}>
              {addresses.map((address) => (
                <motion.div whileHover={{ scale: 1.02 }} key={address._id}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      border: selectedAddress === address ? "2px solid #AA9139" : "1px solid #c4a94f",
                      borderRadius: 2,
                      cursor: "pointer",
                      backgroundColor: "#fffdf8",
                    }}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <Stack spacing={1}>
                      <Typography>{address.type}</Typography>
                      <Typography>{address.street}</Typography>
                      <Typography>
                        {address.state}, {address.city}, {address.country}, {address.postalCode}
                      </Typography>
                      <Typography>{address.phoneNumber}</Typography>
                    </Stack>
                  </Paper>
                </motion.div>
              ))}
            </Grid>
          </Stack>

          {/* Payment Methods */}
          <Stack spacing={2}>
            <Typography variant="h6" color="#AA9139">Modes de paiement</Typography>
            <FormControlLabel
              control={
                <Radio
                  checked={selectedPaymentMethod === "CARD"}
                  onChange={() => setSelectedPaymentMethod("CARD")}
                />
              }
              label="Carte"
            />
          </Stack>
        </Stack>

        {/* Right: Order Summary */}
        <Stack spacing={3} flex={1}>
          <Typography variant="h4" color="#AA9139">
            Résumé de la commande
          </Typography>
          <Cart checkout={true} />
          <LoadingButton
            fullWidth
            loading={orderStatus === "pending"}
            variant="contained"
            onClick={handleCreateOrder}
            size="large"
            sx={{ bgcolor: "#AA9139", "&:hover": { bgcolor: "#c4a94f" } }}
          >
            Payer et commander
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>
  );
};
