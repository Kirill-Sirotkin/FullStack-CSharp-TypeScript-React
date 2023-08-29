interface Loan {
  id: string;
  userId: string;
  bookId: string;
  takenDate: string;
  dueDate: string;
  returnedDate?: string;
  status: number;
}
export default Loan;
