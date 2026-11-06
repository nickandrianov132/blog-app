import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <h2 className="text-3xl font-bold text-zinc-950 mb-2">404</h2>
      <p className="text-lg text-zinc-600 mb-6">
        Requested post not found.
      </p>
      <Link
        href="/posts"
        className="px-4 py-2 bg-zinc-950 text-white hover:bg-zinc-800 rounded transition-colors text-sm font-medium"
      >
        Back to posts
      </Link>
    </div>
  );
}
