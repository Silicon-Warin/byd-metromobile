import { notFound } from "next/navigation";
import {
	getBlogPostBySlug,
	getRelatedPosts,
	blogPosts,
} from "@/data/blog-data";
import BlogPostPage from "./blog-post-page";

interface BlogPostPageProps {
	params: {
		slug: string;
	};
}

export default function Page({ params }: BlogPostPageProps) {
	const post = getBlogPostBySlug(params.slug);

	if (!post) {
		notFound();
	}

	const relatedPosts = getRelatedPosts(params.slug);

	return <BlogPostPage post={post} relatedPosts={relatedPosts} />;
}

export function generateStaticParams() {
	return blogPosts.map((post) => ({
		slug: post.slug,
	}));
}

export function generateMetadata({ params }: BlogPostPageProps) {
	const post = getBlogPostBySlug(params.slug);

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
