export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  const body = await request.json();
  if (!isValidUrl(body)) {
    return new Response("Bad Url", {
      status: 422,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  // TODO: Need to add cancellation token and error handling
  const res = await fetch(`${process.env.API_URL}/url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ redirectUrl: body }),
  });

  const data = await res.json();
  const fullUrl = `${process.env.HOST_URL}/url/${data}`;
  return Response.json(fullUrl);
}

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
