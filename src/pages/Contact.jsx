import React, { useEffect } from "react";
import { Footer } from "../features/footer/Footer";
import { Navbar } from "../features/navigation/components/Navbar";
import { ContactForm } from "../features/contact/ContactForm";

export const Contact = () => {
  return (
    <>
      <Navbar isProductList={true} />
      <ContactForm />
      <Footer />
    </>
  );
};
