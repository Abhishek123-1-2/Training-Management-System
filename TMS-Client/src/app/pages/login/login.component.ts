// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const usernameValue = this.loginForm.get('username')?.value;
      const passwordValue = this.loginForm.get('password')?.value;

      this.userService.login(usernameValue, passwordValue).subscribe(
        (response: any) => {
          if (response && response.status === 'success') {
            console.log(response);
            console.log('Login success', response);

            // const empId = this.userService.getEmpId();
            const empId = response.empId;
            console.log('EmpId:', empId);

            const specificValue = response.role;
            console.log('Value of yourKey:', specificValue);
            localStorage.setItem("role", specificValue);
            console.log(specificValue);

            switch (specificValue) {
              case 'ROLE_ADMIN':
                this.router.navigate(['/dashboard']);
                break;
              case 'ROLE_USER':
                const empId = response.empId;
                this.router.navigate(['/user-dashboard',empId]);
                break;
              case 'ROLE_MANAGER':
                this.router.navigate(['/manager-dashboard']);
                break;
              case 'ROLE_HR':
                this.router.navigate(['/hr-dashboard']);
                break;
                case 'ROLE_TRAINER':
                this.router.navigate(['/dashboard']);
                break;
              default:
                console.error('Unknown role:', specificValue);
                // Handle the error appropriately, e.g., show an error message to the user
            }
          } else {
            console.error('Login failed', response.message);
            // Handle the error appropriately, e.g., show an error message to the user
          }
        },
        (error) => {
          console.error('Login failed', error);
          // Handle the error appropriately, e.g., show an error message to the user
        }
      );
    }
  }
}
