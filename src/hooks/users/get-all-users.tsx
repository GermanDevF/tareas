import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = ({
  excludeLeaders = false,
}: {
  excludeLeaders?: boolean;
}) => {
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      // Fetch users from the API
      // You can replace this with your actual API endpoint
      const response = await fetch(
        `/api/users?excludeLeaders=${excludeLeaders}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });

  return { users, isLoading, isError, refetch };
};
