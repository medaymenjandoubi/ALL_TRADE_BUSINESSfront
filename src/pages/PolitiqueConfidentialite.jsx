import React, { useEffect } from "react";
import { Footer } from "../features/footer/Footer";
import { Navbar } from "../features/navigation/components/Navbar";
import { Politique } from "../features/politique/politique";

export const PolitiqueConfidentialite = () => {
  return (
    <>
      <Navbar isProductList={true} />
      <Politique />
      <Footer />
    </>
  );
};
