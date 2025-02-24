"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const ConfirmationContext = createContext();

export const ConfirmationProvider = ({ children }) => {
  const [confirmationState, setConfirmationState] = useState({
    isOpen: false,
    msg: "",
    onOk: () => {},
  });

  const showConfirmation = useCallback((msg, onOk) => {
    setConfirmationState({
      isOpen: true,
      msg,
      onOk,
    });
  }, []);

  const handleCancel = () => {
    setConfirmationState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    confirmationState.onOk(); // Call the confirmation action
    setConfirmationState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ConfirmationContext.Provider value={{ showConfirmation }}>
      {children}
      <AlertDialog open={confirmationState.isOpen} onOpenChange={handleCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmationState.msg}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => {
  return useContext(ConfirmationContext);
};
