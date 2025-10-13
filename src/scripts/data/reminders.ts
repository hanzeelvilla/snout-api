import Reminder from "../../types/reminder.interface";

const mydueDate1 = new Date("2026-11-31T10:00");
const mydueDate2 = new Date("2026-12-31T10:00");

const defaultReminders: Reminder[] = [
  {
    title: "Sacar a pasear al Viejon",
    dueDate: mydueDate1,
    userName: "Walle",
  },
  {
    title: "Llevar al vete al Viejon",
    description: "Desparacitación",
    dueDate: mydueDate2,
    userName: "Walle",
  },
  {
    title: "Sacar a pasear a Candy",
    dueDate: mydueDate1,
    userName: "Invisible",
  },
  {
    title: "Llevar al vete a Candy",
    description: "Desparacitación",
    dueDate: mydueDate2,
    userName: "Invisible",
  },
];

export default defaultReminders;
