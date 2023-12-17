'use client'
import {useState} from 'react'

export default function Url() {
  const [url, setUrl] = useState<string>('')
  const [minifiedUrl, setMinifiedUrl] = useState<string>('')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-full max-w-xs">
            <input onChange={(e) => {setUrl(e.target.value)}} value={url} type="text" name="price" id="price" className="block w-full rounded-md py-1.5 pl-7 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="https://your-url-here" />
            <button onClick={() => fetchMinifiedUrl(url)}>Submit</button>
        </div>
        {minifiedUrl ? (<div className="max-w-sm rounded overflow-hidden shadow-lg"><h1>{minifiedUrl}</h1></div>) : null}
    </main>
  )
}

 const fetchMinifiedUrl = async (url: string) => {
    const response = await fetch(`/url/api`, {method: 'POST', body: JSON.stringify(url)})
    return response
}