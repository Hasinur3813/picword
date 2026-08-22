"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/redux/store";
import { loadCurrentUser } from "@/redux/features/auth/authThunks";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    // Hydrate user session from cookie / localStorage on mount
    if (storeRef.current) {
      storeRef.current.dispatch(loadCurrentUser());
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
