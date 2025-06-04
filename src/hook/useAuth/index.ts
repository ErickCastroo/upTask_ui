import { useQuery } from "@tanstack/react-query";
import { UserGet } from "@/api/Auth"

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: UserGet,
    retry: 1,
    refetchOnWindowFocus: false,
  })
  return { data, isError, isLoading }
}
