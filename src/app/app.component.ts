import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, 
    MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  items: any[] = [];
  showForm: boolean = false;
  newItem = { name: '', description: '' };
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.http.get<any[]>('http://localhost:3000/items').subscribe(
      (data) => {
        this.items = data;
      },
    );
  }

  onSubmit() {
    this.http.post('http://localhost:3000/items', this.newItem).subscribe(
      (response) => {
        console.log('Item added', response);
        this.newItem = { name: '', description: '' };
        this.loadItems();
      },
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      // Clear newItem object when hiding the form
      this.newItem = { name: '', description: '' };
    }
  }
}