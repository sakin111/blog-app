import {  useQuery,} from "@tanstack/react-query";


export type BlogInput = {
  tags: string[];
  isFeatured: boolean;
  title: string;
  content: string;
  thumbnail?: string;
};


interface Profile {
  name?: string | null;
  email: string;
  bio?: string | null;
  profileUrl?: string | null;
  location?: string | null;
  skills?: string[];
  experience?: object | null;
  socialLinks?: Record<string, string> | null;
}

export const MyProfile = () => {
  const { data, isLoading } = useQuery({
  queryKey: [],
  queryFn: async (): Promise<Profile | null> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/about`, {  
    });
    const json = await res.json();
    return json.data;
  },
  staleTime: 0,
  retry: false,
  initialData: null
  });
 return {data, isLoading}
};









