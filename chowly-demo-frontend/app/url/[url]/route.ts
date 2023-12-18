import { redirect } from "next/navigation";
export async function GET(request: Request, { params }: { params: { url: string } }) {
  const res = await fetch(`${process.env.API_URL}/url/${params.url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // Disabling caching to ensure backend is working
    cache: "no-store",
  });

  const data = await res.json();
  if (res.status === 200 && data) {
    return redirect(data.url);
  } else {
    // TODO: Proper not found page
    return new Response("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
