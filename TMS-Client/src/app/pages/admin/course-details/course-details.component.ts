import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  emp_code : string;
  completedCourses: any[];

  currentPage = 1;
  itemsPerPage = 5;


  get pages(): number[] {
    if (this.completedCourses.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.completedCourses.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }



  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.emp_code = params['emp_code'];
      this.completedCourses = [
        { id: 1, name: 'Angular', t_name:'John Doe', s_date: '30-11-2023', e_date: '03-12-2023' },
        { id: 2, name: 'Node JS', t_name:'Jane Smith', s_date: '12-10-2023', e_date: '18-10-2023' },
        { id: 3, name: 'Full Stack Web Development', t_name: 'Shaun Marsh', s_date: '02-08-2023', e_date: '10-08-2023' },
      ];
    })
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; // Reset to the first page when changing items per page
  }

  

}
