"use-client";
import { useState, useEffect } from "react";
const UrlCard = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [url]);

  return (
    // FIXME: Don't use ternary for this
    <div className={`bg-sky-700 max-w-xs rounded overflow-hidden shadow-lg ${url ? null : "blur-lg"}`}>
      <div className='px-10 py-4'>
        {/* FIXME: Text is highlightable when the card is blurred */}
        <div className='font-bold text-xl mb-2'>Here is your minified url.</div>
        <div className={`bg-gray-900 py-2 max-w-sm rounded overflow-hidden shadow-lg justify-center flex mb-2`}>
          <a
            onClick={(e: any) => copyToClipboard(e, url, setCopied)}
            className='text-xs text-lime-300 hover:text-lime-500 '
            href='#'
          >
            {url}
          </a>
        </div>
        {/* FIXME: Don't use ternary for this */}
        <p className={`text-gray-300 text-sm text-center ${copied ? null : "hidden"}`}>Copied to clipboard</p>
      </div>
    </div>
  );
};

// FIXME: Use proper event type instead of any
const copyToClipboard = (e: any, url: string, setCopied: (copied: boolean) => void) => {
  e.preventDefault();
  navigator.clipboard
    .writeText(url)
    .then(() => {
      setCopied(true);
    })
    .catch((err) => {
      console.error("Error copying text: ", err);
    });
};

export default UrlCard;
