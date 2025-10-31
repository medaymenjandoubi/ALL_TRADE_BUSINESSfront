import { LoadingButton } from "@mui/lab";
import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddressByIdAsync,
  selectAddressErrors,
  selectAddressStatus,
  updateAddressByIdAsync,
} from "../AddressSlice";

export const Address = ({
  id,
  type,
  street,
  postalCode,
  country,
  phoneNumber,
  state,
  city,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const status = useSelector(selectAddressStatus);
  const error = useSelector(selectAddressErrors);

  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const handleRemoveAddress = () => {
    dispatch(deleteAddressByIdAsync(id));
  };

  const handleUpdateAddress = (data) => {
    const update = { ...data, _id: id };
    setEdit(false);
    dispatch(updateAddressByIdAsync(update));
  };

  return (
    <Stack width={"100%"} p={is480 ? 0 : 1}>
      {/* Type d'adresse */}
      <Stack
        color={"whitesmoke"}
        p={".5rem"}
        borderRadius={".2rem"}
        bgcolor={theme.palette.primary.main}
      >
        <Typography>{type?.toUpperCase()}</Typography>
      </Stack>

      {/* Détails de l'adresse */}
      <Stack
        p={2}
        position={"relative"}
        flexDirection={"column"}
        rowGap={1}
        component={"form"}
        noValidate
        onSubmit={handleSubmit(handleUpdateAddress)}
      >
        {/* Si l'édition est activée, afficher le formulaire de mise à jour */}
        {edit ? (
          // Formulaire de mise à jour d'adresse
          <Stack rowGap={2}>
            <Stack>
              <Typography gutterBottom>Type</Typography>
              <TextField
                {...register("type", { required: true, value: type })}
              />
            </Stack>

            <Stack>
              <Typography gutterBottom>Rue</Typography>
              <TextField
                {...register("street", { required: true, value: street })}
              />
            </Stack>

            <Stack>
              <Typography gutterBottom>Code postal</Typography>
              <TextField
                type="number"
                {...register("postalCode", {
                  required: true,
                  value: postalCode,
                })}
              />
            </Stack>

            <Stack>
              <Typography gutterBottom>Pays</Typography>
              <TextField
                {...register("country", { required: true, value: country })}
              />
            </Stack>

            <Stack>
              <Typography gutterBottom>Numéro de téléphone</Typography>
              <TextField
                type="number"
                {...register("phoneNumber", {
                  required: true,
                  value: phoneNumber,
                })}
              />
            </Stack>

            <Stack>
              <Typography gutterBottom>État/Région</Typography>
              <TextField
                {...register("state", { required: true, value: state })}
              />
            </Stack>

            <Stack>
              <Typography gutterBottom>Ville</Typography>
              <TextField
                {...register("city", { required: true, value: city })}
              />
            </Stack>
          </Stack>
        ) : (
          <>
            <Typography>Rue - {street}</Typography>
            <Typography>Code postal - {postalCode}</Typography>
            <Typography>Pays - {country}</Typography>
            <Typography>Numéro de téléphone - {phoneNumber}</Typography>
            <Typography>État/Région - {state}</Typography>
            <Typography>Ville - {city}</Typography>
          </>
        )}

        {/* Boutons d'action */}
        <Stack
          position={is480 ? "static" : edit ? "static" : "absolute"}
          bottom={4}
          right={4}
          mt={is480 ? 2 : 4}
          flexDirection={"row"}
          alignSelf={"flex-end"}
          columnGap={1}
        >
          {/* Si l'édition est activée, afficher le bouton "Enregistrer les modifications" à la place de "Modifier" */}
          {edit ? (
            <LoadingButton
              loading={status === "pending"}
              size="small"
              type="submit"
              variant="contained"
            >
              Enregistrer les modifications
            </LoadingButton>
          ) : (
            <Button
              size="small"
              onClick={() => setEdit(true)}
              variant="contained"
            >
              Modifier
            </Button>
          )}

          {/* Si l'édition est activée, afficher le bouton "Annuler" à la place de "Supprimer" */}
          {edit ? (
            <Button
              size="small"
              onClick={() => {
                setEdit(false);
                reset();
              }}
              variant="outlined"
              color="error"
            >
              Annuler
            </Button>
          ) : (
            <LoadingButton
              loading={status === "pending"}
              size="small"
              onClick={handleRemoveAddress}
              variant="outlined"
              color="error"
            >
              Supprimer
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
