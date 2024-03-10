import { create } from 'zustand'

interface SearchState {
    categoryId: string;
    setCategoryId: (newCategoryId: string) => void;
}

export const useCategoryStore = create<SearchState>()((set) => ({
    categoryId: '',
    setCategoryId: (newCategoryId: string) => set({ categoryId: newCategoryId }),
}))