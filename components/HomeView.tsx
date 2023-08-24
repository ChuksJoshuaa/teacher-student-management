"use client";
import { useAppSelector } from "@/redux/hook";
import { HeaderProps, StudentProps, TeacherProps } from "@/utils/interface";
import moment from "moment";
import { useEffect, useState } from "react";

const HomeView = ({ type }: HeaderProps) => {
  const { teacherData, studentData, isSidebarOpen } = useAppSelector(
    (state) => state.record
  );
  const [recordData, setRecordData] = useState<TeacherProps[] | StudentProps[]>(
    []
  );
  const getFetchData = async (): Promise<void> => {
    try {
      const response = await fetch("/api/record");
      const resp = await response.json();
      if (resp) {
        const value = type === "teacher" ? teacherData : studentData;
        setRecordData(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, [type, teacherData, studentData]);

  if (recordData.length === 0) {
    <div className="flex justify-center items-center text-center">
      No record found!!
    </div>;
  }

  return (
    <div className={`${!isSidebarOpen ? "mx-6" : "mx-1"}`}>
      <div className={`container ${!isSidebarOpen ? "ml-[1em]" : "ml-0"}`}>
        {recordData?.map((val: TeacherProps | StudentProps, i: number) => (
          <div
            key={i}
            className="w-full  h-auto sm:h-[180px] border-2 border-gray-100 shadow-lg mb-5 p-3"
          >
            {type === "teacher" && "title" in val ? (
              <h1 className="text-blue-700 font-bold text-md sm:text-lg pb-2 uppercase">
                Name: {val?.title}. {val?.name} {val?.surname}
              </h1>
            ) : (
              <h1 className="text-blue-700 font-bold text-md sm:text-lg pb-2 uppercase">
                Name: {val?.name} {val?.surname}
              </h1>
            )}
            {type === "teacher" && "title" in val ? (
              <h2 className="text-gray-900 font-normal text-md pb-2">
                Teacher Number: {val?.teacherNumber}
              </h2>
            ) : (
              <h2 className="text-gray-900 font-normal text-md pb-2">
                Student Number: {val?.studentNumber}
              </h2>
            )}
            <h2 className="text-gray-900 font-normal text-md pb-2">
              National ID Number: {val?.nationalIdNumber}
            </h2>

            <h6 className="text-red-600 text-sm">
              <span className="text-gray-900">Date of birth: </span>
              {moment(val?.dob).format("LL")}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
