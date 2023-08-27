import { createSlice } from "@reduxjs/toolkit";
import { IIProps, StudentProps, TeacherProps } from "@/utils/interface";
import {
  saveStudentLocalStorage,
  saveTeacherLocalStorage,
} from "@/utils/getLocalStorage";
import { uniqueId } from "@/utils/data";

const initialState: IIProps = {
  loading: true,
  isSidebarOpen: false,
  teacherData: [] as TeacherProps[],
  studentData: [] as StudentProps[],
  searchTerm: "",
};

export const recordSlice = createSlice({
  name: "record",

  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.loading = action.payload;
    },

    openSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    saveTeacherData: (state, action) => {
      state.teacherData = action.payload;
    },

    saveStudentData: (state, action) => {
      state.studentData = action.payload;
    },

    addTeacherData: (state, action) => {
      let value = {
        ...action.payload,
        id: uniqueId(),
      };
      state.teacherData = [...state.teacherData, value];
      saveTeacherLocalStorage(state.teacherData);
    },

    addStudentData: (state, action) => {
      let value = {
        ...action.payload,
        id: uniqueId(),
      };
      state.studentData = [...state.studentData, value];
      saveStudentLocalStorage(state.studentData);
    },
  },
});

export const {
  setLoader,
  openSidebar,
  saveTeacherData,
  addTeacherData,
  addStudentData,
  saveStudentData,
  setSearchTerm,
} = recordSlice.actions;

export default recordSlice.reducer;
