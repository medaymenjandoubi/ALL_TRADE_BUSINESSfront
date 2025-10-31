import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  resetProductUpdateStatus,
  selectProductUpdateStatus,
  selectSelectedProduct,
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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { selectBrands } from "../../brands/BrandSlice";
import { selectCategories } from "../../categories/CategoriesSlice";
import { toast } from "react-toastify";
import { axiosi } from "../../../config/axios";
import Resizer from "react-image-file-resizer";
import { updateProductById } from "../../products/ProductApi";
import { defaultThumbnail } from "../../../assets";

export const ProductUpdate = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectSelectedProduct);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productUpdateStatus = useSelector(selectProductUpdateStatus);
  const navigate = useNavigate();
  const theme = useTheme();
  const is1100 = useMediaQuery(theme.breakpoints.down(1100));
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  const selectedCategory = watch("category", selectedProduct);
  const [subcategories, setSubcategories] = useState([]);
  //states to update thumbnail
  const [thumbnail, setThumbnail] = useState({});
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const fileInputRef = useRef(null);

  //states to update images
  const [productImages, setProductImages] = useState([]);
  const [previewProductImages, setPreviewProductImages] = useState([]);
  const fileInputRefs = useRef(null);

  // Update state of thumbnail when selectedProduct changes
  useEffect(() => {
    if (selectedProduct?.thumbnail) {
      setThumbnail(selectedProduct.thumbnail);
      setPreviewThumbnail(selectedProduct.thumbnail.Location);
    }
    if (selectedProduct?.images?.length) {
      setProductImages(selectedProduct.images);
      setPreviewProductImages(
        selectedProduct.images.map((img) => img.Location)
      );
    }
  }, [selectedProduct]);


  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
    }
  }, [id]);

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
    if (productUpdateStatus === "fullfilled") {
      toast.success("Produit mis à jour");
      navigate("/admin/dashboard");
    } else if (productUpdateStatus === "rejected") {
      toast.error("Erreur lors de la mise à jour du produit.");
    }
  }, [productUpdateStatus]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
      dispatch(resetProductUpdateStatus());
    };
  }, []);

  const handleProductUpdate = (data) => {
    const productUpdate = {
      ...data,
      _id: selectedProduct._id,
      thumbnail: thumbnail,
      images: productImages,
      //   images: [data?.image0, data?.image1, data?.image2, data?.image3],
    };
    dispatch(updateProductByIdAsync(productUpdate));
  };
  const handleThumbnailRemove = async () => {
    try {
      await axiosi.post("/products/remove-thumbnail", { thumbnail });
      setThumbnail({});
      setPreviewThumbnail("");
      const updatedSelctedProduct = { ...selectedProduct, thumbnail: {} };
      updateProductById(updatedSelctedProduct);
      toast.success("Miniature supprimée");
    } catch (err) {
      console.log(err);
      toast.error("Échec de la suppression de la miniature");
    }
  };

  const handleThumbnailUpload = (e) => {
    let file = e.target.files[0];
    if (!file) return;

    setPreviewThumbnail(URL.createObjectURL(file));
    // Resize and Upload
    Resizer.imageFileResizer(
      file,
      720,
      500,
      "JPEG",
      60,
      0,
      async (uri) => {
        try {
          let { data } = await axiosi.post("/products/upload-thumbnail", {
            thumbnail: uri,
          });
          setThumbnail(data);
          toast.success("Miniature téléchargée avec succès");
        } catch (err) {
          console.log(err);
          toast.error("Échec du téléchargement de la miniature");
        }
      },
      "base64"
    );
  };

  const handleThumbnailClick = (previewThumbnail) => {
    if (previewThumbnail != "") {
      handleThumbnailRemove(); // Remove old thumbnail
    }
    fileInputRef.current?.click(); // Open file input
  };

  const handleProductImageRemove = async (index) => {

    try {
      await axiosi.post("/products/remove-image", {
        image: productImages[index],
      });

      // Update state
      const updatedImages = [...productImages];
      updatedImages.splice(index, 1);
      setProductImages(updatedImages);

      const updatedPreviews = [...previewProductImages];
      updatedPreviews.splice(index, 1);
      setPreviewProductImages(updatedPreviews);

      // Update selected product and database
      const updatedSelectedProduct = {
        ...selectedProduct,
        images: updatedImages, // Remove only the selected image from DB
      };
      updateProductById(updatedSelectedProduct);

      toast.success("Image supprimée");
    } catch (err) {
      console.log(err);
      toast.error("Échec de la suppression de l'image");
    }
  };

  const handleProductImageUpload = (e) => {
    let files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach((file) => {
      let previewUrl = URL.createObjectURL(file);
      setPreviewProductImages((prev) => [...prev, previewUrl]);

      Resizer.imageFileResizer(
        file,
        720,
        500,
        "JPEG",
        60,
        0,
        async (uri) => {
          try {
            let { data } = await axiosi.post("/products/upload-image", {
              image: uri,
            });
            setProductImages((prev) => [...prev, data]);
            toast.success("Image téléchargée avec succès");
          } catch (err) {
            console.log(err);
            toast.error("Échec du téléchargement de l'image");
          }
        },
        "base64"
      );
    });
  };

  const handleProductImageClick = (index) => {
    handleProductImageRemove(index);
    fileInputRefs.current.click(); // Open file input after removing image
  };

  const handleAddMoreImages = () => {
    fileInputRefs.current.click(); // Open file input to add more images
  };

  return (
    <Stack
      p={"0 16px"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"row"}
    >
      {selectedProduct && (
        <Stack
          width={is1100 ? "100%" : "60rem"}
          rowGap={4}
          mt={is480 ? 4 : 6}
          mb={6}
          component={"form"}
          noValidate
          onSubmit={handleSubmit(handleProductUpdate)}
        >
          {/* Zone des champs */}
          <Stack rowGap={3}>
            <Stack>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Titre
              </Typography>
              <TextField
                {...register("title", {
                  required: "Le titre est requis",
                  value: selectedProduct.title,
                })}
              />
            </Stack>

            <Stack flexDirection={"row"}>
              <FormControl fullWidth>
                <TextField
                  {...register("brand", { value: selectedProduct.brand, })}
                  label="Marque"
                  variant="outlined"

                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="category-selection">Catégorie</InputLabel>
                <Select
                  defaultValue={selectedProduct.category._id}
                  {...register("category", {
                    required: "La catégorie est requise",
                  })}
                  labelId="category-selection"
                  label="Catégorie"
                >
                  {categories.map((category) => (
                    <MenuItem value={category._id}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth disabled={!selectedCategory}>
                <InputLabel id="subcategory-selection">
                  Sous-catégorie
                </InputLabel>
                {selectedProduct && subcategories?.length > 0 && (
                  <Select
                    defaultValue={
                      subcategories.find(
                        (subcategory) =>
                          subcategory._id == selectedProduct.subcategory
                      )?._id
                    }
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
                )}
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
                  value: selectedProduct.description,
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
                  {...register("price", {
                    required: "Le prix est requis",
                    value: selectedProduct.price,
                  })}
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
                    value: selectedProduct.discountPercentage,
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
                  value: selectedProduct.stockQuantity,
                })}
              />
            </Stack>

            <Stack>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Miniature
              </Typography>
              <img
                src={previewThumbnail || defaultThumbnail}
                width={200}
                style={{ cursor: "pointer" }}
                onClick={() => (handleThumbnailClick(previewThumbnail))}
                alt="Miniature"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleThumbnailUpload}
              />
            </Stack>

            <Stack>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Images du produit
              </Typography>

              <Stack rowGap={2}>
                {previewProductImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    width={200}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleProductImageClick(index)}
                    alt={`Image du produit ${index + 1}`}
                  />
                ))}
              </Stack>

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddMoreImages}
              >
                Ajouter plus d'images
              </Button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRefs}
                style={{ display: "none" }}
                multiple
                onChange={handleProductImageUpload}
              />
            </Stack>
          </Stack>

          {/* Zone des actions */}
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
              Mettre à jour
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
      )}
    </Stack>
  );
};
