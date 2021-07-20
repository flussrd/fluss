import { getToken } from "helpers/token";
import { useQuery } from "react-query";
import * as service from "./services";

export function useGetRoles() {
  const query = useQuery("roles", () => {
    const token = getToken();
    return service.getRoles(token);
  });
  return query;
}

