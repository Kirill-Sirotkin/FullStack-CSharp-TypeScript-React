import React from "react";
import useAppSelector from "../hooks/useAppSelector";
import CartCard from "../components/CartCard";
import LoanCreateUpdateInfo from "../types/LoanCreateUpdateInfo";
import useAppDispatch from "../hooks/useAppDispatch";
import { createLoan } from "../reducers/loanReducer";
import { clearCart, getTotal } from "../reducers/cartReducer";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const user = useAppSelector(state => state.userReducer);
    const cart = useAppSelector(state => state.cartReducer);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const cartCards = cart.products.map((book) => 
        <CartCard key={book.product.id} {...book} />
    );

    const checkoutBooks = () => {
        const loanRequests: any[] = [];
        cart.products.forEach((book) => {
            const today = new Date();
            const due = new Date(today.getDate() + 30);
            const newLoan: LoanCreateUpdateInfo =  {
                userId: user.currentUser.id,
                bookId: book.product.id,
                takenDate: today.toISOString(),
                dueDate: due.toISOString(),
                status: 0
            }
            loanRequests.push(dispatch(createLoan({loan: newLoan, token: user.token})));
        });
        Promise.all(loanRequests).then(() => navigate("/books"));
        dispatch(clearCart());
    }

    return (
        <div className="centered-wrapper">
            {getTotal(cart.products) > 0 ? 
            <div>
                <div className="items-grid">
                    {cartCards}
                </div>
                <button className="checkout-button" onClick={checkoutBooks}>Checkout</button>
            </div>
            : <div style={{fontSize: "3em"}}>
                Cart empty.&nbsp;
                <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={"/books"} >browse</Link>
            </div>}
        </div>
    )
}

export default Cart;