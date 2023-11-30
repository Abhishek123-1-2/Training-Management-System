import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'type-cmp',
  moduleId: module.id,
  templateUrl: './type.component.html',
})
export class TypeComponent implements OnInit {
  training_id: string;
  feedID: any;
  

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.training_id = params['training_id'];
      this.fetchId(this.training_id);
      // Fetch and display feedID for the employee based on this.empCode
      // You might want to create a service to handle data retrieval.
      // Example: this.fetchfeedID(this.empCode);
    });
  }
  fetchId(training_id: string): void {
    // Generate or fetch feedID details based on the empCode
    // You might want to replace this with your actual logic or service call
    this.feedID = this.generateId(training_id);
  }

  generateId(training_id: string): any {
    // Example: Mapping empCodes to specific feedID details
        const MappingId: { [training_id: string]: any } = {
        '1': {
            training_type:'Mandatory',
  course_description:'Spring Boot',
  prerequisites:'Core Java',
  from_time:'1:20',
  to_time:'2:20',
  total_days:'5'
        },
        '2' : {
            training_type:'Optional',
  course_description:'Spring Core',
  prerequisites:'Core Java',
  from_time:'3:20',
  to_time:'4:20',
  total_days:'10'
        },
        '3' : {
            training_type:'Optional',
            course_description:'Spring MVC',
            prerequisites:'Core Java',
            from_time:'6:20',
            to_time:'8:20',
            total_days:'10'
        },
        '4' : {
            training_type:'Optional',
            course_description:'Spring Core',
            prerequisites:'Core Java',
            from_time:'3:20',
            to_time:'4:20',
            total_days:'10'     }
    }
    // Check if there's a specific mapping for the empCode
    const specificId = MappingId[training_id];

    // If a specific mapping is found, return it; otherwise, return a default feedID
    return specificId || this.getDefaultId(training_id);
  }

  getDefaultId(training_id: string): any {
    // Default feedID for empCodes without specific mappings
    return {
        training_type:'Optional',
  course_description:'Microservices',
  prerequisites:'Spring ',
  from_time:'12:30',
  to_time:'1:30',
  total_days:'6'
    };
  }

  // Add a method to fetch feedID based on empCode if needed
  // fetchfeedID(empCode: string): void {
  //   // Implement the logic to fetch feedID
  // }
}
