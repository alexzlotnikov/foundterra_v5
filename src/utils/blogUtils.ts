import generatedPosts from "@/generated/blog-posts.json";

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
  author?: string;
  content: string;
}

// Simple frontmatter parser for browser
const parseFrontmatter = (markdownContent: string) => {
  const lines = markdownContent.split('\n');
  let frontmatterEnd = -1;
  let frontmatterStart = -1;
  
  // Find frontmatter boundaries
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      if (frontmatterStart === -1) {
        frontmatterStart = i;
      } else {
        frontmatterEnd = i;
        break;
      }
    }
  }
  
  if (frontmatterStart === -1 || frontmatterEnd === -1) {
    return { data: {}, content: markdownContent };
  }
  
  // Parse frontmatter
  const frontmatterLines = lines.slice(frontmatterStart + 1, frontmatterEnd);
  const data: Record<string, string> = {};
  
  frontmatterLines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      data[key] = value;
    }
  });
  
  // Get content after frontmatter
  const content = lines.slice(frontmatterEnd + 1).join('\n').trim();
  
  return { data, content };
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  return getPostBySlugSync(slug);
};

export const getPostBySlugSync = (slug: string): BlogPost | null =>
  (generatedPosts as BlogPost[]).find((post) => post.slug === slug) ?? null;

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

// Helper function to get all posts from a manually maintained index
export const getPostsFromIndex = async (): Promise<BlogPost[]> => {
  return getPublishedPosts();
};

export const getPublishedPosts = (): BlogPost[] => generatedPosts as BlogPost[];
