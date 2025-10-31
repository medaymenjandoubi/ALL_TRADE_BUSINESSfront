import React, { useEffect } from "react";
import { Footer } from "../features/footer/Footer";
import { Navbar } from "../features/navigation/components/Navbar";
import { ConditionsGenerales } from "../features/conditions/ConditionsGenerales";

export const GeneralConditions = () => {
  return (
    <>
      <Navbar isProductList={true} />
      <ConditionsGenerales />
      <Footer />
    </>
  );
};
