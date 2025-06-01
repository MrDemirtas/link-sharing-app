"use client";

import { createContext, useCallback, useContext, useState } from "react";

const UserContext = createContext(null);

export default function UserProvider({ children, initialData }) {
  const [userData, setUserData] = useState(initialData);

  const updateProfile = useCallback((newProfileData) => {
    setUserData((prev) => ({
      ...prev,
      ...newProfileData,
    }));
  }, []);

  const updateLinks = useCallback((newLinks) => {
    setUserData((prev) => ({
      ...prev,
      links: newLinks,
    }));
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, updateProfile, updateLinks }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
