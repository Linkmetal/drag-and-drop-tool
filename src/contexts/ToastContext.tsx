import React, { useEffect } from "react";

import { ToastVariant } from "components/Toast/Toast";

type ToastContext = {
  toastMessage: ToastMessage | null;
  setToastMessage: (toastMessage: ToastMessage | null) => void;
};

export type ToastMessage = {
  variant: ToastVariant;
  title: string;
  description: string;
  delay?: number;
};

const ToastStateContext = React.createContext<ToastContext | undefined>(
  undefined
);

export const ToastMessageProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [toastMessage, setToastMessage] = React.useState<ToastMessage | null>(
    null
  );

  useEffect(() => {
    if (!toastMessage) return;
    setTimeout(() => setToastMessage(null), toastMessage?.delay || 5000);
  }, [toastMessage]);

  return (
    <ToastStateContext.Provider value={{ toastMessage, setToastMessage }}>
      {children}
    </ToastStateContext.Provider>
  );
};

export function useToastMessageContext() {
  const context = React.useContext(ToastStateContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useToastMessageContext must be used within a ToastMessageProvider"
    );
  }
  return context;
}
