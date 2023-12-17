import { redirect } from 'next/navigation'
export async function GET(request: Request, { params }: { params: { url: string } }) {

    // console.log(params, 'params')

    console.log(params.url, 'url')
    console.log(`http://chowly-backend-demo:5000/url/${params.url}`, 'Full url')
    const res = await fetch(`http://chowly-backend-demo:5000/url/${params.url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store' 
  })

 
  const data = await res.json()
  console.log(data, 'data')
  if(res.status===200 && data){
    console.log('redirecting')
    return redirect(data.url)
  }
  else {
    console.log('Not found event')
    return new Response('Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  }
      return new Response('Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}