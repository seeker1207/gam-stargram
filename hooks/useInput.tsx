import { useState, useCallback, ChangeEventHandler } from 'react';

export default function useInput(initialValue: string) : [string, ChangeEventHandler, Function] {
  const [value, setValue] = useState(initialValue);

  const handler: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return [value, handler, setValue];
}
