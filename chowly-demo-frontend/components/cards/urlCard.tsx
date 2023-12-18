"use-client";
import { useState, useEffect } from "react";
import classnames from "classnames";

const UrlCard = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [url]);

  return (
    <div
      className={classnames("bg-sky-700 max-w-xs rounded overflow-hidden shadow-lg", {
        "blur-lg": !url,
        "cursor-default": !url,
      })}
    >
      <div className='px-10 py-4'>
        <div className='font-bold text-xl mb-2'>Here is your minified url.</div>
        <div className={`bg-gray-900 py-2 max-w-sm rounded overflow-hidden shadow-lg justify-center flex mb-2`}>
          <a
            onClick={(e: React.MouseEvent<HTMLElement>) => copyToClipboard(e, url, setCopied)}
            className='text-xs text-lime-300 hover:text-lime-500 '
            href='#'
          >
            {url}
          </a>
        </div>
        <p className={classnames("text-gray-300 text-sm text-center", { hidden: !copied })}>Copied to clipboard</p>
      </div>
    </div>
  );
};

const copyToClipboard = (e: React.MouseEvent<HTMLElement>, url: string, setCopied: (copied: boolean) => void) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
      })
      .catch((err) => {});
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
    } catch (err) {}
    document.body.removeChild(textarea);
  }
};

export default UrlCard;
