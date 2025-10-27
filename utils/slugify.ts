/**
 * Convert a string to a URL-friendly slug for SEO purposes
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Remove special characters
    .replace(/[^\w\s-]/g, '')
    // Replace spaces with hyphens
    .replace(/[\s_-]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
};

/**
 * Generate article slug from title
 */
export const createArticleSlug = (title: string): string => {
  return slugify(title);
};

/**
 * Find article by slug
 */
export const findArticleBySlug = (articles: any[], slug: string) => {
  return articles.find(article => 
    createArticleSlug(article.title) === slug
  );
};