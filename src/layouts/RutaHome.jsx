import React from "react";
import HeaderHome from "../components/HeaderHome";
import MainHome from "../components/MainHome";
import SomosHome from "../components/SomosHome";
import ServiciosHome from "../components/ServiciosHome";
import ContactoHome from "../components/ContactoHome";
import FooterHome from "../components/FooterHome";
import "../styles/landing.css";

const RutaHome = () => {
  return (
    <>
      <div className="home">
        <HeaderHome />
        <MainHome />
        {/* <SomosHome /> */}
        {/* <ServiciosHome /> */}
        {/* <ContactoHome /> */}
        {/* <FooterHome /> */}
      </div>
    </>
  );
};

export default RutaHome;
