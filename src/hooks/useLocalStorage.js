import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  function storeAndSetValue(valueToStore) {
    valueToStore = valueToStore instanceof Function ? valueToStore(value) : valueToStore;
    localStorage.setItem(key, JSON.stringify(valueToStore));
    setValue(valueToStore);
  }

  return [value, storeAndSetValue];
}

export default useLocalStorage;
