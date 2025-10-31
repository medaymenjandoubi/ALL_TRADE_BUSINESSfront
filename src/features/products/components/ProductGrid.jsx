import React from "react";
import { Grid, Typography } from "@mui/material";
import { ProductCard } from "./ProductCard";
import { createWishlistItemAsync, deleteWishlistItemByIdAsync, selectWishlistItems } from "../../wishlist/WishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/AuthSlice";

export const ProductGrid = ({ products }) => {
    const wishlistItems = useSelector(selectWishlistItems);
    const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);

  if (!products?.length)
    return <Typography color="gray" textAlign="center" mt={5}>Aucun produit trouvé.</Typography>;
  const handleAddRemoveFromWishlist = (e, productId) => {
    if (e.target.checked) {
      const data = { user: loggedInUser?._id, product: productId };
      dispatch(createWishlistItemAsync(data));
    } else {
      const index = wishlistItems.findIndex((item) => item.product._id === productId);
      dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
    }
  };
  return (
<Grid container spacing={2} mt={2}>
  {products.map((prod) => (
    <Grid item xs={6} sm={4} md={3} key={prod._id}>
      <ProductCard
        id={prod._id}
        title={prod.title}
        price={prod.price}
        thumbnail={prod.thumbnail}
        brand={prod.brand}
        stockQuantity={prod.stockQuantity}
        isLiquid={prod.isLiquid}
        nbrParPaquet={prod.nbrParPaquet}
        isWishlistCard={prod.isWishlistCard}
        isAdminCard={prod.isAdminCard}
        handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
      />
    </Grid>
  ))}
</Grid>

  );
};