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
  readAnimal: any;
  selectedAnimalDescription!: any;

  constructor(private router: Router, private api: ApiServiceService) {}

  ngOnInit(): void {
    this.getAlldata();
  }

  getAlldata(): void {
    console.log('inside getAll data');
    this.api
      .getAllAnimals()
      .then((res: any) => {
        console.log('this is res data', res);
        this.readAnimal = res.data; // Initialize with empty array if res is falsy
        console.log('Received data:', this.readAnimal);
      })
      .catch((error: any) => {
        console.error('Error fetching all animals:', error);
      });
  }

  onAnimalSelected(selectedId: any): void {
    console.log('Selected animal ID:', selectedId);

    if (selectedId < 0){
      this.selectedAnimalDescription = '';

    }

    else if (selectedId !== '0') {
      // Make API call or perform logic based on selectedId
      this.api
        .getDescription(selectedId)
        .then((res: any) => {
          console.log('API Response:', res); // Log entire response for debugging

          // Check if res.data exists and has a length > 0
          if (this.readAnimal.length > 0) {
            console.log('what its grabing', this.readAnimal[selectedId])
            console.log('Inside if statement:', this.readAnimal[selectedId].description);
            this.selectedAnimalDescription = this.readAnimal[selectedId].description;
          } else {
            console.log('No data found in response.');
            this.selectedAnimalDescription = 'Animal description not found';
          }
        })
        .catch((error: any) => {
          console.error('Error fetching animal description:', error);
          this.selectedAnimalDescription = 'Error fetching description';
        });
    } else {
      this.selectedAnimalDescription = this.readAnimal[0].description;

    }
  }
}
