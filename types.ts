
export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  isPro: boolean;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  timestamp: number;
  likes: number;
  comments: number;
  tags: string[];
  prediction?: {
    asset: string;
    direction: 'up' | 'down';
    entryPrice: number;
  };
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  isAi?: boolean;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  history: { time: string; value: number }[];
}

export enum AppTab {
  FEED = 'feed',
  MARKETS = 'markets',
  CHAT = 'chat',
  PROFILE = 'profile'
}
