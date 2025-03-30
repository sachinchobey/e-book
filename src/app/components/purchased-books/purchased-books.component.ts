import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchased-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchased-books.component.html',
  styleUrls: ['./purchased-books.component.scss']
})
export class PurchasedBooksComponent {
  public purchasedBooks: any[] = [];
  public userId: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.loadPurchasedBooks();
  }

  public loadPurchasedBooks() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.id) {
      alert("User not found! Please log in.");
      return;
    }

    this.userId = user.id;

    this.http.get<any[]>('http://localhost:3000/books').subscribe(books => {
      this.purchasedBooks = books.filter(book => book.owners.includes(this.userId));
    });
  }

  public readBook(bookId: number) {
    this.router.navigate(['/read-book', bookId]);
  }
}
