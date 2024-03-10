/*
import { create } from 'zustand'

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
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    incrementQuantity: (productId: number) => void;
    decrementQuantity: (productId: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    products: [],
    subTotal: 0,
    vat: 10,
    addToCart: (product: Product) => {
        set((state) => {
            const existingProduct = state.products.find((p) => p.id === product.id);
            if (existingProduct) {
                return {
                    ...state,
                    subTotal: state.subTotal + product.price,
                    products: state.products.map((p) =>
                        p.id === product.id ? { ...p, quantity: (p.quantity ?? 0) + 1 } : p
                    ),
                };
            }
            const newProduct = { ...product, quantity: 1 };
            return {
                ...state,
                subTotal: state.subTotal + product.price,
                products: [...state.products, newProduct],
            };
        });
    },

    removeFromCart: (productId: number) =>
        set((state) => ({ products: state.products.filter((p: Product) => p.id !== productId) })),

    incrementQuantity: (productId: number) =>
        set((state) => {
            const updatedProducts = state.products.map((p) =>
                p.id === productId ? { ...p, quantity: p.quantity ? p.quantity + 1 : 1 } : p
            );
            const subTotal = updatedProducts.reduce((acc, curr) => acc + curr.price * (curr.quantity ?? 0), 0);
            return { products: updatedProducts, subTotal };
        }),
        
    decrementQuantity: (productId: number) =>
        set((state) => {
            const updatedProducts = state.products.map((p) =>
                p.id === productId && p.quantity && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
            );
            const subTotal = updatedProducts.reduce((acc, curr) => acc + curr.price * (curr.quantity ?? 0), 0);
            return { products: updatedProducts, subTotal };
        }),

    clearCart: () =>
        set({ products: [], subTotal: 0 }),
}));
*/

/*
export const useCartStore = create<CartState>((set) => {
    const initialProducts = localStorage.getItem('cartProducts');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const products: Product[] = initialProducts ? JSON.parse(initialProducts) : [];

    return {
        products,
        subTotal: 0,
        vat: 10,
        addToCart: (product: Product) => {
            const productWithQuantity = { ...product, quantity: 1 };
            set((state) => {
                const updatedProducts = [...state.products, productWithQuantity];
                localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
                return { products: updatedProducts };
            });
        },

        removeFromCart: (productId: number) =>
            set((state) => {
                const updatedProducts = state.products.filter((p: Product) => p.id !== productId);
                localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
                return { products: updatedProducts };
            }),

        incrementQuantity: (productId: number) =>
            set((state) => ({
                products: state.products.map((p: Product) =>
                    p.id === productId ? { ...p, quantity: p.quantity ? p.quantity + 1 : 1 } : p
                ),
            })),

        decrementQuantity: (productId: number) =>
            set((state) => ({
                products: state.products.map((p: Product) =>
                    p.id === productId && p.quantity && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
                ),
            })),

        clearCart: () =>
            set({ products: [] }),
    };
});


*/