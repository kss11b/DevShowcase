"use client";
import { useState, useEffect, useDeferredValue } from "react";
import Link from "next/link";
import UrlCard from "@/components/cards/urlCard";

export default function Url() {
  const [url, setUrl] = useState<string>("");
  const [minifiedUrl, setMinifiedUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const updateFetchData = (newMinifiedUrl: string, newError: string) => {
    setMinifiedUrl(newMinifiedUrl);
    setError(newError);
  };

  return (
    <>
      {/* FIXME: Home link needs to live a layer above this */}
      <Link href='/' className='absolute top-0 left-0 m-4 text-lime-400 hover:text-lime-700'>
        Home
      </Link>
      <main className='flex min-h-screen flex-col items-center justify-center p-24'>
        {error && (
          <div
            className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
            role='alert'
          >
            Error: {error}
          </div>
        )}
        <div className='w-full max-w-xs'>
          {/* FIXME: Use proper event type */}
          <form
            noValidate
            onSubmit={(e: any) => {
              e.preventDefault();
              fetchMinifiedUrl(url, updateFetchData);
            }}
            className='bg-gray-700 shadow-md rounded px-8 pt-6 pb-6 mb-8'
          >
            <div className='font-bold text-xl mb-2'>Minify your address.</div>
            <input
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              // Removed useEffect in favor of resetting values on focus
              onFocus={() => {
                setMinifiedUrl("");
                setError("");
              }}
              className='mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='add-url'
              type='text'
              placeholder='https://your-url-here'
            ></input>
            <button
              onClick={() => fetchMinifiedUrl(url, updateFetchData)}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
            >
              Submit
            </button>
          </form>
        </div>
        <UrlCard url={minifiedUrl} />
      </main>
    </>
  );
}

/**
 * Fetches minified url
 * @param url - Full, non-validated, non-minified url
 * @param setFetchData - Sets result in our component state
 * @returns string - Minified url
 */

let abortController = new AbortController();

const fetchMinifiedUrl = async (url: string, setFetchData: (minifiedUrl: string, error: string) => void) => {
  abortController.abort();
  abortController = new AbortController();

  try {
    const response = await fetch(`/url/api`, {
      method: "POST",
      body: JSON.stringify(url),
      signal: abortController.signal,
    });

    if (!response.ok) {
      if (response.status === 422) {
        throw new Error("Invalid url");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setFetchData(data, "");
    return data;
  } catch (error: any) {
    if (error.name !== "AbortError") {
      console.error("Fetching error:", error);
      setFetchData("", error.message || "An error occurred");
    }
  }
};
