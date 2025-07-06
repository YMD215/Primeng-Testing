import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProductService } from './service/productservice';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TableModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent {
  title = 'Primeng-Testing';
  products: any[] = [];

  private messageService = inject(MessageService);

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.showError('Test error message');
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  }

  showError(details: string | string[] | undefined) {
    if (!details) return;

    if (Array.isArray(details)) {
      details.forEach((detail) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: detail,
        });
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: details,
      });
    }
  }
  showMsg(){
    console.log('show msg')
    this.showError('error ya basha')
  }
}
