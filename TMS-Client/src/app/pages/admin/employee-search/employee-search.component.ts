import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    designation: string;
    department: string;
    email_id: string;
    view: string;
    send_email: string; // Add send_email property
  }[];
}

interface TableRow {
  sr_no: string;
  emp_code: string;
  emp_name: string;
  designation: string;
  department: string;
  email_id: string;
  view: string;
  send_email: string; // Add send_email property
}

@Component({
  selector: 'employee-search',
  templateUrl: './employee-search.component.html',
})
export class EmployeeSearchComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;
  public rollPaginator: boolean = false;
  public visiblePages: number[] = [];
  private rollingPaginatorSize = 5;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8083/api/employee-details/all')
      .subscribe(data => {
        this.tableData1 = {
          headerRow: ['Sr No.', 'Employee Code', 'Employee Name', 'Designation', 'Department', 'Email ID', 'View', 'Send Email'],
          dataRows: data.map((item, index) => ({
            sr_no: (index + 1).toString(),
            emp_code: item.empCode,
            emp_name: item.empName,
            designation: item.designationName,
            department: item.functionName,
            email_id: item.email,
            view: 'View',
            send_email: 'Send Email', // Initialize send_email property
          })),
        };
        this.filteredData = [...this.tableData1.dataRows];
      });
  }

  get pages(): number[] {
    if (this.filteredData.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1;
    this.applyFilter();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateVisiblePages();
    this.applyFilter();
  }
  // viewCourseDetails(empCode: string, empName: string) {
  //   // Construct the child route URL without route parameters
  //   const url = `/employee-search/${empCode}/${empName}/course-details`;
  
  //   // Navigate programmatically to the child route
  //   this.router.navigateByUrl(url);
  // }
  // viewDetails(empCode: string, empName: string) {
  //   this.router.navigate(['/course-details'], {
  //     state: { empCode: empCode, empName: empName }
  //   });
  // }
  viewDetails(empCode: string, empName: string) {
    // Store parameters in local storage
    localStorage.setItem('empCode', empCode);
    localStorage.setItem('empName', empName);
  
    // Navigate to course-details route
    this.router.navigate(['/course-details']);
  }
  updateVisiblePages(): void {
    const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    const halfPaginatorSize = Math.floor(this.rollingPaginatorSize / 2);

    if (totalPages <= this.rollingPaginatorSize) {
      this.visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (this.currentPage <= halfPaginatorSize) {
        this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => i + 1);
      } else if (this.currentPage >= totalPages - halfPaginatorSize) {
        this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => totalPages - this.rollingPaginatorSize + i + 1);
      } else {
        this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => this.currentPage - halfPaginatorSize + i);
      }
    }
  }

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

 
  // sendEmail(username: string, email: string, empName: string) {
  //   const plainPassword = this.generateRandomPassword(8); // Generate a random password of length 8
  
  //   const user = {
  //     username: username,
  //     password: plainPassword,
  //     user_role: 'ROLE_USER'
  //   };
  
  //   this.http.post('http://localhost:8083/api/users', user, { responseType: 'text' }).subscribe(
  //     (response) => {
  //       console.log('User data inserted successfully:', response);
  //       const subject = 'Welcome to Training Request Portal';
      
  //       const body = `
  //       <div style="background-color: #f2f2f2; padding: 20px;">
  //         <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
  //           <h2 style="color: #333333;">Welcome to Training Request Portal</h2>
  //           <p>Dear ${empName},</p>
  //           <p>Welcome aboard! We're excited to have you join us on Training Management System.</p>
  //           <p>Your login credentials are:</p>
  //           <ul>
  //             <li><strong>Username:</strong> ${username}</li>
  //             <li><strong>Password:</strong> ${plainPassword}</li>
  //           </ul>
  //           <p>Please keep these details secure and accessible only to you.</p>
  //           <p>Feel free to explore our platform and let us know if you have any questions or need assistance. We're here to help!</p>
  //           <a href="http://localhost:4200/#/login" style="display: inline-block; background-color: blue; color: white; padding: 10px 20px; text-decoration: none;">Go To The System</a>
  //           <p style="color: red;"><strong>Disclaimer:</strong> This is an auto-generated email. Please do not reply to this email.</p>
  //         </div>
  //       </div>
  //     `;
      
  //       this.http.post('http://localhost:8083/api/send-email', { email: email, subject: subject, body: body }, { responseType: 'text' }).subscribe(() => {
  //         alert('Email sent successfully!');
  //       }, (error) => {
  //         console.error('Error sending email:', error);
  //       });
  //     },
  //     (error) => {
  //       console.error('Error inserting user data:', error);
  //     }
  //   );
  // }
  
  // sendEmail(empCode: string, email: string, empName: string) {
  //   this.http.get<any>('http://localhost:8083/api/employee-details/skill/' + empCode)
  //     .subscribe(skillData => {
  //       let userRole = 'ROLE_USER'; // Default role
  //       if (skillData && skillData.primary_skill_name) {
  //         switch(skillData.primary_skill_name) {
  //           case 'System Administrator':
  //             userRole = 'ROLE_ADMIN';
  //             break;
  //           case 'HR':
  //             userRole = 'ROLE_HR';
  //             break;
  //           case 'Trainer':
  //             userRole = 'ROLE_TRAINER';
  //             break;
  //           // Add more cases as needed
  //           default:
  //             userRole = 'ROLE_USER';
  //             break;
  //         }
  //       }
        
  //       const plainPassword = this.generateRandomPassword(8); // Generate a random password of length 8
  
  //       const user = {
  //         username: empCode,
  //         password: plainPassword,
  //         user_role: userRole
  //       };
  
  //       this.http.post('http://localhost:8083/api/users', user, { responseType: 'text' }).subscribe(
  //         (response) => {
  //           console.log('User data inserted successfully:', response);
  //           const subject = 'Welcome to Training Request Portal';
  
  //           const body = `
  //             <div style="background-color: #f2f2f2; padding: 20px;">
  //               <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
  //                 <h2 style="color: #333333;">Welcome to Training Request Portal</h2>
  //                 <p>Dear ${empName},</p>
  //                 <p>Welcome aboard! We're excited to have you join us on Training Management System.</p>
  //                 <p>Your login credentials are:</p>
  //                 <ul>
  //                   <li><strong>Username:</strong> ${empCode}</li>
  //                   <li><strong>Password:</strong> ${plainPassword}</li>
  //                 </ul>
  //                 <p>Please keep these details secure and accessible only to you.</p>
  //                 <p>Feel free to explore our platform and let us know if you have any questions or need assistance. We're here to help!</p>
  //                 <a href="http://localhost:4200/#/login" style="display: inline-block; background-color: blue; color: white; padding: 10px 20px; text-decoration: none;">Go To The System</a>
  //                 <p style="color: red;"><strong>Disclaimer:</strong> This is an auto-generated email. Please do not reply to this email.</p>
  //               </div>
  //             </div>
  //           `;
  
  //           this.http.post('http://localhost:8083/api/send-email', { email: email, subject: subject, body: body }, { responseType: 'text' }).subscribe(() => {
  //             alert('Email sent successfully!');
  //           }, (error) => {
  //             console.error('Error sending email:', error);
  //           });
  //         },
  //         (error) => {
  //           console.error('Error inserting user data:', error);
  //         }
  //       );
  //     });
  // }
  // sendEmail(empCode: string, email: string, empName: string) {
  //   this.http.get<any>('http://localhost:8083/api/employee-details/skill/' + empCode)
  //     .subscribe(skillData => {
  //       // Check if skillData is valid JSON
  //       if (typeof skillData === 'object' && skillData.primary_skill_name) {
  //         let userRole = 'ROLE_USER'; // Default role
  //         switch(skillData.primary_skill_name) {
  //           case 'System Administrator':
  //             userRole = 'ROLE_ADMIN';
  //             break;
  //           case 'HR':
  //             userRole = 'ROLE_HR';
  //             break;
  //           case 'Trainer':
  //             userRole = 'ROLE_TRAINER';
  //             break;
  //           // Add more cases as needed
  //           default:
  //             userRole = 'ROLE_USER';
  //             break;
  //         }
          
  //         const plainPassword = this.generateRandomPassword(8); // Generate a random password of length 8
  
  //         const user = {
  //           username: empCode,
  //           password: plainPassword,
  //           user_role: userRole
  //         };
  
  //         this.http.post('http://localhost:8083/api/users', user, { responseType: 'text' }).subscribe(
  //           (response) => {
  //             console.log('User data inserted successfully:', response);
  //             const subject = 'Welcome to Training Request Portal';
  
  //             const body = `
  //               <div style="background-color: #f2f2f2; padding: 20px;">
  //                 <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
  //                   <h2 style="color: #333333;">Welcome to Training Request Portal</h2>
  //                   <p>Dear ${empName},</p>
  //                   <p>Welcome aboard! We're excited to have you join us on Training Management System.</p>
  //                   <p>Your login credentials are:</p>
  //                   <ul>
  //                     <li><strong>Username:</strong> ${empCode}</li>
  //                     <li><strong>Password:</strong> ${plainPassword}</li>
  //                   </ul>
  //                   <p>Please keep these details secure and accessible only to you.</p>
  //                   <p>Feel free to explore our platform and let us know if you have any questions or need assistance. We're here to help!</p>
  //                   <a href="http://localhost:4200/#/login" style="display: inline-block; background-color: blue; color: white; padding: 10px 20px; text-decoration: none;">Go To The System</a>
  //                   <p style="color: red;"><strong>Disclaimer:</strong> This is an auto-generated email. Please do not reply to this email.</p>
  //                 </div>
  //               </div>
  //             `;
  
  //             this.http.post('http://localhost:8083/api/send-email', { email: email, subject: subject, body: body }, { responseType: 'text' }).subscribe(() => {
  //               alert('Email sent successfully!');
  //             }, (error) => {
  //               console.error('Error sending email:', error);
  //             });
  //           },
  //           (error) => {
  //             console.error('Error inserting user data:', error);
  //           }
  //         );
  //       } else {
  //         console.error('Invalid skill data:', skillData);
  //       }
  //     }, (error) => {
  //       console.error('Error fetching skill data:', error);
  //     });
  // }
  sendEmail(empCode: string, email: string, empName: string) {
    this.http.get<any>('http://localhost:8083/api/employee-details/skill/' + empCode)
      .subscribe(skillData => {
        // Check if skillData is valid JSON
        if (typeof skillData === 'object' && skillData.primary_skill_name) {
          const userRole = this.getUserRole(skillData.primary_skill_name);
          if (!userRole) {
            console.error('Invalid primary skill:', skillData.primary_skill_name);
            return;
          }
          
          const plainPassword = this.generateRandomPassword(8); // Generate a random password of length 8
  
          const user = {
            username: empCode,
            password: plainPassword,
            user_role: userRole
          };
  
          this.http.post('http://localhost:8083/api/users', user, { responseType: 'text' }).subscribe(
            (response) => {
              console.log('User data inserted successfully:', response);
              const subject = 'Welcome to Training Request Portal';
  
              const body = `
                <div style="background-color: #f2f2f2; padding: 20px;">
                  <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
                    <h2 style="color: #333333;">Welcome to Training Request Portal</h2>
                    <p>Dear ${empName},</p>
                    <p>Welcome aboard! We're excited to have you join us on Training Management System.</p>
                    <p>Your login credentials are:</p>
                    <ul>
                      <li><strong>Username:</strong> ${empCode}</li>
                      <li><strong>Password:</strong> ${plainPassword}</li>
                    </ul>
                    <p>Please keep these details secure and accessible only to you.</p>
                    <p>Feel free to explore our platform and let us know if you have any questions or need assistance. We're here to help!</p>
                    <a href="http://localhost:4200/#/login" style="display: inline-block; background-color: blue; color: white; padding: 10px 20px; text-decoration: none;">Go To The System</a>
                    <p style="color: red;"><strong>Disclaimer:</strong> This is an auto-generated email. Please do not reply to this email.</p>
                  </div>
                </div>
              `;
  
              this.http.post('http://localhost:8083/api/send-email', { email: email, subject: subject, body: body }, { responseType: 'text' }).subscribe(() => {
                alert('Email sent successfully!');
              }, (error) => {
                console.error('Error sending email:', error);
              });
            },
            (error) => {
              console.error('Error inserting user data:', error);
            }
          );
        } else {
          console.error('Invalid skill data:', skillData);
        }
      }, (error) => {
        console.error('Error fetching skill data:', error);
      });
  }
  
  getUserRole(primarySkillName: string): string {
    switch(primarySkillName) {
      case 'System Administrator':
        return 'ROLE_ADMIN';
      case 'HR':
        return 'ROLE_HR';
      case 'Trainer':
        return 'ROLE_TRAINER';
      // Add more cases as needed
      default:
        return 'ROLE_USER';
    }
  }
  
  
  
  
  generateRandomPassword(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }
}
