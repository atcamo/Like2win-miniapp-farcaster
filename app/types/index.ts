// Core application types for Like2Win

export interface User {
  id: string;
  address?: string;
  username?: string;
  isConnected: boolean;
  tipAllowance?: boolean;
}

export interface RaffleEntry {
  id: string;
  userId: string;
  raffleId: string;
  tickets: number;
  timestamp: Date;
  engagementType: 'like' | 'like_comment_recast';
}

export interface Raffle {
  id: string;
  startDate: Date;
  endDate: Date;
  prizePool: number;
  totalTickets: number;
  participants: number;
  status: 'upcoming' | 'active' | 'drawing' | 'completed';
  winners?: RaffleWinner[];
}

export interface RaffleWinner {
  position: 1 | 2 | 3;
  userId: string;
  username?: string;
  address?: string;
  prize: number;
  transactionHash?: string;
}

export interface Post {
  id: string;
  text: string;
  likes: number;
  timestamp: string;
  liked: boolean;
  author?: string;
  raffleEligible?: boolean;
}

export interface NotificationSettings {
  raffleReminders: boolean;
  resultAnnouncements: boolean;
  winnerNotifications: boolean;
  systemUpdates: boolean;
}

export interface AppStats {
  totalWinners: number;
  totalDistributed: number;
  activeParticipants: number;
  currentPoolSize: number;
  nextRaffleDate?: Date;
}

export interface SimulationResult {
  position: number;
  prize: number;
  isWinner: boolean;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingState<T = unknown> {
  isLoading: boolean;
  error?: string | null;
  data?: T;
}

// Error types
export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network request failed') {
    super(message, 'NETWORK_ERROR', 500);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class WalletError extends AppError {
  constructor(message: string = 'Wallet operation failed') {
    super(message, 'WALLET_ERROR', 400);
    this.name = 'WalletError';
  }
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// MiniKit specific types
export interface MiniKitContext {
  client?: {
    added: boolean;
    buildId: string;
    host: string;
  };
  user?: {
    fid?: number;
    username?: string;
    displayName?: string;
    pfpUrl?: string;
  };
}

// Animation and UI types
export type AnimationType = 
  | 'fade-in' 
  | 'fade-out' 
  | 'slide-up' 
  | 'slide-down' 
  | 'scale-in' 
  | 'bounce-gentle' 
  | 'pulse-slow' 
  | 'float' 
  | 'glow';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'gradient';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type CardSize = 'sm' | 'md' | 'lg';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}