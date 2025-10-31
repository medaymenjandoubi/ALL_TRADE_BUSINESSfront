import React from "react";
import { Stack, FormControl, InputLabel, Select, MenuItem, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";

const sortOptions = [
  { label: "Prix croissant", sort: "price", order: "asc" },
  { label: "Prix décroissant", sort: "price", order: "desc" },
  { label: "Nouveautés", sort: "createdAt", order: "desc" },
  { label: "Promotions", sort: "discountPercentage", order: "desc" },
];

export const FiltersBar = ({ sort, setSort, filters, setFilters, onReset }) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      p={2}
      borderBottom="1px solid #eee"
      bgcolor="#fafafa"
    >
      <FormControl variant="standard" sx={{ minWidth: 180 }}>
        <InputLabel>Trier par</InputLabel>
        <Select
          value={sort || ""}
          onChange={(e) => setSort(e.target.value)}
        >
          <MenuItem value="">Aucun</MenuItem>
          {sortOptions.map((opt) => (
            <MenuItem key={opt.sort} value={opt}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        variant="standard"
        type="number"
        label="Prix min"
        value={filters.minPrice || ""}
        onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
      />
      <TextField
        variant="standard"
        type="number"
        label="Prix max"
        value={filters.maxPrice || ""}
        onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
      />



      <Button variant="outlined" color="secondary" onClick={onReset}>
        Réinitialiser
      </Button>
    </Stack>
  );
};