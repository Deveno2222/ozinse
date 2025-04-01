import { useGetProfileQuery } from "@/features/users/api/userApi";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const authKey = useSelector((state: RootState) => state.auth.authKey);
  const { data, isFetching, isError } = useGetProfileQuery(undefined, {
    skip: !authKey,
  });

  if (isFetching) return null;
  return !isError 
};
