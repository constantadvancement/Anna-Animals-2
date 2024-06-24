import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private apiUrl = 'http://localhost:3000/api/data';
  private createUrl = 'http://localhost:3000/api/create';

  //getting all animals
  getAllAnimals(): Promise<any[]> {
    // console.log('in getAllAnimals()');
    return fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          console.log('not okay in getAllAnimals()');
          throw new Error('Network response was not ok');
        }

        // console.log(response.json);
        return response.json() as Promise<any[]>; // Define the return type explicitly
      })
      .catch((error) => {
        console.error('Fetch Error:', error);
        throw error;
      });
  }

  //create data
  createAnimal(data: any): Promise<any> {
    console.log('Creating animal:', data);
    return fetch(`${this.createUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response from server:', data);
      return data; // Assuming your backend sends back a response
    })
    .catch(error => {
      console.error('Error creating animal:', error);
      throw error;
    });
  }


  //delete an animal by ID
  deleteData(id: any): Promise<any> {
    let ids = id;
    return fetch(`${this.apiUrl}/delete/${ids}`);
  }

  // update data
  updateData(id: any, data: any): Promise<any> {
    const url = `${this.createUrl}/${id}`;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON response
      })
      .catch((error) => {
        console.error('Error updating animal:', error);
        throw error; // Re-throw the error for handling in the component
      });
  }

  // get single data by id
  getSingleData(id: any): Promise<any> {
    let ids = id;
    return fetch(`${this.apiUrl}/${ids}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Fetch Error:', error);
        throw error;
      });
  }

  //get single data for drescription by id
  async getDescription(id: any): Promise<string> {
    try {
      const response = await fetch(`${this.apiUrl}/descriptions/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch description');
      }
      const data = await response.json();
      if (data && data.data && data.data.length > 0) {
        return data.data[0].description;
      } else {
        throw new Error('Animal description not found');
      }
    } catch (error) {
      console.error('Error fetching animal description:', error);
      throw error;
    }
  }
}
