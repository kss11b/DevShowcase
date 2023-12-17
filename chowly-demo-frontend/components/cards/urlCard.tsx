const UrlCard = ({ url }: { url: string }) => {
  // FIXME: This should be done on the api endpoint
  return (
    // FIXME: Don't use ternary for this
    <div className={`bg-sky-700 max-w-xs rounded overflow-hidden shadow-lg ${url ? null : "blur-lg"}`}>
      <div className='px-10 py-4'>
        <div className='font-bold text-xl mb-2'>Here is your minified url.</div>
        <div className={`bg-gray-900 py-2 max-w-sm rounded overflow-hidden shadow-lg justify-center flex`}>
          <a onClick={(e: any) => copyToClipboard(e, url)} className='text-xs text-lime-300' href='#'>
            {url}
          </a>
        </div>
      </div>
    </div>
  );
};

const copyToClipboard = (e: any, url: string) => {
  e.preventDefault();
  navigator.clipboard
    .writeText(url)
    .then(() => {
      alert(`Copied to clipboard: ${url}`);
    })
    .catch((err) => {
      console.error("Error copying text: ", err);
    });
};

export default UrlCard;
