import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import baseApi from "@/utils/axios";

export type BlogInput = {
  tags: string[];
  isFeatured: boolean;
  title: string;
  content: string;
  thumbnail?: string;
};




export const MyProfile = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/about`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog details");
  }

  const data = await res.json();
  return data?.data || data;
};



export const useProfileUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number;[key: number]: number | string, payload: BlogInput }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.payload),
        credentials: "include"
      });

      if (!res.ok) {
        throw new Error(`Failed to update blog (${res.status})`);
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};



