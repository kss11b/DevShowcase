import { redirect } from "next/navigation";
export async function GET(request: Request, { params }: { params: { url: string } }) {
  // FIXME: Add url validation here
  const res = await fetch(`http://chowly-backend-demo:5000/url/${params.url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();
  if (res.status === 200 && data) {
    return redirect(data.url);
  } else {
    return new Response("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
