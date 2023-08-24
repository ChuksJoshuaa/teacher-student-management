"use client";

import { Header, HomeView, SideLayout } from "@/components";
import { saveTeacherData } from "@/redux/features/records/recordSlice";
import { useAppDispatch } from "@/redux/hook";
import { teacherData } from "@/utils/data";
import {
  getTeacherLocalStorage,
  saveTeacherLocalStorage,
} from "@/utils/getLocalStorage";
import { TeacherPropsWithId } from "@/utils/interface";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const loadData = () => {
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
  }, []);
  return (
    <SideLayout>
      <Header type="teacher" />
      <HomeView />
    </SideLayout>
  );
};
export default Home;
