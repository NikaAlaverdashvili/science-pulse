export type PostCategory = 'Space' | 'Technology' | 'Health' | 'Environment' | 'Physics' | 'Research';

export interface Post {
  id: string;
  image?: string; // Base64 or URL
  titleKa: string;
  titleEn: string;
  shortDescKa: string;
  shortDescEn: string;
  contentKa: string;
  contentEn: string;
  category: PostCategory;
  authorId: string;
  authorName: string;
  createdAt: string;
  likes: string[]; // user IDs
  dislikes: string[]; // user IDs
}
