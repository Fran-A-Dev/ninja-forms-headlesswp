import Link from "next/link";
import { Suspense } from "react";
import React from "react";
import Loading from "./loading";

interface Post {
  title: string;
  content: string;
  uri: string;
}

async function getPosts(): Promise<Post[]> {
  const query = `
  {
    posts(first: 5) {
      nodes {
        title
        content
        uri
      }
    }
  }
    `;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
      query
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 0,
      },
    }
  );

  const { data } = await res.json();

  return data.posts.nodes;
}

export default async function PostList() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {posts.map((post: Post) => (
          <div
            key={post.uri}
            className="card bg-black/50 border border-yellow-500/20 rounded-lg p-6 hover:border-yellow-500/40 transition-colors"
          >
            <Suspense fallback={<Loading />}>
              <Link href={`/post/${post.uri}`} className="block">
                <h2 className="text-2xl font-bold text-yellow-300 mb-4">
                  {post.title}
                </h2>
                <p
                  className="text-yellow-200/90 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: post.content.slice(0, 200) + "...",
                  }}
                />
              </Link>
            </Suspense>
          </div>
        ))}
      </div>
    </main>
  );
}
