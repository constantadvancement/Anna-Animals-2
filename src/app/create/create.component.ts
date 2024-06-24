import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(private api: ApiServiceService, private router: ActivatedRoute) {}

  readAnimal: any;
  errMsg: any;
  successMsg: any;
  getparamid: any;

  getAlldata() {
    console.log('inside getAll data');
    this.api.getAllAnimals()
      .then((res: any) => {
        console.log('this is res data', res);
        this.readAnimal = res; // Assuming res is an array of animals
        console.log('Received data:', this.readAnimal);
      })
      .catch((error: any) => {
        console.error('Error fetching all animals:', error);
      });
  }

  ngOnInit() {
    this.getAlldata();
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if (this.getparamid) {
      this.api.getSingleData(this.getparamid)
        .then((res: any) => {
          console.log('Selected update data:', res);
          this.animalForm.patchValue({
            id: res.data[0].id,
            name: res.data[0].name,
            description: res.data[0].description,
          });
        })
        .catch((error: any) => {
          console.error('Error fetching single data:', error);
        });
    }
  }

  animalForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    created_At: new FormControl(new Date().toISOString()),
    updated_At: new FormControl(new Date().toISOString()),
  });

  animalSubmit() {
    console.log("update animal function in component??")
    console.log(this.animalForm.value);
    if (this.animalForm.value) {
      const res = this.api.updateData(this.animalForm.value, this.getparamid)
      console.log(res, 'Data Updated Successfully');
      // this.successMsg = res.message;
      this.getAlldata();

    } else {
      this.errMsg = 'All Fields Are Required';
    }
  }

  updateAnimal() {
    console.log("update animal function in component??")
    console.log(this.animalForm.value);
    if (this.animalForm.value) {
      const res = this.api.updateData(this.animalForm.value, this.getparamid)
      console.log(res, 'Data Updated Successfully');
      // this.successMsg = res.message;
      this.getAlldata();

    } else {
      this.errMsg = 'All Fields Are Required';
    }
  }
}
