import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    quantity?: number;
}

interface CartState {
    products: Product[];
    subTotal: number;
    vat: number;
}

const initialState = {
    products: [],
    subTotal: 0,
    vat: 10,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState as CartState,

    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingProduct = state.products.find((p) => p.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity = existingProduct.quantity ? existingProduct.quantity + 1 : 1;
                state.subTotal += action.payload.price;
            } else {
                const newProduct = { ...action.payload, quantity: 1 };
                state.products.push(newProduct);
                state.subTotal += action.payload.price;
            }
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            const productIdToRemove = action.payload.id;
            state.products = state.products.filter((p) => p.id !== productIdToRemove);
            const removedProduct = state.products.find((p) => p.id === productIdToRemove);
            if (removedProduct) {
                state.subTotal -= removedProduct.price * removedProduct.quantity!;
            }
        },
        increaseQuantity: (state, action: PayloadAction<Product>) => {
            const product = state.products.find((p) => p.id === action.payload.id);
            if (product?.quantity !== undefined) {
                product.quantity += 1;
                state.subTotal += product.price;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<Product>) => {
            const product = state.products.find((p) => p.id === action.payload.id);
            if (product?.quantity) {
                if (product.quantity > 1) {
                    product.quantity -= 1;
                    if (product.price) {
                        state.subTotal -= product.price;
                    }
                } else {
                    state.products = state.products.filter((p) => p.id !== action.payload.id);
                    if (product.price) {
                        state.subTotal -= product.price;
                    }
                }
            }
        },
        clearCart: (state) => {
            state.products = initialState.products;
            state.subTotal = initialState.subTotal;
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;