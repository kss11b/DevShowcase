export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`http://chowly-backend-demo:5000/url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ redirectUrl: body }),
  });

  const data = await res.json();
  // FIXME: Need to grab host from env var
  const fullUrl = `http://localhost:3000/url/${data}`;
  return Response.json(fullUrl);
}
