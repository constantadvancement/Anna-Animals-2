import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'], // Correct property name
})
export class UpdateComponent implements OnInit {
  readAnimal!: any[];
  successMsg: string | null = null; // Initialize successMsg with null or appropriate initial value

  constructor(private router: Router, private api: ApiServiceService) {}

  ngOnInit(): void {
    this.getAlldata();
  }

  deleteId(id: any): void {
    console.log('Deleting animal with ID:', id);
    this.api.deleteData(id)
      .then((res: any) => {
        console.log('Deleted animal successfully:', res);
        this.successMsg = 'Animal deleted successfully'; // Example success message
        this.getAlldata(); // Refresh data after deletion
      })
      .catch((error: any) => {
        console.error('Error deleting animal:', error);
        // Handle error, show user-friendly message if needed
        // For example:
        // this.errorMsg = 'Failed to delete animal.';
      });
  }

  getAlldata(): void {
    console.log('inside getAll data');
    this.api.getAllAnimals()
      .then((res: any) => {
        console.log('this is res data', res);
        this.readAnimal = res.data; // Assuming res is an array of animals
        console.log('Received data:', this.readAnimal);
      })
      .catch((error: any) => {
        console.error('Error fetching all animals:', error);
      });
  }
}
