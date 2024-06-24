import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = 'http://localhost:3000/api/data';
  private createUrl = 'http://localhost:3000/api/create';

  //getting all animals
  getAllAnimals(): Promise<any[]> {
    console.log('in getAllAnimals()');
    return fetch(this.apiUrl)
      .then(response => {
        if (!response.ok) {
          console.log('not okay in getAllAnimals()');
          throw new Error('Network response was not ok');
        }
        console.log(response.json);
        return response.json() as Promise<any[]>; // Define the return type explicitly
      })
      .catch(error => {
        console.error('Fetch Error:', error);
        throw error;
      });
  }

  //create data
  createAnimal(data: any): Promise<any> {
    console.log('data created')
    return fetch(`${this.createUrl}`, data)
  }

  //delete an animal by ID
  deleteData(id: any): Promise<any>{
    let ids = id;
    return fetch(`${this.apiUrl}/delete/${ids}`)
  }

  // update data
  updateData(data: any, id: any): Promise<any> {
    let ids = id;
    return fetch(`${this.createUrl}/${ids}`)
  }

  // get single data by id
  getSingleData(id: any): Promise<any> {
    let ids = id;
    return fetch(`${this.apiUrl}/${ids}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch Error:', error);
      throw error;
    });
  }

  //get single data for drescription by id
  getDescription(id: any): Promise<any>{
    let ids = id;
    return fetch(`${this.apiUrl}/descriptions/${ids}`)
  }

}
