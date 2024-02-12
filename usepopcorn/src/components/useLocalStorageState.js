import { useState, useEffect } from "react";

export function useLocalStorageState(intialState, key) {
    // we can use the initial state to pass the
    // local storage in the state of watched always pass it with function
    const [value, setValue] = useState(function () {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : intialState;
    });
    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(value));
        },
        [value, key]
    );

    return [value, setValue];
}
