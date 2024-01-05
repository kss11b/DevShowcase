// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='bg-lime-700 max-w-xs rounded overflow-hidden'>
        <div className='px-10 py-4'>
          <Link href='/url' className='text-gray-200 hover:text-gray-300'>
            Tiny URL Demo
          </Link>
        </div>
      </div>
    </main>
  );
}
