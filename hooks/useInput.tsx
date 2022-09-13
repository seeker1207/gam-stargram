import React, { useState, useCallback, ChangeEventHandler } from 'react';

export default function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const handler: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return [value, handler, setValue];
}
