import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public books: any[] = [];
  public userId: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.loadUser();
    this.fetchBooks();
  }

  public loadUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.id) {
      alert("User not found! Please log in.");
      this.router.navigate(['/sign-in']);
      return;
    }
    this.userId = user.id;
  }

  public fetchBooks() {
    this.http.get<any[]>('http://localhost:3000/books').subscribe(data => {
      this.books = data;
    });
  }

  public purchaseBook(bookId: number) {
    this.http.get<any>(`http://localhost:3000/books/${bookId}`).subscribe(book => {
      if (book && !book.owners.includes(this.userId)) {
        book.owners.push(this.userId);
        this.http.put(`http://localhost:3000/books/${book.id}`, book).subscribe(() => {
          alert("Book purchased successfully!");
          this.fetchBooks();
        });
      } else {
        alert("You already own this book!");
      }
    });
  }

  public readBook(bookId: number) {
    this.router.navigate(['/read-book', bookId]);
  }

  public signOut() {
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }
}
