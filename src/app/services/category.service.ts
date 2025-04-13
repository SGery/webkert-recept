// TODO

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    {
      id: '1',
      name: 'Breakfast',
      description: 'Morning meals to start your day',
      imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f10a081a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '2',
      name: 'Main Dishes',
      description: 'Hearty and satisfying meals',
      imageUrl: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '3',
      name: 'Desserts',
      description: 'Sweet treats and indulgences',
      imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  private categoriesSubject = new BehaviorSubject<Category[]>(this.categories);

  constructor() {}

  getCategories(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  getCategoryById(id: string): Observable<Category> {
    const category = this.categories.find(c => c.id === id);
    return new BehaviorSubject<Category>(category || { id: '0', name: 'Unknown Category' }).asObservable();
  }

  createCategory(category: Category): Promise<string> {
    const newId = Date.now().toString();
    const newCategory = {
      ...category,
      id: newId
    };
    
    this.categories.push(newCategory);
    this.categoriesSubject.next([...this.categories]);
    
    return Promise.resolve(newId);
  }

  updateCategory(id: string, data: Partial<Category>): Promise<void> {
    const index = this.categories.findIndex(c => c.id === id);
    if (index !== -1) {
      this.categories[index] = {
        ...this.categories[index],
        ...data
      };
      this.categoriesSubject.next([...this.categories]);
    }
    return Promise.resolve();
  }

  deleteCategory(id: string): Promise<void> {
    this.categories = this.categories.filter(c => c.id !== id);
    this.categoriesSubject.next([...this.categories]);
    return Promise.resolve();
  }
}