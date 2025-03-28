import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";


interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookID: number) => void;
    updateQuantity: (bookID: number, newQuantity: number) => void;
    clearCart: () => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children} : {children: ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
          const existingItem = prevCart.find((c) => c.bookID === item.bookID);
          if (existingItem) {
            
            return prevCart.map((c) =>
                c.bookID === item.bookID
                    ? { ...c, quantity: c.quantity + 1 }
                    : c
            );
        } else {
            return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (bookID: number) => {
        setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
    };

    const updateQuantity = (bookID: number, newQuantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.bookID === bookID ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart(() => []);
    };

    return (
        <CartContext.Provider 
        value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
 
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
