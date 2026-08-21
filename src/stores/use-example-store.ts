import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// --- TYPES ---------------

type State = {
  count: number;
};

type Actions = {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

// --- STATE ---------------

const initialState: State = {
  count: 0,
};

// --- STORE ---------------

const useExampleStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        increment: () =>
          set(
            produce((state) => {
              state.count += 1;
            })
          ),
        decrement: () =>
          set(
            produce((state) => {
              state.count -= 1;
            })
          ),
        reset: () => set(initialState),
      }),
      {
        name: "example-store",
      }
    )
  )
);

export { useExampleStore };
