import Image from 'next/image';
import Link from 'next/link';


const Header = () => {
    return (
        <header className="flex h-14 items-center justify-between border-b border-slate-500/50 px-4 sm:px-6 py-2 sm:py-4">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <Image 
              src="https://bqezaqgwkajiuqvwsuye.supabase.co/storage/v1/object/public/forum-media/avatars/mu_online_logo.png" 
              className="w-auto h-auto aspect-auto"
              alt="" 
              width={64} 
              height={64} 
              priority
            />
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-zinc-600">
            <Link href="/" className="hover:text-zinc-900">Home</Link>
            <Link href="/posts" className="hover:text-zinc-900">Posts</Link>
            <Link href="/signup" className="hover:text-zinc-900">SignUp</Link>
          </nav>
        </header>
    );
}

export default Header;
