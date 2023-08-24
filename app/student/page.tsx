"use client";
import { Header, HomeView, SideLayout } from "@/components";
import { useAppDispatch } from "@/redux/hook";
import {
  getStudentLocalStorage,
  saveStudentLocalStorage,
} from "@/utils/getLocalStorage";
import { StudentPropsWithId } from "@/utils/interface";
import { studentData } from "@/utils/data";
import { saveStudentData } from "@/redux/features/records/recordSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const loadData = () => {
    let value = getStudentLocalStorage().data;
    if (value && Array.isArray(value) && value.length > 0) {
      let studentData = value as StudentPropsWithId[];
      dispatch(saveStudentData(studentData));
    } else {
      let val = studentData as StudentPropsWithId[];
      saveStudentLocalStorage(val);
      dispatch(saveStudentData(studentData));
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <SideLayout>
      <Header type="student" />
      <HomeView />
    </SideLayout>
  );
};
export default Home;
