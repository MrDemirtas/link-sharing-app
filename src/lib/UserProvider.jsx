"use client";

import { createContext, useContext, useEffect, useState } from "react";
import getPlatforms, { getLinks } from "./action-links";

const UserContext = createContext(null);

export default function UserProvider({ children }, getProfile) {
  const [userData, setUserData] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    async function getData() {
      const linkData = await getLinks();
      setLinks(linkData);
    }
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
