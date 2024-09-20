import { create } from 'zustand';

export type checkedItem = {
  id: number;
  previousCompleted: boolean;
}

interface TodoState {
  checkedItems: checkedItem[];
  toggleChecked: (id: number, bool: boolean) => void;
  resetChecked: () => void;
}

export const useTodoStore = create<TodoState>()((set) => ({
  checkedItems: [],
  toggleChecked: (id: number, bool: boolean) =>
    set((state) => {
      const itemIndex = state.checkedItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        return {
          checkedItems: state.checkedItems.filter((item) => item.id !== id),
        };
      } else {
        return {
          checkedItems: [
            ...state.checkedItems,
            { id, previousCompleted: bool },
          ],
        };
      }
    }),
  resetChecked: () => set({ checkedItems: [] }),
}));