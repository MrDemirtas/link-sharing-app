"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
