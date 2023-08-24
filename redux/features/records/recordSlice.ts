import { createSlice } from "@reduxjs/toolkit";
import { IIProps, StudentProps, TeacherProps } from "@/utils/interface";

const initialState: IIProps = {
  loading: true,
  isSidebarOpen: false,
  teacherData: [] as TeacherProps[],
  studentData: [] as StudentProps[],
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
  },
});

export const { setLoader, openSidebar } = recordSlice.actions;

export default recordSlice.reducer;
