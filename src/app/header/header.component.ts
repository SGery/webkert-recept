import { Component, Output, EventEmitter, OnInit, OnDestroy, Inject } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {  Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private authService: AuthService
    ){}

    ngOnInit(){
      this.userSub = this.authService.user.subscribe(
        user => {
          this.isAuthenticated = !!user;
        }
      );
    }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
    this.router.navigate(['/recipes']);
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
