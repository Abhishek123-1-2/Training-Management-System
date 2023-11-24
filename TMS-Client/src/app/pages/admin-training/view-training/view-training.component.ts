import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Form } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TableFilterService } from '../../../filtersearch/filterpipe.component';



declare interface TableData {
  headerRow: string[];
  dataRows: {
    training_id: number;
    training_category: string;
    training_type: string;
    training_schedule: string;
    course: string;
    trainer_names: string;
    prerequisites: string;
    course_description: string;
    daily_hrs: string;
    total_days: string;
    url: string;
    username: string;
    password: string;

  }[];
}

@Component({
  selector: 'view-training-cmp',
  moduleId: module.id,
  templateUrl: 'view-training.component.html'
})

export class ViewTrainingComponent implements OnInit {

  tableData1: TableData = {
    headerRow: ['Training Id', 'Category', 'Type', 'Schedule', 'Course', 'Trainer Names', 'Prerequisites', 'Description', 'Daily Hrs', 'Total Days', 'URL', 'Username', 'Password'],
    dataRows: []
  };

  originalTableData: any[] = []; // Store the original table data
  searchText: string = '';

  constructor(private tableFilterService: TableFilterService) { }

  ngOnInit() {
    this.fetchTableData(); // Call method to fetch or initialize data

  }

