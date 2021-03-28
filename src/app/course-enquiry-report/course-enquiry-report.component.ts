import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartService } from '../shared/chart.service';
import { EnquiryService } from '../shared/enquiry.service';
import { Status } from '../shared/status';
import { StatusCount } from '../shared/status-count';
import { StatusService } from '../shared/status.service';




@Component({
  selector: 'app-course-enquiry-report',
  templateUrl: './course-enquiry-report.component.html',
  styleUrls: ['./course-enquiry-report.component.scss']
})
export class CourseEnquiryReportComponent implements OnInit {

  allStatus: Status[] = [];
  statusCount: StatusCount[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [0,0,0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private chartService: ChartService, private statusService: StatusService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();


  }

  ngOnInit() {

    this.getAllStatus();
    this.getStatusCount();

  }

  getAllStatus() {
    this.statusService.getAllStatuses().subscribe(response => {
      this.allStatus = response;
      this.allStatus.forEach(element => {
        this.pieChartLabels.push(element.statusName);
      })
    });
  }

  getStatusCount() {
    this.chartService.getStatusCount().subscribe(
      (response) => {
        this.statusCount = response;
        // console.log(this.statusCount[0]);
        this.pieChartData = [];
        // this.pieChartLabels = [];
        this.statusCount.forEach(data => {
          this.pieChartData[data.statusId - 1] = (data.count);

        });
      }
    );
  }


}
