import { db } from "@/src/prisma/db";
import Link from "next/link";
import { connection } from "next/server";


async function PostsList() {
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts", {cache: "no-store"});
      await connection();
  // await db.connect();
  const posts = await db.orm.public.Post.limit(5).all();

  if (!posts) {
    throw new Error("Не удалось загрузить посты");
  }
  // if (!response.ok) {
  //   throw new Error("Не удалось загрузить посты");
  // }
  
  // const posts = await response.json();
  const postsArray = Array.isArray(posts) ? posts : [];

  return (
    <ul>
      {postsArray.slice(0, 5).map((post: any) => (
        <li key={post.id} className="py-2">
          <Link 
            href={`/posts/${post.id}`}
            className="text-lg font-semibold text-zinc-950 hover:text-zinc-700"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PostsList;