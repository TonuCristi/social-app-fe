import { useEffect, useState } from "react";

import { User } from "../lib/types";
import { AuthApi } from "../api/AuthApi";
import { mapUser } from "../utils/mapUser";

export function useUser(id: string) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    AuthApi.getUserById(id).then((res) => {
      const user = mapUser(res);
      setUser(user);
    });
  }, [id]);

  return user;
}
