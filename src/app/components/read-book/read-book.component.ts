import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.scss']
})
export class ReadBookComponent {
  public book: any;
  public currentPageIndex: number = 0;
  public userId: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.loadBook();
  }

  public loadBook() {
    const bookId = this.route.snapshot.paramMap.get('id');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.id) {
      alert("User not found! Please log in.");
      this.router.navigate(['/']);
      return;
    }

    this.userId = user.id;

    this.http.get<any>(`http://localhost:3000/books/${bookId}`).subscribe(book => {
      if (book && book.owners.includes(this.userId)) {
        this.book = book;
        this.currentPageIndex = Number(localStorage.getItem(`lastReadPage-${bookId}-${this.userId}`)) || 0;
      } else {
        alert("You don't have access to this book!");
        this.router.navigate(['/dashboard']);
      }
    });
  }

  public nextPage() {
    if (this.currentPageIndex < this.book.pages.length - 1) {
      this.currentPageIndex++;
      localStorage.setItem(`lastReadPage-${this.book.id}-${this.userId}`, this.currentPageIndex.toString());
    }
  }

  public prevPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      localStorage.setItem(`lastReadPage-${this.book.id}-${this.userId}`, this.currentPageIndex.toString());
    }
  }
}
