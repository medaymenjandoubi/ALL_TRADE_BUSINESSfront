import React, { useEffect } from "react";
import { Footer } from "../features/footer/Footer";
import { Navbar } from "../features/navigation/components/Navbar";
import { ServicesBlock } from "../features/about/servicesBlock";
export const Services = () => {
  return (
    <>
      <Navbar isProductList={true} />
      <ServicesBlock />
      <Footer />
    </>
  );
};
