import { Dispatch, SetStateAction, useRef, useState } from 'react';

const TOAST_ERROR_ALERT_TIME = 3500;

interface InitialToast {
  initialToastAlert?: boolean
  initialToastMsg?: string
  initialToastColor?: 'red' | 'green'
}

interface Toast {
  toastAlert?: boolean
  toastMsg?: string
  toastColor?: 'red' | 'green'
}

interface setToast {
  setToastAlert: Dispatch<SetStateAction<boolean>>
  setToastMsg: Dispatch<SetStateAction<string>>
  setToastColor: Dispatch<SetStateAction<'red'|'green'>>
}

export type CallToastFunc = ({ callToastColor, callToastMsg }:{callToastColor: 'red'|'green', callToastMsg: string}) => void;
export type HideToastFunc = (callbackAfterHide:(...ars: any[]) => any) => void;
export type ClearToastTimeoutFunc = () => void;

type useToastResult = [CallToastFunc, HideToastFunc, ClearToastTimeoutFunc, Toast, setToast]

function UseToast({ initialToastAlert = false,
  initialToastMsg = '',
  initialToastColor = 'red' }: InitialToast): useToastResult {
  const [toastAlert, setToastAlert] = useState(initialToastAlert);
  const [toastMsg, setToastMsg] = useState(initialToastMsg);
  const [toastColor, setToastColor] = useState(initialToastColor);
  const toastTimeout = useRef(null);

  const callToast = ({ callToastColor, callToastMsg }) => {
    setToastColor(callToastColor);
    setToastMsg(callToastMsg);
    setToastAlert(true);
  };

  const hideToastMsg = (callbackAfterHide = () => {}) => {
    toastTimeout.current = setTimeout(() => {
      setToastAlert(false);
      callbackAfterHide();
    }, TOAST_ERROR_ALERT_TIME);
  };

  const clearToastTimeout = () => {
    if (toastTimeout.current) {
      clearTimeout(toastTimeout.current);
    }
  };

  const toastInfo = { toastAlert, toastMsg, toastColor };
  const setToastInfo = { setToastAlert, setToastMsg, setToastColor };
  return [callToast, hideToastMsg, clearToastTimeout, toastInfo, setToastInfo];
}

export default UseToast;
