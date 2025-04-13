export interface UserProfile {
    id?: string;
    userId: string;
    displayName: string;
    email: string;
    photoURL?: string;
    favoriteRecipes: string[];
    createdAt: Date;
  }