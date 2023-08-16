import { Topic } from "./ITopic";

export interface IPost {
  _id?: string;
  category: string | null;
  topic: Topic[];
  title: string;
  summary: string;
  coverPhoto: string;
  isFeatured: boolean;
  content: string;
  status?: string;
  visibility: string;
  relatedArticles?: string[];
}

export interface PostState {
  postItem: {
    category: string;
    topic: Topic[];
    title: string;
    summary: string;
    coverPhoto: string;
    isFeatured: boolean;
    content: string;
    status?: string;
    visibility: string | null;
    relatedArticles: string[];
  };
}
