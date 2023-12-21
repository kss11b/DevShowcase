import Link from "next/link";
import MusicCardContextManager from "@/components/contextManagers/musicCardContextManager";

export default function Tone() {
  return (
    <>
      {/* FIXME: Home link needs to live a layer above this */}
      <Link href='/' className='absolute top-0 left-0 m-4 text-lime-400 hover:text-lime-700'>
        Home
      </Link>
      <main className='flex min-h-screen flex-col items-center justify-center p-24'>
        <MusicCardContextManager />
        {/* <MusicCard context={context} key={generateGUID()} />
        <MusicCard context={context} key={generateGUID()} /> */}
      </main>
    </>
  );
}
