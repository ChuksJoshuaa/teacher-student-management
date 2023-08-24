"use client";

import { Form, Header, SideLayout } from "@/components";
import { useParams } from "next/navigation";

const CreateForm = () => {
  const { id } = useParams();

  return (
    <SideLayout>
      <Header
        type={`${
          id === "teacher" ? "Teacher Record Form" : "Student Record Form"
        }`}
      />
      <Form type={id as string} />
    </SideLayout>
  );
};

export default CreateForm;
