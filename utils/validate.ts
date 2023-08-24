export function isEmptyString(value: string) {
  return typeof value === "string" && value.trim() === "";
}

export const checkAge = (val: string) => {
  const dob = new Date(val);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};
