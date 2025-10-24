import {  useQuery,} from "@tanstack/react-query";
import { cookies } from "next/headers";


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


 export async function getUser() {
  try {
    const cookieStore = cookies();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      if ([401, 403, 404].includes(res.status)) {
        return null;
      }
      throw new Error(`Failed to fetch user: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching user:", err);
    throw new Error("Network or API error occurred.");
  }
}







