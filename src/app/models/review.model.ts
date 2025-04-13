export interface Review {
    id?: string;
    recipeId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }