import { Suspense } from "react";
import TransactionSkeleton from "./TransactionSkeleton";
import PostsList from "./components/PostList";
import PostForm from "./components/PostForm";
const Page = async () => {


    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h1 className="text-center text-4xl font-semibold text-zinc-950 sm:text-5xl">
                    Posts
                </h1>
                <PostForm />
                <Suspense fallback={<TransactionSkeleton />}>
                    <PostsList />
                </Suspense>
            </section>
        </div>
    );
}

export default Page;
