"use client";
import { Header, HomeView, SideLayout } from "@/components";
import { saveStudentData } from "@/redux/features/records/recordSlice";
import { useAppDispatch } from "@/redux/hook";
import { studentData } from "@/utils/data";
import {
  getStudentLocalStorage,
  saveStudentLocalStorage,
} from "@/utils/getLocalStorage";
import { StudentPropsWithId } from "@/utils/interface";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const loadData = async () => {
    try {
      const response = await fetch("/api/record");
      const resp = await response.json();
      if (resp) {
        let value = getStudentLocalStorage().data;
        if (value && Array.isArray(value) && value.length > 0) {
          let studentData = value as StudentPropsWithId[];
          dispatch(saveStudentData(studentData));
        } else {
          let val = studentData as StudentPropsWithId[];
          saveStudentLocalStorage(val);
          dispatch(saveStudentData(studentData));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <SideLayout>
      <Header type="student" />
      <HomeView type="student" />
    </SideLayout>
  );
};
export default Home;
