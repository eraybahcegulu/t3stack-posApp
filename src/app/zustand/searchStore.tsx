import { create } from 'zustand'

interface SearchState {
    text: string;
    setText: (newText: string) => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
    text: '',
    setText: (newText: string) => set({ text: newText }),
}))