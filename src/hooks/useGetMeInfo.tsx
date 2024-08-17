import { authQueries } from "@/service/queries";
import { useQuery } from "@tanstack/react-query";

export const useGetMeInfo = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => authQueries.getMe(),
        refetchOnWindowFocus: false,
        retry: 0,
    });
}