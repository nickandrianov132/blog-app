import { db } from "@/src/prisma/db";
import { notFound } from "next/navigation";
import { connection } from "next/server";

type PostPageProps = {
    params: Promise<{ id: string }>
}
const Page = async ({ params }: PostPageProps) => {
    await connection();
    const { id } = await params;
    const post = await db.orm.public.Post.where({id: id}).first();
    // const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // if (response.status === 404) {
    //     notFound();
    // }
    // // Кидаем ошибку если она произошла
    // if (!response.ok) {
    //     throw new Error("Can not get post from server");
    // }
    // const post = await response.json();
    if (!post) {
        notFound();
    }

    // await new Promise((resolve) => setTimeout(resolve, 2000))

    return (
        <article className="space-y-6">
            <div className="space-y-4">
                <h1 className="text-center text-4xl font-semibold text-zinc-950 sm:text-5xl">{post.title}</h1>
                <p className="text-lg leading-8 text-slate-800">{post.content}</p>
            </div>

        </article>
    );
}

export default Page;
