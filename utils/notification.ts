import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ErrorPopup = (text: string) =>
  toast.error(text, {
    position: toast.POSITION.TOP_CENTER,
    className: "toast-message",
  });

export const SuccessPopup = (text: string) =>
  toast.success(text, {
    position: toast.POSITION.TOP_RIGHT,
    className: "toast-message",
  });
