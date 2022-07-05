import React, { useState, useCallback } from 'react';

export default function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return [value, handler, setValue];
}