  fetchTableData() {

    this.originalTableData = [
      {
        training_id: 1,
        training_category: 'OPTIONAL',
        training_type: 'ONLINE',
        training_schedule: 'ON-REQUEST',
        course: 'Advanced Angular',
        trainer_names: 'John Doe',
        prerequisites: 'Basic Angular knowledge',
        course_description: 'In-depth study of Angular concepts',
        daily_hrs: '2',
        total_days: '10',
        url: 'https://example.com/advanced-angular',
        username: 'user123',
        password: 'pass123'
      },
      {
        training_id: 2,
        training_category: 'MANDATORY',
        training_type: 'IN-PERSON',
        training_schedule: 'FIXED',
        course: 'Data Science Fundamentals',
        trainer_names: 'Sarah Johnson',
        prerequisites: 'Basic statistics and programming',
        course_description: 'Introduction to data science concepts',
        daily_hrs: '3',
        total_days: '14',
        url: 'https://example.com/data-science-fundamentals',
        username: 'dataStudent',
        password: 'data123'
      },
      {
        training_id: 3,
        training_category: 'OPTIONAL',
        training_type: 'ONLINE',
        training_schedule: 'SELF-PACED',
        course: 'iOS App Development',
        trainer_names: 'Michael Brown',
        prerequisites: 'Basic programming knowledge',
        course_description: 'Creating iOS apps using Swift',
        daily_hrs: '2',
        total_days: '21',
        url: 'https://example.com/ios-app-development',
        username: 'iosStudent',
        password: 'ios456'
      },
      {
        training_id: 4,
        training_category: 'MANDATORY',
        training_type: 'IN-PERSON',
        training_schedule: 'WEEKLY',
        course: 'Cybersecurity Fundamentals',
        trainer_names: 'Alex Miller',
        prerequisites: 'Basic computer knowledge',
        course_description: 'Essential principles of cybersecurity',
        daily_hrs: '2.5',
        total_days: '10',
        url: 'https://example.com/cybersecurity-fundamentals',
        username: 'cyberStudent',
        password: 'cyber789'
      },
      {
        training_id: 5,
        training_category: 'OPTIONAL',
        training_type: 'ONLINE',
        training_schedule: 'ON-DEMAND',
        course: 'Artificial Intelligence Basics',
        trainer_names: 'Sophia Davis',
        prerequisites: 'Fundamental understanding of AI',
        course_description: 'Introduction to AI concepts and applications',
        daily_hrs: '1.5',
        total_days: '12',
        url: 'https://example.com/ai-basics',
        username: 'aiStudent',
        password: 'ai101'
      },
      {
        training_id: 6,
        training_category: 'MANDATORY',
        training_type: 'IN-PERSON',
        training_schedule: 'FIXED',
        course: 'Frontend Web Development',
        trainer_names: 'Emma Wilson',
        prerequisites: 'HTML, CSS, and JavaScript basics',
        course_description: 'Building interactive websites using frontend technologies',
        daily_hrs: '3',
        total_days: '15',
        url: 'https://example.com/frontend-development',
        username: 'webStudent',
        password: 'web123'
      },

    ];
    this.tableData1.dataRows = [
      {
        training_id: 1,
        training_category: 'OPTIONAL',
        training_type: 'ONLINE',
        training_schedule: 'ON-REQUEST',
        course: 'Advanced Angular',
        trainer_names: 'John Doe',
        prerequisites: 'Basic Angular knowledge',
        course_description: 'In-depth study of Angular concepts',
        daily_hrs: '2',
        total_days: '10',
        url: 'https://example.com/advanced-angular',
        username: 'user123',
        password: 'pass123'
      },
      {
        training_id: 2,
        training_category: 'MANDATORY',
        training_type: 'IN-PERSON',
        training_schedule: 'FIXED',
        course: 'Data Science Fundamentals',
        trainer_names: 'Sarah Johnson',
        prerequisites: 'Basic statistics and programming',
        course_description: 'Introduction to data science concepts',
        daily_hrs: '3',
        total_days: '14',
        url: 'https://example.com/data-science-fundamentals',
        username: 'dataStudent',
        password: 'data123'
      },
      {
        training_id: 3,
        training_category: 'OPTIONAL',
        training_type: 'ONLINE',
        training_schedule: 'SELF-PACED',
        course: 'iOS App Development',
        trainer_names: 'Michael Brown',
        prerequisites: 'Basic programming knowledge',
        course_description: 'Creating iOS apps using Swift',
        daily_hrs: '2',
        total_days: '21',
        url: 'https://example.com/ios-app-development',
        username: 'iosStudent',
        password: 'ios456'
      },
      {
        training_id: 4,
        training_category: 'MANDATORY',
        training_type: 'IN-PERSON',
        training_schedule: 'WEEKLY',
        course: 'Cybersecurity Fundamentals',
        trainer_names: 'Alex Miller',
        prerequisites: 'Basic computer knowledge',
        course_description: 'Essential principles of cybersecurity',
        daily_hrs: '2.5',
        total_days: '10',
        url: 'https://example.com/cybersecurity-fundamentals',
        username: 'cyberStudent',
        password: 'cyber789'
      },
      {
        training_id: 5,
        training_category: 'OPTIONAL',
        training_type: 'ONLINE',
        training_schedule: 'ON-DEMAND',
        course: 'Artificial Intelligence Basics',
        trainer_names: 'Sophia Davis',
        prerequisites: 'Fundamental understanding of AI',
        course_description: 'Introduction to AI concepts and applications',
        daily_hrs: '1.5',
        total_days: '12',
        url: 'https://example.com/ai-basics',
        username: 'aiStudent',
        password: 'ai101'
      },
      {
        training_id: 6,
        training_category: 'MANDATORY',
        training_type: 'IN-PERSON',
        training_schedule: 'FIXED',
        course: 'Frontend Web Development',
        trainer_names: 'Emma Wilson',
        prerequisites: 'HTML, CSS, and JavaScript basics',
        course_description: 'Building interactive websites using frontend technologies',
        daily_hrs: '3',
        total_days: '15',
        url: 'https://example.com/frontend-development',
        username: 'webStudent',
        password: 'web123'
      },

    ];
  }

  applyFilter() {
    if (this.searchText.trim() !== '') {
      this.tableData1.dataRows = this.tableFilterService.filterTableData(this.originalTableData, this.searchText);
    } else {
      this.resetTable();
    }
  }

  onSubmit() { }

  onSearchInputChange() {
    if (this.searchText.trim() !== '') {
      this.tableData1.dataRows = this.tableFilterService.filterTableData(this.originalTableData, this.searchText);
    } else {
      this.resetTable();
    }
  }

  resetTable() {
    this.searchText = ''; // Reset search text
    this.tableData1.dataRows = [...this.originalTableData]; // Reset table data to original
  }


}

