

export async function getUser() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
   credentials:"include",
   cache:"no-cache"
  });

  if (!res.ok) return null;
  return res.json();
}


