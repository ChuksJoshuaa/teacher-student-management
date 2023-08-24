import { TeacherProps, StudentProps } from "./interface";

export const saveTeacherLocalStorage = (data: TeacherProps[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("teachers", JSON.stringify({ data }));
  }
};

export const getTeacherLocalStorage = () => {
  let teachers = {
    data: [],
  };

  if (typeof window !== "undefined") {
    teachers = JSON.parse(localStorage.getItem("teachers") || "{}");
  }
  return teachers;
};

export const saveStudentLocalStorage = (data: StudentProps[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("students", JSON.stringify({ data }));
  }
};

export const getStudentLocalStorage = () => {
  let students = {
    data: [],
  };

  if (typeof window !== "undefined") {
    students = JSON.parse(localStorage.getItem("students") || "{}");
  }
  return students;
};
