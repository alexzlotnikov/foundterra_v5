import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import RelatedServices from "@/components/RelatedServices";
import { getPostsFromIndex, BlogPost } from '@/utils/blogUtils';
import BlogCard from '@/components/BlogCard';
import { Loader2 } from 'lucide-react';

export default function Blog() {
  const { content, language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getPostsFromIndex();
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error('Error loading posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Keep blog content LTR regardless of language
  useEffect(() => {
    document.documentElement.dir = 'ltr';
    return () => {
      // Reset to language-based direction when leaving blog
      document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    };
  }, [language]);


  const blogTitle = content.blog?.title || 'Blog';
  const blogDescription = content.blog?.description || 'Read our latest articles and insights';

  return (
    <>
      <Helmet>
        <title>Startup Fundraising & Pitch Deck Blog | Foundterra</title>
        <meta name="description" content={blogDescription} />
        <meta property="og:title" content={`${blogTitle} | ${content.meta.title}`} />
        <meta property="og:description" content={blogDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.foundterra.com/blog" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Header />
        
        <main className="container mx-auto px-4 py-8 md:py-16 mt-16 md:mt-20">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent px-4">
              {blogTitle}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              {blogDescription}
            </p>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-12 md:py-16">
              <Loader2 className="h-6 w-6 md:h-8 md:w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground text-sm md:text-base">
                {content.blog?.loading || 'Loading posts...'}
              </span>
            </div>
          ) : error ? (
            <div className="text-center py-12 md:py-16 px-4">
              <p className="text-destructive text-base md:text-lg">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 md:py-16 px-4">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                {content.blog?.noPosts || 'No posts yet'}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                {content.blog?.noPostsMessage || 'Check back soon for new content!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
              {posts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          )}
        </main>
        <RelatedServices />
      </div>
    </>
  );
}