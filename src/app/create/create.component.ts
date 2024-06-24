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
    console.log('inside getAlldata()');
    this.api
      .getAllAnimals()
      .then((res: any) => {
        console.log('this is res data', res);
        this.readAnimal = res.data; // Assuming res is an array of animals
        console.log('Data output:', this.readAnimal);
      })
      .catch((error: any) => {
        console.error('Error fetching all animals:', error);
      });
  }

  ngOnInit() {
    this.getAlldata();

    this.router.paramMap.subscribe(params => {
      this.getparamid = params.get('id');
      if (!this.getparamid) {
        console.error('ID parameter is null or undefined.');
        // Handle this scenario accordingly, e.g., redirect to a default route or display an error message.
      } else {
        console.log(this.getparamid, 'mini subscribe get paramsid');
      }
    });
    console.log("trying to get id of parameter", this.router.snapshot.paramMap.get('id'))
    this.getparamid = this.router.snapshot.paramMap.get('id');
    console.log('getparamid:', this.getparamid);
    if (this.getparamid) {
      this.api
        .getSingleData(this.getparamid)
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
    console.log('COME ON HELL WHERE ARE YOU');
    console.log(this.animalForm.value);

    if (this.animalForm.value) {
      console.log(this.animalForm.value);
      const res = this.api.createAnimal(this.animalForm.value);
      console.log(res, 'Data Added Successfully');
      this.animalForm.reset();
      // this.successMsg = res.message;
      this.getAlldata();
    } else {
      this.errMsg = 'All Fields Are Required';
    }
  }

  updateAnimal() {
    console.log('update animal function in component??');
    console.log(this.animalForm.value);
    if (this.animalForm.value) {
      const res = this.api.updateData(this.animalForm.value, this.getparamid);
      console.log(res, 'Data Updated Successfully');
      // this.successMsg = res.message;
      this.getAlldata();
    } else {
      this.errMsg = 'All Fields Are Required';
    }
  }
}
