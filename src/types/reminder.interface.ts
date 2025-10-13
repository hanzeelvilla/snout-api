export default interface Reminder {
  title: string,
  description?: string,
  dueDate: Date,
  userId: string
}