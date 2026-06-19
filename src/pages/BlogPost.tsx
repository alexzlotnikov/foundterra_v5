import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import { getPostBySlug, type BlogPost as BlogPostType, formatDate } from "@/utils/blogUtils";
import { Loader2, ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const fetchedPost = await getPostBySlug(slug);
      setPost(fetchedPost);
      setLoading(false);
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Header />
        <main className="container mx-auto px-4 py-16 mt-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Header />
        <main className="container mx-auto px-4 py-16 mt-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-6">The blog post you requested could not be loaded.</p>
          <Link to="/blog" className="text-primary hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </main>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Foundterra Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Foundterra Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://www.foundterra.com/blog/${post.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Header />

        <main className="container mx-auto px-4 py-12 md:py-16 mt-16 md:mt-20 max-w-4xl">
          <Link to="/blog" className="text-primary hover:underline inline-flex items-center gap-2 mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
              <p className="text-muted-foreground">{formatDate(post.date)}</p>
            </header>

            <div className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:text-foreground prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:text-base md:prose-p:text-lg prose-p:leading-8 prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-ul:my-5 prose-li:my-1.5 prose-ol:my-5 prose-blockquote:border-primary prose-blockquote:text-foreground prose-table:text-sm md:prose-table:text-base">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
