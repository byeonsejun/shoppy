import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccount, addOrUpdateToAccount, } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useAccount() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const accountQuery = useQuery(["account", uid || ""], () => 
  getAccount(uid), { enabled: !!uid, staleTime: 1000 * 60,});

  const addOrUpdateMyAccount = useMutation(
    (account) => addOrUpdateToAccount(uid, account),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["account", uid]);
      },
    }
  );

  return { accountQuery, addOrUpdateMyAccount };
}
