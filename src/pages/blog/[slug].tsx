import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { getBlogPosts } from "@/util";
import type { BlogPost } from "@/types";

type Props = {
  post: BlogPost;
}

export default function BlogPost({ post }: Props) {
  return (
    <article>
      <pre>{JSON.stringify(post, null, 2)}</pre>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <ReactMarkdown>{post.body}</ReactMarkdown>
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getBlogPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getBlogPosts();
  const post = posts.find((p) => p.slug === params?.slug);
  return { props: { post } };
};
