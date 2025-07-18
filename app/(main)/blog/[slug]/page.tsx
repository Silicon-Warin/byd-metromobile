import { notFound } from "next/navigation";
import {
	getBlogPostBySlug,
	getRelatedPosts,
	blogPosts,
} from "@/data/blog-data";
import BlogPostPage from "./blog-post-page";

interface BlogPostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function Page({ params }: BlogPostPageProps) {
	// Next.js 15: params เป็น Promise แล้ว
	const { slug } = await params;

	const post = getBlogPostBySlug(slug);

	if (!post) {
		notFound();
	}

	const relatedPosts = getRelatedPosts(slug);

	return <BlogPostPage post={post} relatedPosts={relatedPosts} />;
}

export async function generateStaticParams() {
	return blogPosts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
	// Next.js 15: params เป็น Promise แล้ว
	const { slug } = await params;

	const post = getBlogPostBySlug(slug);

	if (!post) {
		return {
			title: "Blog Post Not Found",
		};
	}

	return {
		title: `${post.title} | BYD Metromobile Blog`,
		description: post.summary,
		openGraph: {
			title: post.title,
			description: post.summary,
			images: [post.imageUrl],
		},
	};
}
