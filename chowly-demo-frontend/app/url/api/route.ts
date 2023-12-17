// Forwarding requests as an extra layer of obfuscation
export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
    const body = await request.json();
    console.log(body, 'request body')
    const res = await fetch(`http://chowly-backend-demo:5000/url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({redirectUrl: body})
  })
 
  const data = await res.json()
 
  return Response.json(data)
}