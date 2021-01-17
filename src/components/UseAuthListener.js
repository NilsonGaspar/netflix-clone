import { useState, useEffect } from "react";
import { auth } from "../Firebase";
import HandleRequests from "../HandleRequests";

export default function UseAuthListener() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => listener();
  }, []);

  return { user };
}
