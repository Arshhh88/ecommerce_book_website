import React, {useContext} from "react";
import './cart-items-container.styles.css';
import CartItemCard from "../../cards/cart-item-card/CartItemCard";
import { CartContext } from '../../../App';
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

const CartItemsContainer = () => {
    const { cartItems, totalAmount } = useContext(CartContext);
    const stripeKey = 'pk_test_51O3FB9SDljH0eVhIuqPnUxG60M9C8GqzYZdc4HWifypl9FexYCKwOVOsWLvBJDuac1AvA8hmoMkS7RZ0QCD6hmHF005OAqCd43'
    const navigate = useNavigate();

    const onToken = (token => {
        console.log(token);
        alert('Your payment has been processed')
        navigate('/books');
    })

    return (
        <section className="cart-items-container">
            <div className="container">
                {totalAmount === 0 ? (
                    <h2>Currently your cart is empty</h2>
                ):(
                    <React.Fragment>
                        <h2>Cart</h2>

                        {cartItems.map((item) => (
                            <CartItemCard key={item.id} bookData={item} />
                        ))}

                        <h2>Total amount = &#8377;{totalAmount}</h2>

                        <StripeCheckout
                            name="Book Checkout"
                            description="Please fill in the details below"
                            amount={totalAmount * 100}
                            currency="INR"
                            stripeKey={stripeKey}
                            token={onToken}
                            billingAddress
                        >
                            <button className="button-primary">Proceed to Checkout</button>
                        </StripeCheckout>                     
                    </React.Fragment>
                )}
            </div>
        </section>
    )
}

export default CartItemsContainer;