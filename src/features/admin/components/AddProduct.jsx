import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addProductAsync,
  resetProductAddStatus,
  selectProductAddStatus,
  updateProductByIdAsync,
} from "../../products/ProductSlice";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Badge,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { selectBrands } from "../../brands/BrandSlice";
import { selectCategories } from "../../categories/CategoriesSlice";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { axiosi } from "../../../config/axios";
import CloseIcon from "@mui/icons-material/Close";

export const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const [imageInputs, setImageInputs] = useState([0]);
  const [image, setImage] = useState([]);
  const [thumbnail, setThumbnail] = useState({});
  const [previewImages, setPreviewImages] = useState({});
  const [previewThumbnail, setPreviewThumbnail] = useState();
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productAddStatus = useSelector(selectProductAddStatus);
  const navigate = useNavigate();
  const theme = useTheme();
  const is1100 = useMediaQuery(theme.breakpoints.down(1100));
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  const selectedCategory = watch("category");
  const [subcategories, setSubcategories] = useState([]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      axiosi
        .get(`/categories/${selectedCategory}/subcategories`)
        .then((res) => setSubcategories(res.data))
        .catch((err) => console.error("Error fetching subcategories:", err));
    } else {
      setSubcategories([]); // Reset subcategories if no category selected
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (productAddStatus === "fullfilled") {
      reset();
      toast.success("Nouveau produit ajouté");
      navigate("/admin/dashboard");
    } else if (productAddStatus === "rejected") {
      toast.error("Erreur lors de l'ajout du produit.");
    }
  }, [productAddStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetProductAddStatus());
    };
  }, []);

  const handleImage = (e, index) => {
    let file = e.target.files[0];
    setPreviewImages((prev) => ({
      ...prev,
      [index]: window.URL.createObjectURL(file),
    }));
    //resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 60, 0, async (uri) => {
      try {
        let { data } = await axiosi.post("/products/upload-image", {
          image: uri,
        });
        setImage((prevImages) => [...prevImages, data]);
        toast("Image téléchargée avec succès");
      } catch (err) {
        console.log(err);
        toast("Échec du téléchargement de l'image");
      }
    });
  };
  const addImageInput = () => {
    setImageInputs((prev) => [...prev, prev.length]);
  };
  const handleImageRemove = async (imageToRemove, index) => {

    try {
      const res = await axiosi.post("/products/remove-image", {
        image: imageToRemove,
      });

      if (res.data.ok) {
        // Remove the image using the index
        setImage((prevImages) => prevImages.filter((_, i) => i !== index));

        // Remove the corresponding preview using the index
        setPreviewImages((prev) => {
          const updatedPreviews = Object.values(prev).filter((_, i) => i !== index);

          // Convert the array back to an object with sequential keys
          const newPreviews = Object.fromEntries(updatedPreviews.map((item, i) => [i, item]));

          return newPreviews;
        });

        toast("Image supprimée avec succès");
      }
    } catch (err) {
      console.log(err);
      toast("Échec de la suppression de l'image");
    }
  };


  const handleThumbnailRemove = async () => {
    try {
      const res = await axiosi.post("/products/remove-thumbnail", {
        thumbnail,
      });
      setThumbnail({});
      setPreviewThumbnail("");
      toast("Miniature supprimée");
    } catch (err) {
      console.log(err);
      toast("Échec de la suppression de la miniature");
    }
  };
  const handleThumbnail = (e) => {
    let file = e.target.files[0];
    setPreviewThumbnail(window.URL.createObjectURL(file));

    //resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 60, 0, async (uri) => {
      try {
        let { data } = await axiosi.post("/products/upload-thumbnail", {
          thumbnail: uri,
        });
        setThumbnail(data);
        toast("Miniature téléchargée avec succès");
      } catch (err) {
        console.log(err);
        toast("Échec du téléchargement de la miniature");
      }
    });
  };

  const handleAddProduct = (data) => {

    const newProduct = {
      ...data,
      images: image,
      thumbnail,
    };
    // delete newProduct.image0;
    // delete newProduct.image1;
    // delete newProduct.image2;
    // delete newProduct.image3;

    dispatch(addProductAsync(newProduct));
  };

  return (
    <Stack
      p={"0 16px"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"row"}
    >
      <Stack
        width={is1100 ? "100%" : "60rem"}
        rowGap={4}
        mt={is480 ? 4 : 6}
        mb={6}
        component={"form"}
        noValidate
        onSubmit={handleSubmit(handleAddProduct)}
      >
        {/* Zone de saisie */}
        <Stack rowGap={3}>
          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Titre
            </Typography>
            <TextField
              {...register("title", { required: "Le titre est requis" })}
            />
          </Stack>

          <Stack flexDirection={"row"}>
            <FormControl fullWidth>
              <TextField
                {...register("brand")}
                label="Marque"
                variant="outlined"
              />
            </FormControl>


            {/* <FormControl fullWidth>
              <InputLabel id="category-selection">Catégorie</InputLabel>
              <Select
                {...register("category")}
                labelId="category-selection"
                label="Catégorie"
              >
                {categories.map((category) => (
                  <MenuItem value={category._id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl> */}
            {/* Category Dropdown */}

            <FormControl fullWidth>
              <InputLabel id="category-selection">Catégorie</InputLabel>
              <Select
                {...register("category")}
                labelId="category-selection"
                label="Catégorie"
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth disabled={!selectedCategory}>
              <InputLabel id="subcategory-selection">Sous-catégorie</InputLabel>
              <Select
                {...register("subcategory")}
                labelId="subcategory-selection"
                label="Sous-catégorie"
              >
                {subcategories.map((subcategory) => (
                  <MenuItem key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Description
            </Typography>
            <TextField
              multiline
              rows={4}
              {...register("description", {
                required: "La description est requise",
              })}
            />
          </Stack>

          <Stack flexDirection={"row"}>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Prix
              </Typography>
              <TextField
                type="number"
                {...register("price", { required: "Le prix est requis" })}
              />
            </Stack>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Remise {is480 ? "%" : "en pourcentage"}
              </Typography>
              <TextField
                type="number"
                {...register("discountPercentage", {
                  required: "Le pourcentage de remise est requis",
                })}
              />
            </Stack>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Quantité en stock
            </Typography>
            <TextField
              type="number"
              {...register("stockQuantity", {
                required: "La quantité en stock est requise",
              })}
            />
          </Stack>

          <Stack
            spacing={2}
            p={3}
            alignItems="center"
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
              transition: "all 0.3s",
              "&:hover": { borderColor: "#007bff", backgroundColor: "#f0f8ff" },
            }}
          >
            <Typography variant="h6" fontWeight={500} gutterBottom>
              Miniature
            </Typography>

            {!previewThumbnail && (
              <label
                htmlFor="imageUpload"
                className="cursor-pointer text-blue-600 underline hover:text-blue-800"
              >
                Cliquer pour télécharger l'image principale
              </label>
            )}

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleThumbnail}
              style={{ display: "none" }}
            />
            {previewThumbnail && (
              <div style={{ position: "relative" }}>
                <img
                  width={200}
                  src={previewThumbnail}
                  className="rounded shadow-md"
                  alt="Image principale"
                />
                <IconButton
                  onClick={handleThumbnailRemove}
                  sx={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "rgba(255, 0, 0, 0.6)",
                    "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.8)" },
                  }}
                >
                  <CloseIcon sx={{ color: "white" }} />
                </IconButton>
              </div>
            )}
          </Stack>

          <Stack
            spacing={2}
            p={3}
            sx={{ border: "1px solid #ccc", borderRadius: 2 }}
          >
            <Typography variant="h6" fontWeight={500} gutterBottom>
              Images du produit
            </Typography>

            {imageInputs.map((index) => (
              <Stack key={index} spacing={1} alignItems="center">
                {/* Cacher le texte si une image est téléchargée */}
                {!previewImages[index] && (
                  <label
                    htmlFor={`imageUpload-${index}`}
                    className="cursor-pointer text-blue-600 underline"
                  >
                    Cliquer pour télécharger une image
                  </label>
                )}

                <input
                  id={`imageUpload-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImage(e, index)}
                  style={{ display: "none" }}
                />

                {/* Afficher l'aperçu de l'image et le bouton de suppression */}
                {previewImages && previewImages[index] && (
                  <div style={{ position: "relative" }}>
                    <img
                      width={200}
                      src={previewImages[index]}
                      className="rounded shadow-md"
                      alt={`Aperçu ${index}`}
                    />
                    <IconButton
                      onClick={() => handleImageRemove(image[index], index)} // Passer l'image
                      sx={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        backgroundColor: "rgba(255, 0, 0, 0.6)",
                        "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.8)" },
                      }}
                    >
                      <CloseIcon sx={{ color: "white" }} />
                    </IconButton>
                  </div>
                )}
              </Stack>
            ))}

            <Button variant="contained" color="primary" onClick={addImageInput}>
              Ajouter plus d'images
            </Button>
          </Stack>
        </Stack>

        {/* Zone d'action */}
        <Stack
          flexDirection={"row"}
          alignSelf={"flex-end"}
          columnGap={is480 ? 1 : 2}
        >
          <Button
            size={is480 ? "medium" : "large"}
            variant="contained"
            type="submit"
          >
            Ajouter le produit
          </Button>
          <Button
            size={is480 ? "medium" : "large"}
            variant="outlined"
            color="error"
            component={Link}
            to={"/admin/dashboard"}
          >
            Annuler
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
