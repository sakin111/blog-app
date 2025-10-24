

import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;
  return res.json();
}


