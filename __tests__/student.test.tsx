import Form from "@/components/Form";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("Form", () => {
  it("renders Form component", () => {
    render(
      <Provider store={store}>
        <Form type="student" />
      </Provider>
    );
    const formElement = screen.getByTestId("form__container");
    expect(formElement).toBeInTheDocument();
  });

  it("allows input of nationalIdNumber", () => {
    render(
      <Provider store={store}>
        <Form type="student" />
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
        <Form type="student" />
      </Provider>
    );
    const inputElement = screen.getByLabelText("Name") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "John" } });
    expect(inputElement.value).toBe("John");
  });
  it("allows input of surname", () => {
    render(
      <Provider store={store}>
        <Form type="student" />
      </Provider>
    );
    const inputElement = screen.getByLabelText("Surname") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Doe" } });
    expect(inputElement.value).toBe("Doe");
  });

  it("submits form data", async () => {
    render(
      <Provider store={store}>
        <Form type="student" />
      </Provider>
    );
    const nationalIdNumberInput = screen.getByLabelText("National ID Number");
    const nameInput = screen.getByLabelText("Name");
    const surnameInput = screen.getByLabelText("Surname");
    const dobInput = screen.getByLabelText("Date of birth");
    const studentInput = screen.getByLabelText("Student Number");
    const form = screen.getByTestId("form__container");

    fireEvent.change(nationalIdNumberInput, { target: { value: "123456789" } });
    fireEvent.change(nameInput, { target: { value: "Jane" } });
    fireEvent.change(studentInput, { target: { value: "J-336627" } });
    fireEvent.change(surnameInput, { target: { value: "Oma" } });
    fireEvent.change(dobInput, { target: { value: "2001-09-21" } });
    fireEvent.submit(form);
  });
});
