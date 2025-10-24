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
