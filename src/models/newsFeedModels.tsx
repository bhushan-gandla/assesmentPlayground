export interface NewsModel {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface NewsFeedModel {
  news: NewsModel[];
}