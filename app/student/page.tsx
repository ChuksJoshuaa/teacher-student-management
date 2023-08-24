"use client";
import { Header, HomeView, Loader, SideLayout } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getStudentLocalStorage,
  saveStudentLocalStorage,
} from "@/utils/getLocalStorage";
import { StudentPropsWithId } from "@/utils/interface";
import { studentData } from "@/utils/data";
import {
  saveStudentData,
  setLoader,
} from "@/redux/features/records/recordSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.record);
  const loadData = () => {
    setTimeout(() => {
      dispatch(setLoader(false));
    }, 300);
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
      {loading ? <Loader /> : <HomeView type="student" />}
    </SideLayout>
  );
};
export default Home;
