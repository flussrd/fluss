import { getToken } from "helpers/token";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as models from "./models";
import * as service from "./services";

export function useGetUsers() {
  const query = useQuery("users", () => {
    const token = getToken();
    return service.getUsers(token);
  });
  return query;
}

export function useGetUserById(userId?: string) {
  const query = useQuery(
    ["users", userId],
    () => {
      const token = getToken();
      return service.getUserById(userId, token);
    },
    {
      enabled: !!userId,
    }
  );

  return query;
}

export function useRegisterUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (userForm: models.UserForm) => {
      const token = getToken();
      return service.registerUser(userForm, token);
    },
    {
      onSuccess: (data) => {
        console.log({ data });
        if (data.status === 200) {
          queryClient.refetchQueries("users");
        }
      },
    }
  );

  return mutation;
}

