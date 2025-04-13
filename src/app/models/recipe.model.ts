export interface Recipe {
    id?: string;
    name: string;
    description: string;
    preparationTime: number;
    cookingTime: number;
    servings: number;
    difficulty: 'easy' | 'medium' | 'hard';
    imageUrl?: string;
    userId: string;
    categoryId: string;
    ingredients: string[];
    instructions: string[];
    createdAt: Date;
    updatedAt: Date;
  }