"use client";
import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import NavbarSlider from "./NavbarSlider";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const pathName = usePathname();

  const deviceResponsive = () => {
    let availWidth = window.innerWidth;
    if (availWidth <= 768) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    deviceResponsive();
    window.addEventListener("resize", deviceResponsive);
    return () => {
      window.removeEventListener("resize", deviceResponsive);
    };
  }, []);

  return (
    <div
      className={`w-fit border-r-2   ${
        pathName == "/privacy-policy" ? "hidden" : "block"
      }`}
    >
     
      <NavbarSlider
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      ></NavbarSlider>

     
    </div>
  );
};

export default Navbar;
