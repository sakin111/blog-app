import { useMutation } from "@tanstack/react-query";
import baseApi from "@/utils/axios";

interface BlogInput {
  title: string;
  content: string;
  thumbnail: string;
  tags?: string;
  isFeatured: "true" | "false";
}

export const useCreateBlog = () => {
  return useMutation({
    mutationFn: async (data: BlogInput) => {
      const res = await baseApi.post("/blog", data);
      return res.data;
    },
  });
};
