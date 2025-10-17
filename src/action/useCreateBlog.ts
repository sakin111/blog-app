import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import baseApi from "@/utils/axios";

export type BlogInput = {
  tags: string[];
  isFeatured: boolean;
  title: string;
  content: string;
  thumbnail?: string;
};

export const useCreateBlog = () => {
  return useMutation({
    mutationFn: async (data: BlogInput) => {
      const res = await baseApi.post("/blog/blogPost", data);
      return res.data;
    },
  });
};


export const BlogPost = async (id: string) => {
  const res = await fetch(`${baseApi}/blog/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog details");
  }

  const data = await res.json();
  return data?.data || data;
};



export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${baseApi}/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog"] }),
  });
};



export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number;[key: number]: number | string, payload: BlogInput }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${data.id}`, {
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





export const fetchBlogs = async (): Promise<BlogInput[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/blogGet`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  const result = await res.json();

  return result?.data?.data || result?.data || [];
};

export const AllBlogs = () => {

  const {
    data: blogs,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  })
  return { blogs, isLoading, isError, refetch }
}