"use client";
import arrowDownSvg from "@/assets/arrowDownWhite.svg";
import messengerSvg from "@/assets/messenger.svg";
import notificationSvg from "@/assets/notification.svg";
import userSvg from "@/assets/userIcon.svg";
import Image from "next/image";

const NavProfile = () => {
  return (
    <div className="flex justify-start items-center">
      <div>
        <Image
          priority
          src={messengerSvg}
          alt="messenger"
          className="w-[16px] h-[16px] text-white"
        />
      </div>
      <div className="flex justify-start items-center mx-3">
        <h3 className="font-normal leading-normal text-[16px] text-white uppercase">
          en
        </h3>
        <Image
          priority
          src={arrowDownSvg}
          alt="arrow-down"
          className="w-[16px] h-[16px] text-white mx-2"
        />
      </div>
      <div className="text-gray-50">
        <Image
          priority
          src={notificationSvg}
          alt="notification"
          className="w-[16px] h-[16px] text-white"
        />
      </div>
      <div className="flex justify-start items-center mx-3">
        <Image
          priority
          src={userSvg}
          alt="profile-image"
          className="w-[25px] h-[25px] rounded-full"
        />
        <Image
          priority
          src={arrowDownSvg}
          alt="arrow-down"
          className="w-[16px] h-[16px] text-white mx-2"
        />
      </div>
    </div>
  );
};

export default NavProfile;
