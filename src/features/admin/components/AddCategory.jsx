import React, { useState } from "react";
import { Stack, TextField, Typography, Button, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import Resizer from "react-image-file-resizer";
import { axiosi } from "../../../config/axios";

export const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); // <-- nouveau champ
  const [thumbnail, setThumbnail] = useState({});
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // Upload et resize de l'image
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setPreviewThumbnail(URL.createObjectURL(file));

    Resizer.imageFileResizer(file, 720, 500, "JPEG", 60, 0, async (uri) => {
      try {
        const { data } = await axiosi.post("/categories/upload-thumbnail", {
          thumbnail: uri,
        });
        setThumbnail(data);
        toast.success("Miniature téléchargée avec succès");
      } catch (err) {
        console.error(err);
        toast.error("Échec du téléchargement de la miniature");
      }
    });
  };

  // Supprimer la miniature
  const handleThumbnailRemove = async () => {
    setThumbnail({});
    setPreviewThumbnail("");
    toast.info("Miniature supprimée");
  };

  // Création de la catégorie
  const handleAddCategory = async () => {
    if (!name.trim()) return toast.error("Le nom de la catégorie est requis");

    try {
      const { data } = await axiosi.post("/categories", {
        name,
        description, // <-- envoyé au back
        thumbnail,
        discountPercentage,
      });
      toast.success(`Catégorie "${data.name}" ajoutée avec succès`);
      setName("");
      setDescription(""); // <-- reset du champ
      setThumbnail({});
      setPreviewThumbnail("");
      setDiscountPercentage(0);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'ajout de la catégorie");
    }
  };

  return (
    <Stack spacing={4} p={4} maxWidth="600px" margin="0 auto">
      {/* Nom */}
      <Stack>
        <Typography variant="h6">Nom de la catégorie</Typography>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Entrez le nom"
        />
      </Stack>

      {/* Description */}
      <Stack>
        <Typography variant="h6">Description</Typography>
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Entrez la description"
          multiline
          rows={3}
        />
      </Stack>

      {/* Remise */}
      <Stack>
        <Typography variant="h6">Remise (%)</Typography>
        <TextField
          type="number"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(Number(e.target.value))}
          placeholder="Entrez le pourcentage de remise"
        />
      </Stack>

      {/* Miniature */}
      <Stack
        spacing={2}
        p={2}
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
        <Typography variant="h6">Miniature</Typography>
        {!previewThumbnail && (
          <label
            htmlFor="thumbnailUpload"
            className="cursor-pointer text-blue-600 underline hover:text-blue-800"
          >
            Cliquer pour télécharger la miniature
          </label>
        )}
        <input
          id="thumbnailUpload"
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
              alt="Miniature"
            />
            <IconButton
              onClick={handleThumbnailRemove}
              sx={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "rgba(255,0,0,0.6)",
                "&:hover": { backgroundColor: "rgba(255,0,0,0.8)" },
              }}
            >
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </div>
        )}
      </Stack>

      {/* Actions */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="contained" onClick={handleAddCategory}>
          Ajouter la catégorie
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setName("");
            setDescription(""); // <-- reset description
            setThumbnail({});
            setPreviewThumbnail("");
            setDiscountPercentage(0);
          }}
        >
          Annuler
        </Button>
      </Stack>
    </Stack>
  );
};