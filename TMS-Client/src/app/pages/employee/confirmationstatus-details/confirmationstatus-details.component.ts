import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
interface AdditionalRegistrationDetails {
  courseName: string;
  trainerName: string;
  startDate: string;
  endDate: string;
  fromTime: string;
  toTime: string;
  status: string;
}

@Component({
  selector: 'confirmationstatus-details',
  templateUrl: './confirmationstatus-details.component.html',
  styleUrls: ['./confirmationstatus-details.component.scss']
})
export class ConfirmationstatusDetailsComponent implements OnInit {

  detailsForCourse: AdditionalRegistrationDetails[] = [];

  // Inject the HttpClient and ActivatedRoute in the constructor
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}


  ngOnInit(): void {
    // Call the method to fetch details when the component initializes
    this.fetchDetailsForCourse();
  }

  fetchDetailsForCourse(): void {
    // Use the route parameter to get the dynamic courseName
    const courseName = this.route.snapshot.paramMap.get('courseName');

    // Fetch details from the API based on the dynamic courseName
    this.httpClient.get<AdditionalRegistrationDetails[]>(`http://localhost:8083/api/registrations/details-for-course/${courseName}`)
      .subscribe(
        (data: AdditionalRegistrationDetails[]) => {
          // Process the API response and extract the properties
          this.detailsForCourse = data.map(entry => ({
            courseName: entry.courseName,
            trainerName: entry.trainerName,
            startDate: entry.startDate,
            endDate: entry.endDate,
            fromTime: entry.fromTime,
            toTime: entry.toTime,
            status: entry.status
          }));
        },
        (error) => {
          console.error('Error fetching details for course:', error);
        }
      );
  }

}
