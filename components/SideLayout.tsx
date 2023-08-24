"use client";

import { ChildrenProps } from "@/utils/interface";
import { openSidebar } from "@/redux/features/records/recordSlice";
import { useAppDispatch } from "@/redux/hook";
import React, { useState, useEffect } from "react";

const SideLayout = ({ children }: ChildrenProps) => {
  const dispatch = useAppDispatch();
  const [screenSize, setScreenSize] = useState<number | null>(null);

  const checkWidth = () => {
    let windowWidth = null;
    if (typeof window !== "undefined") {
      windowWidth = window?.innerWidth;
      setScreenSize(windowWidth);
    }
    if (windowWidth) {
      if (windowWidth <= 850) dispatch(openSidebar(true));
      if (windowWidth >= 850) dispatch(openSidebar(false));
      return windowWidth;
    }
  };

  useEffect(() => {
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [screenSize]);
  return <div className="main-container">{children}</div>;
};

export default SideLayout;
