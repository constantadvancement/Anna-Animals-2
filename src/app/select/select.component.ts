import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'], // Correct property name
})
export class SelectComponent implements OnInit {
  readAnimal: any[] = [];
  selectedAnimalDescription: string | undefined;

  constructor(private router: Router, private api: ApiServiceService) {}

  ngOnInit(): void {
    this.getAlldata();
  }

  getAlldata(): void {
    console.log('inside getAll data');
    this.api.getAllAnimals()
      .then((res: any) => {
        console.log('this is res data', res);
        this.readAnimal = res || []; // Initialize with empty array if res is falsy
        console.log('Received data:', this.readAnimal);
      })
      .catch((error: any) => {
        console.error('Error fetching all animals:', error);
      });
  }

  onAnimalSelected(selectedId: string): void {
    console.log('Selected animal ID:', selectedId);

    if (selectedId !== '0') {
      this.api.getDescription(selectedId)
        .then((res: any) => {
          if (res && res.data && res.data.length > 0) {
            this.selectedAnimalDescription = res.data[0].description;
          } else {
            this.selectedAnimalDescription = 'Animal description not found';
          }
        })
        .catch((error: any) => {
          console.error('Error fetching animal description:', error);
          this.selectedAnimalDescription = 'Error fetching description';
        });
    } else {
      this.selectedAnimalDescription = '';
    }
  }
}
