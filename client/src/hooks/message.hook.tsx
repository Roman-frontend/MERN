import { useCallback } from "react";

export const useMessage = () => {
  return useCallback((text: string) => {
    if ((window as any).M && text) {
      (window as any).M.toast({ html: text });
    }
  }, []);
};
