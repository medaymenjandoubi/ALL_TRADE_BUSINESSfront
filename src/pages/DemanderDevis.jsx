import React, { useEffect } from "react";
import { Footer } from "../features/footer/Footer";
import { Navbar } from "../features/navigation/components/Navbar";
import { ContactForm } from "../features/contact/ContactForm";
import { DevisForm } from "../features/about/DevisForm";

export const DemanderDevis = () => {
  return (
    <>
      <Navbar isProductList={true} />
      <DevisForm />
      <Footer />
    </>
  );
};
