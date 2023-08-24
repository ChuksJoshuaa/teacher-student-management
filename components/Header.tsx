"use client";
import Link from "next/link";
import dashboardSvg from "@/assets/dashboard.svg";
import arrowRightSvg from "@/assets/arrowRight.svg";
import { HeaderProps } from "@/utils/interface";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { setLoader } from "@/redux/features/records/recordSlice";

const Header = ({ type }: HeaderProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector((state) => state.record);
  return (
    <div
      className={`flex flex-wrap justify-between items-center mt-5 py-5 ${
        !isSidebarOpen ? "mx-6" : "mx-1"
      }`}
    >
      <div
        className={`mb-2 flex justify-start items-center ${
          !isSidebarOpen ? "ml-[1em]" : "ml-0"
        }`}
      >
        <Image
          priority
          src={dashboardSvg}
          alt="dashboard"
          className="w-[20px] h-[20px]"
        />
        <Image
          priority
          src={arrowRightSvg}
          alt="arrow-right"
          className="w-[20px] h-[20px] mx-2"
        />
        <h3 className="font-bold text-[14px] md:text-[17px] leading-[20px] text-[#222]">
          {type === "teacher"
            ? "All Teachers Record"
            : type === "student"
            ? "All Students Record"
            : type}
        </h3>
      </div>
      {type === "teacher" || type === "student" ? (
        <div className="flex justify-center ">
          <Link
            href={`/create-form/${type === "teacher" ? "teacher" : "student"}`}
            className="rounded-[6px] bg-[#222] py-[5px] px-[10px] gap-[5px] flex items-center cursor-pointer"
          >
            <h3 className="text-white  text-[12px] sm:text-[14px] leading-[24px] font-normal">
              Create Record
            </h3>
          </Link>
          <Link
            href={`${type === "teacher" ? "/student" : "/"}`}
            onClick={() => dispatch(setLoader(true))}
            className="mx-2 rounded-[6px] bg-[#222] py-[5px] px-[10px] gap-[5px] flex items-center cursor-pointer"
          >
            <h3 className="text-white text-[12px] sm:text-[14px] leading-[24px] font-normal">
              {type === "teacher" ? "View Students" : "View Teachers"}
            </h3>
          </Link>
        </div>
      ) : (
        <button
          onClick={() => {
            router.back();
            dispatch(setLoader(true));
          }}
          className="rounded-[6px] bg-[#222] py-[5px] px-[10px] gap-[5px] flex items-center cursor-pointer"
        >
          <h3 className="text-white text-[14px] leading-[24px] font-normal">
            Go back
          </h3>
        </button>
      )}
    </div>
  );
};

export default Header;
