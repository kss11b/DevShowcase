"use client";
import { useState } from "react";
import UrlCard from "@/components/cards/urlCard";

export default function Url() {
  const [url, setUrl] = useState<string>("");
  const [minifiedUrl, setMinifiedUrl] = useState<string>("");
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <div className='w-full max-w-xs'>
        <form className='bg-gray-700 shadow-md rounded px-8 pt-6 pb-6 mb-8'>
          <div className='font-bold text-xl mb-2'>Minify your address.</div>
          <input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            className='mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='add-url'
            type='text'
            placeholder='https://your-url-here'
          ></input>
          <button
            onClick={() => fetchMinifiedUrl(url, setMinifiedUrl)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
          >
            Submit
          </button>
        </form>
      </div>
      <UrlCard url={minifiedUrl} />
    </main>
  );
}

const fetchMinifiedUrl = async (url: string, setMinifiedUrl: (minifiedUrl: string) => void) => {
  const response = await fetch(`/url/api`, { method: "POST", body: JSON.stringify(url) });
  const data = await response.json();
  console.log(data, "response");
  setMinifiedUrl(data);
  return data;
};
