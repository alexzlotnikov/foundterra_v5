import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost, formatDate } from '@/utils/blogUtils';
import { useLanguage } from '@/hooks/useLanguage';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const { content } = useLanguage();

  return (
    <Card 
      className="group h-full card-elevated hover:scale-105 transition-all duration-300 animate-slide-up overflow-hidden mx-auto max-w-sm md:max-w-none"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {post.coverImage && (
        <div className="relative aspect-video overflow-hidden">
          <img loading="lazy" decoding="async"
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      
      <CardHeader className="space-y-3 p-4 md:p-6">
        <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
          <Calendar className="h-3 w-3 md:h-4 md:w-4" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        
        <h3 className="text-lg md:text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
      </CardHeader>
      
      <CardContent className="space-y-4 p-4 md:p-6 pt-0">
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base line-clamp-3">
          {post.excerpt}
        </p>
        
        <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-sm md:text-base">
          <Link to={`/blog/${post.slug}`}>
            {content.blog?.readMore || 'Read More'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}