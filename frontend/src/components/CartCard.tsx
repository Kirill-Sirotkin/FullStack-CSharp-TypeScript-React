import bookCover from "./../media/cover_unavailable.png"
import { Link } from "react-router-dom";
import { CartProduct, removeProductFromCart } from "../reducers/cartReducer";
import useAppDispatch from "../hooks/useAppDispatch";

const CartCard = (cartProduct: CartProduct) => {
  const dispatch = useAppDispatch();
  
  return (
    <div key={cartProduct.product.id} className="items-grid-element">
      <img alt="book cover" src={bookCover} style={{width: "80px", height: "80px"}} />
      <div style={{backgroundColor: "inherit"}}>
          <Link className="button-highlight" style={{backgroundColor: "inherit"}} to={`/books/${cartProduct.product.id}`}>
            {cartProduct.product.title}
          </Link>
      </div>
      <br/>
      ISBN: {cartProduct.product.isbn}
      <br/>
      Available to borrow: {cartProduct.product.quantity}
      <div className="edit-buttons">
        <button style={{backgroundColor: "red"}} onClick={() => dispatch(removeProductFromCart(cartProduct.product.id))}>Remove from cart</button>
      </div>
    </div>
  )
}

export default CartCard;