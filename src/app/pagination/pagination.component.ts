import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() totalPages: number;
  @Input() currentPage: number;
  @Output() goPage = new EventEmitter<number>();

  onPage(n: number): void {
    this.goPage.emit(n);
  }

  getPagesNumbers(): number[] {
    const pagesNumber: number[] = [];
    const pagesButtonsAmount = Math.min(this.totalPages, 9);
    const firstPageIndex = Math.max(0, this.currentPage - 4);
    const lastPageIndex = Math.min(this.totalPages, firstPageIndex + pagesButtonsAmount);
    for (let i = firstPageIndex; i < lastPageIndex; i++) {
      pagesNumber.push(i);
    }
    return pagesNumber;
  }
}
