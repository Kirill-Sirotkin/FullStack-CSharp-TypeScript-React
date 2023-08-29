interface LoanCreateUpdateInfo {
  userId: string;
  bookId: string;
  takenDate: string;
  dueDate: string;
  returnedDate?: string;
  status: number;
}
export default LoanCreateUpdateInfo;
