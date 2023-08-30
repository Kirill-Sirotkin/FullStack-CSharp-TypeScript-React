import { Link } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import AdminButtons from "./AdminButtons";
import useAppDispatch from "../hooks/useAppDispatch";
import { useState } from "react";
import Loan from "../types/Loan";
import LoanCreateUpdateInfo from "../types/LoanCreateUpdateInfo";
import LoanStatuses from "../types/LoanStatuses";
import { deleteLoan, getLoans, updateLoan } from "../reducers/loanReducer";

const LoanCard = (loan: Loan) => {
  const user = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const [updateContextActive, setUpdateContextActive] = useState(false);
  const [inputStatus, setInputStatus] = useState(0);
  const [inputDue, setInputDue] = useState("");
  const [inputReturned, setInputReturned] = useState<string | undefined>("");

  const updateBookClick = (id: string) => {
    setInputStatus(loan.status);
    setInputDue(loan.dueDate);
    setInputReturned(loan.returnedDate);
    setUpdateContextActive(true);
  }

  const deleteBookClick = async (id: string) => {
    const token = localStorage.getItem("token");
    await dispatch(deleteLoan({id, token}));
    dispatch(getLoans(token));
  }

  const updateSave = async () => {
    const loanUpdate: LoanCreateUpdateInfo = {
      userId: loan.userId,
      bookId: loan.bookId,
      takenDate: loan.takenDate,
      dueDate: inputDue,
      status: inputStatus,
      returnedDate: inputReturned
    }
    const token = localStorage.getItem("token");
    await dispatch(updateLoan({loan: loanUpdate, idAndToken: {id: loan.id, token }}));
    dispatch(getLoans(token));
    setUpdateContextActive(false);
  }

  const updateCancel = () => {
    setUpdateContextActive(false);
  }
  
  if (!updateContextActive) return (
    <div key={loan.id} className="items-grid-element">
      user: <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/users/${loan.userId}`}> {loan.userId}</Link>
      <br/>
      book: <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/books/${loan.bookId}`}> {loan.bookId}</Link>
      <br/>
      Status: {LoanStatuses[loan.status]}
      <br/>
      Taken on: {loan.takenDate}
      <br/>
      Due: {loan.dueDate}
      <br/>
      Returned: {loan.returnedDate ? loan.returnedDate : "not returned yet"}
      <AdminButtons {...{user: user.currentUser, updateFunction: updateBookClick, deleteFunction: deleteBookClick, itemId: loan.id}} />
    </div>
  )

  return (
    <div key={loan.id} className="items-grid-element">
      user: <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/users/${loan.userId}`}> {loan.userId}</Link>
      <br/>
      book: <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/books/${loan.bookId}`}> {loan.bookId}</Link>
      <br/>
      Status: 
        <select defaultValue={loan.status}>
          <option value="0">{LoanStatuses[0]}</option>
          <option value="1">{LoanStatuses[1]}</option>
          <option value="2">{LoanStatuses[2]}</option>
        </select>
      <br/>
      Taken on: {loan.takenDate}
      <br/>
      Due: <input className="edit-input" type="date" defaultValue={loan.dueDate} />
      <br/>
      Returned: <input className="edit-input" type="date" defaultValue={loan.returnedDate ? loan.returnedDate : new Date().toUTCString()} />
      <div className="edit-buttons">
        <button style={{backgroundColor: "red"}} onClick={updateCancel}>CANCEL</button>
        <button style={{backgroundColor: "green"}} onClick={updateSave}>SAVE</button>
      </div>
    </div>
  )
}

export default LoanCard;