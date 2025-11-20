
export interface User {
  id: string;
  username: string;
  avatar: string;
  badge?: 'Admin' | 'Moderator' | 'Contributor' | 'Pro' | 'Gold';
  bio?: string;
  joinDate?: string;
  gearList?: string[];
}

export interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  images?: string[];
}

export interface Thread {
  id: string;
  title: string;
  author: User;
  replies: number;
  views: number;
  category: string;
  lastActivity: string;
  tags: string[];
  isPinned?: boolean;
  isPrivate?: boolean;
  isAdmin?: boolean;
  posts?: Post[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  affiliateLink: string;
  condition?: 'New' | 'Open Box' | 'Used - Excellent' | 'Used - Good';
  seller?: User;
  description?: string;
  specs?: { label: string; value: string }[];
}

export interface ChatMessage {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
  isMe?: boolean;
}

export interface DMConversation {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface Review {
  id: string;
  title: string;
  productName: string;
  image: string;
  rating: number;
  author: User;
  snippet: string;
  category: 'Headphones' | 'DAC/Amp' | 'Speakers' | 'Accessories';
  fullContent?: string;
}

export interface TourImpression {
  id: string;
  author: User;
  content: string;
  date: string;
}

export interface Tour {
  id: string;
  title: string;
  equipmentName: string;
  specs: { label: string; value: string }[];
  description: string;
  host: User;
  startDate: string;
  endDate: string;
  status: 'Open' | 'In Progress' | 'Completed';
  participants: number;
  region: 'North America' | 'Europe' | 'Asia' | 'Global';
  image: string;
  impressions: TourImpression[];
  productId?: string; // Link to product page
}

export type ViewState = 'dashboard' | 'forum' | 'marketplace' | 'chat' | 'tours' | 'profile' | 'reviews' | 'gears' | 'contact' | 'search';