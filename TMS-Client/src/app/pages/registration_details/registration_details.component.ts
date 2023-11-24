// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router';

// // @Component({
// //   selector: 'registration-details-cmp',
// //   moduleId: module.id,
// //   templateUrl: './registration_details.component.html',
// // })
// // export class RegistrationDetailsComponent implements OnInit {
// //   regId: string;
// //   registrationDetails: any;

// //   constructor(private route: ActivatedRoute) {}

// //   ngOnInit(): void {
// //     // Get registration ID from the URL
// //     this.route.params.subscribe(params => {
// //       this.regId = params['regId'];
// //       // Fetch and display course details based on this.regId
// //       // You should have a service or some method to fetch details based on regId
// //       this.fetchRegistrationDetails(this.regId);
// //     });
// //   }
// //   // Replace 'any' with the actual type of your registration details
// //   fetchRegistrationDetails(regId: string): void {
// //     // Simulate fetching details from a service
// //     // Replace this with your actual service call
// //     this.registrationDetails = {
// //       reg_id: regId,
// //       emp_code: '3647',
// //       emp_name: 'Yash Vinayak Gavanang',
// //       reg_date: '2023-11-20',
// //       course_name: 'Angular',
// //       schedule_details: 'Wed 17 2023 - Thu 25 2023',
// //       comments: 'Have a basic knowledge about this course but want to learn in deep',
// //       status: 'Confirmed',
// //     };
// //     }
// // }
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'registration-details-cmp',
//   moduleId: module.id,
//   templateUrl: './registration_details.component.html',
// })
// export class RegistrationDetailsComponent implements OnInit {
//   regId: string;
//   empCode: string;
//   registrationDetails: any;

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     // Get registration ID and empCode from the URL
//     this.route.params.subscribe(params => {
//       this.regId = params['regId'];
//       this.empCode = params['empCode'];
//       // Fetch and display course details based on this.regId and this.empCode
//       // You should have a service or some method to fetch details based on regId and empCode
//       this.fetchRegistrationDetails(this.regId, this.empCode);
//     });
//   }

//   // Replace 'any' with the actual type of your registration details
//   fetchRegistrationDetails(regId: string, empCode: string): void {
//     // Simulate fetching details from a service
//     // Replace this with your actual service call
//     this.registrationDetails = this.generateRegistrationDetails(empCode);
//   }

//   generateRegistrationDetails(empCode: string): any {
//     if (!empCode) {
//       // If empCode is undefined, return default registration details
//       return this.getDefaultRegistration('default');
//     }
  
//     // Example: Mapping empCodes to specific registration details
//     const registrationMapping: { [empCode: string]: any } = {
//       '3641': {
//         emp_name: 'John Doe',
//         reg_date: '2023-11-20',
//         course_name: 'Angular',
//         schedule_details: 'Wed 17 2023 - Thu 25 2023',
//         comments: 'Great course experience for empCode 3646',
//         status: 'Confirmed',
//       },
//       // Add more mappings as needed for other empCodes
//     };
  
//     // Check if there's a specific mapping for the empCode
//     const specificRegistration = registrationMapping[empCode];
  
//     // If a specific mapping is found, return it; otherwise, return default registration details
//     return specificRegistration || this.getDefaultRegistration(empCode);
//   }
  
//   getDefaultRegistration(empCode: string): any {
//     // Default registration details for empCodes without specific mappings
//     return {
//       emp_code: empCode,
//       emp_name: `Employee ${empCode}`,
//       reg_date: '2023-11-20',
//       course_name: 'Angular',
//       schedule_details: 'Wed 17 2023 - Thu 25 2023',
//       comments: `Default registration details for empCode ${empCode}`,
//       status: 'Confirmed',
//     };
//   }
  
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'registration-details-cmp',
  moduleId: module.id,
  templateUrl: './registration_details.component.html',
})
export class RegistrationDetailsComponent implements OnInit {
  regId: string;
  empCode: string;
  registrationDetails: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get registration ID and empCode from the URL
    this.route.params.subscribe(params => {
      this.regId = params['regId'];
      this.empCode = params['empCode'];
      // Fetch and display course details based on this.regId and this.empCode
      // You should have a service or some method to fetch details based on regId and empCode
      this.fetchRegistrationDetails(this.regId, this.empCode);
    });
  }
  

  // Replace 'any' with the actual type of your registration details
  fetchRegistrationDetails(regId: string, empCode: string): void {
    // Simulate fetching details from a service
    // Replace this with your actual service call
    this.registrationDetails = this.generateRegistrationDetails(empCode);
  }

  generateRegistrationDetails(empCode: string): any {
    if (!empCode) {
      // If empCode is undefined, return default registration details
      return this.getDefaultRegistration('default');
    }

    // Example: Mapping empCodes to specific registration details
    const registrationMapping: { [empCode: string]: any } = {
      '3641': {
        emp_name: 'John Doe',
        emp_code: '3641',
        reg_date: '2023-11-20',
        course_name: 'Angular',
        schedule_details: 'Wed 17 2023 - Thu 25 2023',
        comments: 'Great course experience for empCode 3641',
        status: 'Confirmed',
      },
      // Add more mappings as needed for other empCodes
    };

    // Check if there's a specific mapping for the empCode
    const specificRegistration = registrationMapping[empCode];

    // If a specific mapping is found, return it; otherwise, return default registration details
    return specificRegistration || this.getDefaultRegistration(empCode);
  }

  getDefaultRegistration(empCode: string): any {
    // Default registration details for empCodes without specific mappings
    return {
      emp_code: empCode,
      emp_name: `Employee ${empCode}`,
      reg_date: '2023-11-20',
      course_name: 'Angular',
      schedule_details: 'Wed 17 2023 - Thu 25 2023',
      comments: `Default registration details for empCode ${empCode}`,
      status: 'Confirmed',
    };
  }
}


