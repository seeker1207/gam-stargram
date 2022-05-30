import React, { useCallback, useState } from 'react';

function UseInput(initialValue = null) {
  const [state, setState] = useState(initialValue);
  const onChange = useCallback((e) => {
    setState(e.target.value);
  }, [state]);
  return [state, onChange, setState];
}

export default UseInput;
