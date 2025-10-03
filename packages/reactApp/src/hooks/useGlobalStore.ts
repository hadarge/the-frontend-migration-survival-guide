import { useEffect, useState } from "react";

type SetState<T> = (partial: Partial<T>) => void;

export function createGlobalStore<T extends object>(initialState: T) {
    let globalState = { ...initialState };
    const listeners = new Set<(state: T) => void>();

    function useGlobalStore(): [T, SetState<T>] {
        const [, setLocalState] = useState<T>(globalState);

        useEffect(() => {
            const listener = (newState: T) => setLocalState({ ...newState });
            listeners.add(listener);

            // ✅ cleanup properly typed
            return () => {
                listeners.delete(listener);
            };
        }, []);

        const setState: SetState<T> = (partial) => {
            globalState = { ...globalState, ...partial };
            listeners.forEach((listener) => listener(globalState));
        };

        return [globalState, setState];
    }

    return useGlobalStore;
}

type Store = {
    counter: number;
    theme: "light" | "dark";
};

export const useGlobalStore = createGlobalStore<Store>({
    counter: 0,
    theme: "light",
});
