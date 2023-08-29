import React, { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { getLoans } from "../reducers/loanReducer";
import LoanCard from "../components/LoanCard";

const Loans = () => {
    const loans = useAppSelector(state => state.loanReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("getting loans");
        const token = localStorage.getItem("token");
        dispatch(getLoans(token));
    }, [dispatch])

    const loanCards = loans.loans.map((loan) => 
        <LoanCard key={loan.id} {...loan} />
    );

    return (
        <div className="centered-wrapper">
            <div className="items-grid">
                {loanCards}
            </div>
        </div>
    )
}

export default Loans;