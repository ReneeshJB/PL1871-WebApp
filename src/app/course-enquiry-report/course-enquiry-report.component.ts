import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartService } from '../shared/chart.service';
import { StatusCount } from '../shared/status-count';




@Component({
  selector: 'app-course-enquiry-report',
  templateUrl: './course-enquiry-report.component.html',
  styleUrls: ['./course-enquiry-report.component.scss']
})
export class CourseEnquiryReportComponent implements OnInit {
  statusCount: StatusCount[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Applied', 'Selected', 'Rejected'];
  public pieChartData: SingleDataSet = [0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private chartService: ChartService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.chartService.getStatusCount().subscribe(
      (response) => {
        this.statusCount = response;
        // console.log(this.statusCount[0]);
        this.pieChartData = [];
        // this.pieChartLabels = [];
        this.statusCount.forEach(data => {
          this.pieChartData.push(data.count);

        });
        this.ngOnInit();
      }
    );
  }

  ngOnInit() {

  }


}
