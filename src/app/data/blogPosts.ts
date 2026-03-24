export interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How Much Does Private Health Insurance Cost in the UK in 2025?",
    subtitle: "How Much Does Private Health Insurance Cost in the UK in 2026?",
    description: "Discover the average UK private health insurance cost, what drives the price and how you can get multiple quotes to secure the best deal.",
    date: "30th October 2025",
    category: "Health Insurance",
    image: "https://images.unsplash.com/photo-1642961597907-fc6fbff01720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ayUyMGNvaW5zJTIwbW9uZXl8ZW58MXx8fHwxNzY4ODM2MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    slug: "private-health-insurance-cost-uk-2025",
  },
  {
    id: 2,
    title: "Best Small Business Health Insurance Providers in the UK",
    subtitle: "Best Small Business Health Insurance in the UK – The Reviews",
    description: "Your essential guide to the best small business health insurance UK. All reviews in one place including Defaqto, Trustpilot, Which? + Expert Broker Insight.",
    date: "3rd September 2025",
    category: "Health Insurance",
    image: "https://images.unsplash.com/photo-1667985805263-5531e05c3689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc21hbiUyMGxhcHRvcCUyMG9mZmljZXxlbnwxfHx8fDE3Njg4MzYyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    slug: "best-small-business-health-insurance-uk",
  },
  {
    id: 3,
    title: "Guide to business health insurance renewals in the UK",
    subtitle: "Guide to Business Health Insurance Renewals in The UK",
    description: "Renewing your business health insurance policy doesn't have to be stressful. With the right support, the renewal period is a great opportunity to improve the cost and cover of your business healthcare.",
    date: "25th July 2025",
    category: "My Health Insurance",
    image: "https://images.unsplash.com/photo-1758518727077-ffb66ffccced?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMGRpc2N1c3Npb258ZW58MXx8fHwxNzY4ODM2MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    slug: "business-health-insurance-renewals-uk",
  },
];

// Function to add a new blog post
export function addBlogPost(post: Omit<BlogPost, 'id'>): BlogPost {
  const newPost: BlogPost = {
    ...post,
    id: blogPosts.length + 1,
  };
  blogPosts.push(newPost);
  return newPost;
}

// Function to get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

// Function to get a blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}
