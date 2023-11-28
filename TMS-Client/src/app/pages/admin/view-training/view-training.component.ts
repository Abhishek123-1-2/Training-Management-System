// viewtraining.component.ts

import { Component, OnInit } from '@angular/core';
import { TableFilterService } from '../filtersearch/filterpipe.component';
import { TrainingService } from '../admin-services/training.service';

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

  originalTableData: any[] = [];
  searchText: string = '';

  constructor(
    private tableFilterService: TableFilterService,
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.fetchTableData();
  }

  fetchTableData() {
    this.trainingService.getTrainingData().subscribe(
      (data: any[]) => {
        this.originalTableData = data;
        this.applyFilter();  // Apply filter after data is fetched
      },
      error => {
        console.error('Error fetching training data:', error);
      }
    );
  }

  onSearchInputChange() {
    this.applyFilter();  // Apply filter when the user types in the search box
  }

  applyFilter() {
    if (this.searchText.trim() !== '') {
      this.tableData1.dataRows = this.originalTableData.filter(row =>
        Object.values(row).some(val =>
          val.toString().toLowerCase().includes(this.searchText.toLowerCase())
        )
      );
    } else {
      this.resetTable();
    }
  }

  resetTable() {
    this.searchText = '';
    this.tableData1.dataRows = [...this.originalTableData];
  }
}
