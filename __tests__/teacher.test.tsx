import Form from "@/components/Form";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("Form", () => {
  it("renders Form component", () => {
    render(
      <Provider store={store}>
        <Form type="teacher" />
      </Provider>
    );
    const formElement = screen.getByTestId("form__container");
    expect(formElement).toBeInTheDocument();
  });

  it("allows input of nationalIdNumber", () => {
    render(
      <Provider store={store}>
        <Form type="teacher" />
      </Provider>
    );
    const inputElement = screen.getByLabelText(
      "National ID Number"
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "123456789" } });
    expect(inputElement.value).toBe("123456789");
  });
  it("allows input of name", () => {
    render(
      <Provider store={store}>
        <Form type="teacher" />
      </Provider>
    );
    const inputElement = screen.getByLabelText("Name") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "John" } });
    expect(inputElement.value).toBe("John");
  });
  it("allows input of surname", () => {
    render(
      <Provider store={store}>
        <Form type="teacher" />
      </Provider>
    );
    const inputElement = screen.getByLabelText("Surname") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Doe" } });
    expect(inputElement.value).toBe("Doe");
  });
  it("allows input of salary", () => {
    render(
      <Provider store={store}>
        <Form type="teacher" />
      </Provider>
    );
    const inputElement = screen.getByLabelText("Salary") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "40000" } });
    expect(inputElement.value).toBe("40000");
  });

  it("submits form data", async () => {
    render(
      <Provider store={store}>
        <Form type="teacher" />
      </Provider>
    );
    const nationalIdNumberInput = screen.getByLabelText("National ID Number");
    const nameInput = screen.getByLabelText("Name");
    const surnameInput = screen.getByLabelText("Surname");
    const salaryInput = screen.getByLabelText("Salary");
    const dobInput = screen.getByLabelText("Date of birth");
    const titleInput = screen.getByLabelText("Title");
    const teacherInput = screen.getByLabelText("Teacher Number");
    const form = screen.getByTestId("form__container");

    fireEvent.change(nationalIdNumberInput, { target: { value: "123456789" } });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(titleInput, { target: { value: "Mr" } });
    fireEvent.change(teacherInput, { target: { value: "M-226737" } });
    fireEvent.change(salaryInput, { target: { value: "50000" } });
    fireEvent.change(surnameInput, { target: { value: "Doe" } });
    fireEvent.change(dobInput, { target: { value: "1990-01-01" } });
    fireEvent.submit(form);
  });
});
