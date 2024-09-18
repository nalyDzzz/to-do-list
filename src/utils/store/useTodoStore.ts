import { create } from 'zustand';

interface TodoState {
  checkedItems: number[];
  toggleChecked: (id: number) => void;
  resetChecked: () => void;
}

export const useTodoStore = create<TodoState>()((set) => ({
  checkedItems: [],
  toggleChecked: (id: number) =>
    set((state) => {
      if (state.checkedItems.includes(id)) {
        return {
          checkedItems: state.checkedItems.filter((itemId) => itemId !== id),
        };
      } else {
        return { checkedItems: [...state.checkedItems, id] };
      }
    }),
  resetChecked: () => set({ checkedItems: [] }),
}));
