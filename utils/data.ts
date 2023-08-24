export const titleData = [
  {
    name: "Mr",
    id: "mr",
  },
  {
    name: "Mrs",
    id: "mrs",
  },
  {
    name: "Miss",
    id: "miss",
  },
  {
    name: "Dr",
    id: "dr",
  },
  {
    name: "Prof",
    id: "prof",
  },
];

export const uniqueId = () => Math.floor(Math.random() * 1000000000);

export function formatCurrency(i: string) {
  let val = Number(i);
  return new Intl.NumberFormat().format(val);
}

export const teacherData = [
  {
    id: 1,
    nationalIdNumber: "28393030020223",
    title: "mr",
    name: "John",
    surname: "Doe",
    dob: "1991-06-23",
    salary: "100000",
    teacherNumber: "J-78123",
  },
];

export const studentData = [
  {
    id: 2,
    nationalIdNumber: "28393030020223",
    name: "Jane",
    surname: "Okey",
    dob: "1998-11-21",
    studentNumber: "G8399",
  },
];
