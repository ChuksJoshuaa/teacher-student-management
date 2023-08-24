"use client";

import { HeaderProps, StudentProps, TeacherProps } from "@/utils/interface";
import React, { useState } from "react";
import { titleData } from "@/utils/data";
import { isEmptyString, checkAge } from "@/utils/validate";
import { ErrorPopup, SuccessPopup } from "@/utils/notification";
import { useAppDispatch } from "@/redux/hook";
import {
  addStudentData,
  addTeacherData,
  setLoader,
} from "@/redux/features/records/recordSlice";

const initialTeacherState: TeacherProps = {
  nationalIdNumber: "",
  title: "",
  name: "",
  surname: "",
  dob: "",
  teacherNumber: "",
  salary: "",
};

const initialStudentState: StudentProps = {
  nationalIdNumber: "",
  name: "",
  surname: "",
  dob: "",
  studentNumber: "",
};

const Form = ({ type }: HeaderProps) => {
  const initialState =
    type === "teacher" ? initialTeacherState : initialStudentState;
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(initialState);
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const emptyField = () => {
    setErrors(initialState);
    setFormData(initialState);
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const fieldsToTeacherValidate = [
    "nationalIdNumber",
    "title",
    "name",
    "surname",
    "teacherNumber",
    "dob",
  ];
  const fieldsToStudentValidate = [
    "nationalIdNumber",
    "name",
    "surname",
    "dob",
    "studentNumber",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors =
      type === "teacher"
        ? { ...initialTeacherState }
        : { ...initialStudentState };

    let fieldsToValidate =
      type === "teacher" ? fieldsToTeacherValidate : fieldsToStudentValidate;
    let hasErrors = false;

    fieldsToValidate.forEach((field) => {
      let fieldValue: string | number | undefined;

      if ("teacherNumber" in formData && type === "teacher") {
        fieldValue = (formData as TeacherProps)[field];
      } else if ("studentNumber" in formData && type === "student") {
        fieldValue = (formData as StudentProps)[field as keyof StudentProps];
      }

      if (!fieldValue) {
        newErrors = {
          ...newErrors,
          [field]: "This field is required",
        };
        hasErrors = true;
      } else {
        newErrors = {
          ...newErrors,
          [field]: "",
        };
      }
    });

    if (type) {
      if (checkAge(formData.dob) < 21) {
        newErrors = {
          ...newErrors,
          dob: "Age must be at least 21",
        };
        hasErrors = true;
      }
    }

    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setTimeout(() => {
          setIsSubmitting(false);
          if (type === "teacher") dispatch(addTeacherData(data));
          else dispatch(addStudentData(data));
          emptyField();
          dispatch(setLoader(true));
          SuccessPopup("Success! Your form has been submitted.");
          setTimeout(() => {
            window.location.href = `${type === "teacher" ? "/" : "/student"}`;
          }, 500);
        }, 500);
      } else {
        ErrorPopup("Sorry, an error occurred");
      }
    } catch (error) {
      ErrorPopup("Sorry, an error occurred");
      console.log(error);
    }
  };
  return (
    <div
      className="form__container"
      id="form__container"
      data-testid="form__container"
    >
      <div className="bg-white shadow-md rounded px-8 pt-2 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 flex flex-col mb-6">
          <div className="mb-6 md:mb-3">
            <label
              className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal mb-2"
              htmlFor="nationalIdNumber"
            >
              National ID Number
            </label>
            <input
              className={`${
                isEmptyString(errors.nationalIdNumber)
                  ? "input"
                  : "input-invalid"
              } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
              id="nationalIdNumber"
              placeholder="-- Enter NIN --"
              type="text"
              name="nationalIdNumber"
              value={formData.nationalIdNumber}
              onChange={handleChange}
            />
            <div className="text-red-900 text-sm">
              {errors.nationalIdNumber}
            </div>
          </div>
          {type === "teacher" && "title" in formData && "title" in errors ? (
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <select
                  className={`${
                    isEmptyString((errors as TeacherProps).title)
                      ? "input"
                      : "input-invalid"
                  } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                >
                  <option value="">Select Title</option>
                  {titleData.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <div className="text-red-900 text-sm">{errors.title}</div>
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal font-bold mb-2"
                  htmlFor="teacherNumber"
                >
                  Teacher Number
                </label>
                <input
                  className={`${
                    isEmptyString((errors as TeacherProps).teacherNumber)
                      ? "input"
                      : "input-invalid"
                  } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
                  id="teacherNumber"
                  placeholder="--Enter Teacher Number--"
                  type="text"
                  name="teacherNumber"
                  value={formData.teacherNumber}
                  onChange={handleChange}
                />
                <div className="text-red-900 text-sm">
                  {errors.teacherNumber}
                </div>
              </div>
            </div>
          ) : null}

          <div className="-mx-3 md:flex mb-6">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className={`${
                  isEmptyString(errors.name) ? "input" : "input-invalid"
                } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
                id="name"
                placeholder="-- Enter Name --"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <div className="text-red-900 text-sm">{errors.name}</div>
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal font-bold mb-2"
                htmlFor="surname"
              >
                Surname
              </label>
              <input
                className={`${
                  isEmptyString(errors.surname) ? "input" : "input-invalid"
                } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
                id="surname"
                placeholder="-- Enter Surname --"
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
              <div className="text-red-900 text-sm">{errors.surname}</div>
            </div>
          </div>
          <div className="-mx-3 md:flex mb-6">
            {type === "teacher" && "salary" in formData && "title" in errors ? (
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal font-bold mb-2"
                  htmlFor="salary"
                >
                  Salary
                </label>
                <input
                  className={`${
                    isEmptyString(errors.salary) ? "input" : "input-invalid"
                  } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
                  id="salary"
                  placeholder="-- Enter Salary --"
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                />
                <div className="text-red-900 text-sm">{errors.salary}</div>
              </div>
            ) : (
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal font-bold mb-2"
                  htmlFor="studentNumber"
                >
                  Student Number
                </label>
                <input
                  className={`${
                    isEmptyString(errors.studentNumber as string)
                      ? "input"
                      : "input-invalid"
                  } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
                  id="studentNumber"
                  placeholder="-- Enter Student Number --"
                  type="text"
                  name="studentNumber"
                  value={formData.studentNumber}
                  onChange={handleChange}
                />
                <div className="text-red-900 text-sm">
                  {errors.studentNumber}
                </div>
              </div>
            )}
            <div className="md:w-1/2 px-3">
              <label
                className="block capitalize tracking-wide text-grey-darker text-md md:text-lg font-normal font-bold mb-2"
                htmlFor="dob"
              >
                Date of birth
              </label>
              <input
                className={`${
                  isEmptyString(errors.dob) ? "input" : "input-invalid"
                } appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-1 outline-none`}
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              <div className="text-red-900 text-sm">{errors.dob}</div>
            </div>
          </div>

          <div className="flex flex-end justify-end items-center">
            <button
              type="button"
              onClick={emptyField}
              className="mr-3 text-gray-900 cursor-pointer"
            >
              Cancel
            </button>

            <button
              className={`flex flex-row navy bg-gray-900 capitalize hover:bg-gray-700 text-white font-[semi-bold] py-2 px-4 rounded ${
                isSubmitting && "opacity-50"
              }`}
              onClick={handleSubmit}
              onKeyDown={handleEnterKeyPress}
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <div aria-label="Loading..." role="status" className="mr-1">
                  <svg className="h-5 w-5 animate-spin" viewBox="3 3 18 18">
                    <path
                      className="fill-gray-200"
                      d="M12 5C8.13401 5 5 8.13401 5 12c0 3.866 3.13401 7 7 7 3.866.0 7-3.134 7-7 0-3.86599-3.134-7-7-7zM3 12c0-4.97056 4.02944-9 9-9 4.9706.0 9 4.02944 9 9 0 4.9706-4.0294 9-9 9-4.97056.0-9-4.0294-9-9z"
                    ></path>
                    <path
                      className="fill-gray-800"
                      d="M16.9497 7.05015c-2.7336-2.73367-7.16578-2.73367-9.89945.0-.39052.39052-1.02369.39052-1.41421.0-.39053-.39053-.39053-1.02369.0-1.41422 3.51472-3.51472 9.21316-3.51472 12.72796.0C18.7545 6.02646 18.7545 6.65962 18.364 7.05015c-.390599999999999.39052-1.0237.39052-1.4143.0z"
                    ></path>
                  </svg>
                </div>
              )}
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
