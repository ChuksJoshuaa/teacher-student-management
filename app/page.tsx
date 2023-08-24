"use client";

import { Header, HomeView, Loader, SideLayout } from "@/components";
import {
  saveTeacherData,
  setLoader,
} from "@/redux/features/records/recordSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { teacherData } from "@/utils/data";
import {
  getTeacherLocalStorage,
  saveTeacherLocalStorage,
} from "@/utils/getLocalStorage";
import { TeacherPropsWithId } from "@/utils/interface";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.record);
  const loadData = () => {
    setTimeout(() => {
      dispatch(setLoader(false));
    }, 300);
    let value = getTeacherLocalStorage().data;
    if (value && Array.isArray(value) && value.length > 0) {
      let teacherData = value as TeacherPropsWithId[];
      dispatch(saveTeacherData(teacherData));
    } else {
      let val = teacherData as TeacherPropsWithId[];
      saveTeacherLocalStorage(val);
      dispatch(saveTeacherData(teacherData));
    }
  };

  useEffect(() => {
    loadData();
  }, [loading]);
  return (
    <SideLayout>
      <Header type="teacher" />
      {loading ? <Loader /> : <HomeView type="teacher" />}
    </SideLayout>
  );
};
export default Home;
