"use client";

import { useState } from "react";
import { NavProfile } from ".";
import searchSvg from "@/assets/search.svg";
import toggleSvg from "@/assets/toggle.svg";
import Link from "next/link";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { openSidebar } from "@/redux/features/records/recordSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector((state) => state.record);
  const [value, setValue] = useState("");

  const handleChange = () => {
    console.log(value);
  };

  return (
    <div className="w-full h-[55px] relative bg-[#222]">
      <div
        className={`main-container flex flex-row ${
          !isSidebarOpen ? "justify-start" : "justify-between"
        } items-center`}
      >
        <Link
          href="/"
          className="w-72 h-[55px]"
          style={{ fontFamily: "Lobster Two" }}
        >
          <h1
            className={`text-gray-50 text-3xl font-bold pt-2.5 ${
              !isSidebarOpen ? "ml-5" : "ml-0"
            }`}
          >
            Peabux
          </h1>
        </Link>
        <div
          className={`ml-20 md:ml-30 flex justify-between items-center w-full ${
            !isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <div className="relative">
            <input
              onKeyUp={handleChange}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search"
              className="w-[250px] md:w-[500px] h-[27px] rounded-[4px] bg-white outline-none px-3"
            />
            <div className="absolute top-[50%] right-[10px] translate-y-[-50%]">
              <Image
                priority
                src={searchSvg}
                alt="search"
                className=" h-4 w-4 text-[#222]"
              />
            </div>
          </div>
          <div>
            <NavProfile />
          </div>
        </div>

        <div
          className={`cursor-pointer ${!isSidebarOpen ? "hidden" : "block"}`}
          onClick={() => dispatch(openSidebar(true))}
        >
          <Image
            priority
            src={toggleSvg}
            alt="search"
            className=" h-8 w-8 text-[#222]"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
