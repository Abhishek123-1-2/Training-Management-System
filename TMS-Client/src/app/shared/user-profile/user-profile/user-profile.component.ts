// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.scss'],
// })
// export class UserProfileComponent implements OnInit {
//   employeeName: string;
//   joiningDate: string;
//   mobileNo: string;
//   email: string;
//   designationName: string;
//   reportingManagerName: string;
//   employeeCode: string;
//   userProfileImage: string;

//   constructor() {}

//   // ngOnInit(): void {
//   //   const userData = JSON.parse(localStorage.getItem('loggedInUserData')) || {};
//   //   this.employeeName = userData.employeeName || '';
//   //   this.joiningDate = userData.joiningDate || '';
//   //   this.mobileNo = userData.mobileNo || '';
//   //   this.email = userData.email || '';
//   //   this.designationName = userData.designation || '';
//   //   this.reportingManagerName = userData.reportingManager || '';
//   //   this.employeeCode = userData.empCode || '';
//   //   this.userProfileImage = userData.profileImage || '';
//   // }
//   ngOnInit(): void {
//     const userData = JSON.parse(localStorage.getItem('loggedInUserData')) || {};
//     this.employeeName = userData.employeeName || '';
//     this.joiningDate = userData.joiningDate || '';
//     this.mobileNo = userData.mobileNo || '';
//     this.email = userData.email || '';
//     this.designationName = userData.designation || '';
//     this.reportingManagerName = userData.reportingManager || '';
//     this.employeeCode = userData.empCode || '';
//     this.userProfileImage = localStorage.getItem('userProfileImage') || ''; // Corrected key
//   }
  

//   get animatedEmployeeName(): string {
//     let animatedName = '';
//     for (let i = 0; i < this.employeeName.length; i++) {
//       animatedName += `<span style="display: inline-block; animation: fadeIn 0.5s ease ${i * 0.3}s both;">${this.employeeName[i]}</span>`;
//     }
//     return animatedName;
//   }

//   onFileSelected(event): void {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.userProfileImage = reader.result as string;
//         // Store the image data URL in localStorage
//         localStorage.setItem('userProfileImage', this.userProfileImage);
//       };
//       reader.readAsDataURL(file);
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  employeeName: string;
  joiningDate: string;
  mobileNo: string;
  email: string;
  designationName: string;
  reportingManagerName: string;
  employeeCode: string;
  userProfileImage: string;

  constructor() {}

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('loggedInUserData')) || {};
    this.employeeName = userData.employeeName || '';
    this.joiningDate = userData.joiningDate || '';
    this.mobileNo = userData.mobileNo || '';
    this.email = userData.email || '';
    this.designationName = userData.designation || '';
    this.reportingManagerName = userData.reportingManager || '';
    this.employeeCode = userData.empCode || '';
    this.userProfileImage = localStorage.getItem(`userProfileImage_${this.employeeCode}`) || '';
  }

  get animatedEmployeeName(): string {
    let animatedName = '';
    for (let i = 0; i < this.employeeName.length; i++) {
      animatedName += `<span style="display: inline-block; animation: fadeIn 0.5s ease ${i * 0.3}s both;">${this.employeeName[i]}</span>`;
    }
    return animatedName;
  }

  onFileSelected(event): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userProfileImage = reader.result as string;
        // Store the image data URL in localStorage with a unique key for each user
        localStorage.setItem(`userProfileImage_${this.employeeCode}`, this.userProfileImage);
      };
      reader.readAsDataURL(file);
    }
  }
}

