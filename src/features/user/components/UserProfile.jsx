import {
  Avatar,
  Button,
  Paper,
  Stack,
  Typography,
  useTheme,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../UserSlice";
import {
  addAddressAsync,
  resetAddressAddStatus,
  resetAddressDeleteStatus,
  resetAddressUpdateStatus,
  selectAddressAddStatus,
  selectAddressDeleteStatus,
  selectAddressErrors,
  selectAddressStatus,
  selectAddressUpdateStatus,
  selectAddresses,
} from "../../address/AddressSlice";
import { Address } from "../../address/components/Address";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const status = useSelector(selectAddressStatus);
  const userInfo = useSelector(selectUserInfo);
  const addresses = useSelector(selectAddresses);
  const theme = useTheme();
  const [addAddress, setAddAddress] = useState(false);

  const addressAddStatus = useSelector(selectAddressAddStatus);
  const addressUpdateStatus = useSelector(selectAddressUpdateStatus);
  const addressDeleteStatus = useSelector(selectAddressDeleteStatus);

  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (addressAddStatus === "fulfilled") {
      toast.success("Adresse ajoutée");
    } else if (addressAddStatus === "rejected") {
      toast.error("Erreur lors de l'ajout de l'adresse");
    }
  }, [addressAddStatus]);

  useEffect(() => {
    if (addressUpdateStatus === "fulfilled") {
      toast.success("Adresse mise à jour");
    } else if (addressUpdateStatus === "rejected") {
      toast.error("Erreur lors de la mise à jour de l'adresse");
    }
  }, [addressUpdateStatus]);

  useEffect(() => {
    if (addressDeleteStatus === "fulfilled") {
      toast.success("Adresse supprimée");
    } else if (addressDeleteStatus === "rejected") {
      toast.error("Erreur lors de la suppression de l'adresse");
    }
  }, [addressDeleteStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetAddressAddStatus());
      dispatch(resetAddressUpdateStatus());
      dispatch(resetAddressDeleteStatus());
    };
  }, []);

  const handleAddAddress = (data) => {
    const address = { ...data, user: userInfo._id };
    dispatch(addAddressAsync(address));
    setAddAddress(false);
    reset();
  };

  return (
    <Stack
      height={"calc(100vh - 4rem)"}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      <Stack
        component={is480 ? "" : Paper}
        elevation={1}
        width={is900 ? "100%" : "50rem"}
        p={2}
        mt={is480 ? 0 : 5}
        rowGap={2}
      >
        {/* Détails de l'utilisateur - [nom, email] */}
        <Stack
          bgcolor={theme.palette.primary.light}
          color={theme.palette.primary.main}
          p={2}
          rowGap={1}
          borderRadius={".6rem"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar
            src="none"
            alt={userInfo?.name}
            sx={{ width: 70, height: 70 }}
          ></Avatar>
          <Typography>{userInfo?.name}</Typography>
          <Typography>{userInfo?.email}</Typography>
        </Stack>

        {/* Section adresse */}
        <Stack justifyContent={"center"} alignItems={"center"} rowGap={3}>
          {/* Titre et bouton ajouter */}
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            columnGap={1}
          >
            <Typography variant="h6" fontWeight={400}>
              Gérer les adresses
            </Typography>
            <Button
              onClick={() => setAddAddress(true)}
              size={is480 ? "small" : ""}
              variant="contained"
            >
              Ajouter
            </Button>
          </Stack>

          {/* Formulaire pour ajouter une adresse - dépendant de l'état */}
          {addAddress ? (
            <Stack
              width={"100%"}
              component={"form"}
              noValidate
              onSubmit={handleSubmit(handleAddAddress)}
              rowGap={2}
            >
              <Stack>
                <Typography gutterBottom>Type</Typography>
                <TextField
                  placeholder="Ex. Maison, Bureau"
                  {...register("type", { required: true })}
                />
              </Stack>

              <Stack>
                <Typography gutterBottom>Rue</Typography>
                <TextField {...register("street", { required: true })} />
              </Stack>

              <Stack>
                <Typography gutterBottom>Code Postal</Typography>
                <TextField
                  type="number"
                  {...register("postalCode", { required: true })}
                />
              </Stack>

              <Stack>
                <Typography gutterBottom>Pays</Typography>
                <TextField {...register("country", { required: true })} />
              </Stack>

              <Stack>
                <Typography gutterBottom>Numéro de téléphone</Typography>
                <TextField
                  type="number"
                  {...register("phoneNumber", { required: true })}
                />
              </Stack>

              <Stack>
                <Typography gutterBottom>État</Typography>
                <TextField {...register("state", { required: true })} />
              </Stack>

              <Stack>
                <Typography gutterBottom>Ville</Typography>
                <TextField {...register("city", { required: true })} />
              </Stack>

              <Stack
                flexDirection={"row"}
                alignSelf={"flex-end"}
                columnGap={is480 ? 1 : 2}
              >
                <LoadingButton
                  loading={status === "pending"}
                  type="submit"
                  size={is480 ? "small" : ""}
                  variant="contained"
                >
                  Ajouter
                </LoadingButton>
                <Button
                  color="error"
                  onClick={() => setAddAddress(false)}
                  variant={is480 ? "outlined" : "text"}
                  size={is480 ? "small" : ""}
                >
                  Annuler
                </Button>
              </Stack>
            </Stack>
          ) : (
            ""
          )}

          {/* Mapping des adresses ici */}
          <Stack width={"100%"} rowGap={2}>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <Address
                  key={address._id}
                  id={address._id}
                  city={address.city}
                  country={address.country}
                  phoneNumber={address.phoneNumber}
                  postalCode={address.postalCode}
                  state={address.state}
                  street={address.street}
                  type={address.type}
                />
              ))
            ) : (
              <Typography textAlign={"center"} mt={2} variant="body2">
                Vous n'avez aucune adresse ajoutée
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
