import { useState, useCallback } from 'react';

export default function useInput<T>(initialValue: T = null) {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
}
