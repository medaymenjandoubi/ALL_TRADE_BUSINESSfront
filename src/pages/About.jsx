import React, { useEffect } from "react";
import { Footer } from "../features/footer/Footer";
import { Navbar } from "../features/navigation/components/Navbar";
import { AboutBlock } from "../features/about/aboutBlock";
export const About = () => {
  return (
    <>
      <Navbar isProductList={true} />
      <AboutBlock />
      <Footer />
    </>
  );
};
