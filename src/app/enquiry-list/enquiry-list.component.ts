import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../shared/course';
import { CourseService } from '../shared/course.service';
import { Enquiry } from '../shared/enquiry';
import { EnquiryService } from '../shared/enquiry.service';
import { Status } from '../shared/status';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss']
})
export class EnquiryListComponent implements OnInit {

  enquiry: Enquiry = new Enquiry;
  enquiries: Enquiry[] = [];
  page: number = 1;

  closeResult = '';
  addForm!: FormGroup;
  editForm!: FormGroup;
  statuses: Status[] = [];
  allCourses: Course[] = [];

  isSubmitted = false;
  // error = '';
  filter: any;
  changeText: any;

  //Sorting method
  key!: string; //set default
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  constructor(
    private enquiryService: EnquiryService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private statusService: StatusService,
    private courseService: CourseService) { }

  ngOnInit(): void {
    console.log('enquiry-list initialized');
    this.getAllEnquiries();
    this.getAllStatus();
    this.getAllCourses();
    this.newAddForm();
    this.newEditForm();
  }

  get formControls() {
    return this.addForm.controls;
  }

  get editFormControls() {
    return this.editForm.controls;
  }

  //Add form
  newAddForm() {
    this.addForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(20)]],
        dob: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        highestQual: ['', [Validators.required, Validators.maxLength(20)]],
        enquiredCourses: this.fb.array([])
      }
    );
  }

  //Edit form
  newEditForm() {
    this.editForm = this.fb.group({
      enquiryId: [''],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
      dob: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      highestQual: ['', [Validators.required]],
      status: ['', [Validators.required]],
      enqDate: [''],
      enquiredCourses: this.fb.array([])
    });

  }

  //Get all Status
  getAllStatus() {
    this.statusService.getAllStatuses().subscribe(
      response => {
        this.statuses = response;
      }
    )
  }

  //Get All Enquiries
  getAllEnquiries() {
    this.enquiryService.getAllEnquiries().subscribe(
      response => {
        console.log(response);
        this.enquiries = response;
      }
    )
  }


  // Getting all Courses
  getAllCourses() {

    this.enquiryService.getAllCourses().subscribe(
      response => {
        console.log("courses");
        console.log(response);
        this.allCourses = response;
        this.pushCourses();
      }
    )
  }

  //Get courses
  get courses() {
    return this.addForm.get('enquiredCourses') as FormArray;
  }

  get editCourses() {
    return this.editForm.get('enquiredCourses') as FormArray;
  }
  //Push Courses
  pushCourses() {
    this.allCourses.forEach(
      element => {
        this.courses.push(this.fb.control(''));
        this.editCourses.push(this.fb.control(''));
      });

  }

  //Get DismissReason
  private getDismissedReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }

  //New Enquiry Form
  newEnquiry(targetModal: any) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'md'
    });
  }

  //Submit Enquiry - Form
  onSubmit() {
    this.isSubmitted = true;

    if (this.addForm.invalid) {
      console.log("invalid");
      // this.error = "Invalid";
      return;
    }

    if (this.addForm.valid) {
      console.log("valid");

      let enquiry: Enquiry = new Enquiry();
      let date: Date = new Date();

      enquiry.name = this.addForm.value['name'];
      enquiry.dob = this.addForm.value['dob'];
      enquiry.email = this.addForm.value['email'];
      enquiry.highestQual = this.addForm.value['highestQual'];
      enquiry.enqDate = date;
      enquiry.status = new Status(1);

      this.addForm.value['enquiredCourses'].forEach((element: boolean, i: number) => {
        if (element === true) {
          enquiry.enquiredCourses.push(new Course(i + 1));
        }

      });

      //Call Service for insert
      console.log(enquiry);
      this.enquiryService.insertEnquiry(enquiry).subscribe(
        (result) => {
          console.log(result);
          this.addForm.reset();
          this.isSubmitted = false;
          this.ngOnInit();
        }
      )
      this.modalService.dismissAll();
      this.toastr.success('Enquiry Submitted Successfully', 'CRM App');
    }
  }

  //Update enquiry form
  updateEnquiry(contentEdit: any, enq: Enquiry) {
    this.modalService.open(contentEdit, {
      backdrop: 'static',
      size: 'md'
    });

    let boolCourses: boolean[] = [];

    this.allCourses.forEach(element => {
      boolCourses.push(false);
    });

    enq.enquiredCourses.forEach(element => {
      boolCourses[element.courseId - 1] = true;
    });

    this.editForm.patchValue({
      enquiryId: enq.enquiryId,
      name: enq.name,
      dob: enq.dob,
      email: enq.email,
      highestQual: enq.highestQual,
      enqDate: enq.enqDate,
      status: enq.status.statusId,
      enquiredCourses: boolCourses
    });
  }

  //Update method
  onUpdate() {

    let enquiry: Enquiry = new Enquiry();

    enquiry.enquiryId = this.editForm.value['enquiryId'];
    enquiry.name = this.editForm.value['name'];
    enquiry.dob = this.editForm.value['dob'];
    enquiry.email = this.editForm.value['email'];
    enquiry.highestQual = this.editForm.value['highestQual'];
    enquiry.enqDate = this.editForm.value['enqDate'];
    enquiry.status = new Status(this.editForm.value['status']);

    this.editForm.value['enquiredCourses'].forEach((element: boolean, i: number) => {
      if (element === true) {
        enquiry.enquiredCourses.push(new Course(i + 1));
      }

    });


    if (this.editForm.valid) {
      console.log("valid")
      this.enquiryService.updateEnquiry(enquiry).subscribe(
        (result) => {
          console.log(result);
          this.isSubmitted = false;
          this.editForm.reset();
          this.ngOnInit();
        }
      )
      this.modalService.dismissAll();
      this.toastr.success('Changes Saved Successfully', 'CRM App');
    }
  }

}
