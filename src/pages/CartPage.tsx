import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";


function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity } = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container">
            <h2>Your Cart</h2>
            <div>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul className="list-group">
                        {cart.map((item: CartItem) => (
                            <li key={item.bookID} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{item.title}</h5>
                                    <p className="mb-1">Price: ${(item.price * item.quantity).toFixed(2)}</p>
                                    <p className="mb-0">Quantity: {item.quantity}</p>
                                </div>
                                <div>
                                    <button 
                                        className="btn btn-outline-primary btn-sm me-2"
                                        onClick={() => updateQuantity(item.bookID, item.quantity - 1)}
                                        disabled={item.quantity === 1}
                                    >
                                        -
                                    </button>
                                    <button 
                                        className="btn btn-outline-primary btn-sm me-2"
                                        onClick={() => updateQuantity(item.bookID, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeFromCart(item.bookID)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h4 className="mt-3">Total: ${totalAmount.toFixed(2)}</h4>
            <button className="btn btn-primary">Checkout</button>
            <button className="btn btn-secondary ms-3" onClick={() => navigate('/books')}>Continue Shopping</button>   
    </div>
);
}

export default CartPage;
