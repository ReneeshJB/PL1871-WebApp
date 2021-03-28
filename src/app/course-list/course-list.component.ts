import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, FormArray, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../shared/course';
import { CourseService } from '../shared/course.service';
import { Module } from '../shared/module';
import { Qualification } from '../shared/qualification';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courses!: Course[];
  course!: Course;
  allModules!: Module[];
  allQuals!: Qualification[];

  closeResult = '';
  editForm!: FormGroup;
  allCourses!: Course[];
  isSubmitted = false;

  page: number = 1;
  filter: any;
  key!: string; //set default
  reverse: boolean = false;


  constructor(private courseService: CourseService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService) {

    //Populate Form
    this.editForm = this.fb.group(
      {
        courseId: [''],
        courseName: ['', [Validators.required],Validators.maxLength(20)],
        description: ['',[Validators.maxLength(20)]],
        durationDays: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        fees: ['', [Validators.required, Validators.pattern('[0-9]*'),Validators.maxLength(20)]],
        active: [''],
        modules: this.fb.array([]),
        quals: this.fb.array([])

      }
    );
  }

  ngOnInit(): void {
    console.log("initialised");
    this.getAllCourses();
    this.getAllModules();
    this.getAllQuals();

  }

  get formControls() {
    return this.editForm.controls;
  }
  /***************************************************************************** */
  pushModules() {
    this.allModules.forEach(element => {
      this.modules.push(this.fb.control(''));
    });
  }

  //*********************************************************************** */
  pushQuals() {
    this.allQuals.forEach(element => {
      this.quals.push(this.fb.control(''));
    });
  }
  /***************************************************************************** */

  get modules() {
    return this.editForm.get('modules') as FormArray;
  }
  /***************************************************************************** */

  get quals() {
    return this.editForm.get('quals') as FormArray;
  }

  getAllModules() {
    this.courseService.getAllModules().subscribe(
      (response) => {
        this.allModules = response;
        this.pushModules();
      }

    );
  }

  getAllQuals() {
    this.courseService.getAllQuals().subscribe(
      (response) => {
        this.allQuals = response;
        this.pushQuals();
      }

    );
  }
  //get all courses
  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      (response) => {
        this.courses = response;
        this.allCourses = response;
        console.log(response);
      }

    );
  }

  //open form 
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with:${result}`;

      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      });
  }
  //get dismissREason
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `width:${reason}`;
    }

  }

  onSubmit() {
    this.isSubmitted = true;


    let course: Course = new Course();

    course.courseName = this.editForm.value['courseName'];
    course.description = this.editForm.value['description'];
    course.durationDays = this.editForm.value['durationDays'];
    course.fees = this.editForm.value['fees'];
    course.active = true;

    this.editForm.value['quals'].forEach((element: boolean, i: number) => {
      if (element === true) {
        course.quals.push(new Qualification(i + 1));
      }
    });

    this.editForm.value['modules'].forEach((element: boolean, i: number) => {
      if (element === true) {
        course.modules.push(new Module(i + 1));
      }
    });


    if (this.editForm.valid) {
      console.log("Inserting");
      console.log(course);


      //Inserting record
      this.courseService.insertCourse(course).subscribe(

        (result) => {
          console.log(result);
          //reload
          this.isSubmitted = false;
          this.editForm.reset();
          this.ngOnInit();
        });

      this.modalService.dismissAll();
    }
  }

  onToggleCourse(course: Course) {
    if (course.active == true) {
      this.courseService.disableCourse(course).subscribe(
        (result) => {
          this.ngOnInit();

        }
      );
    } else {
      this.courseService.enableCourse(course).subscribe(
        (result) => {
          this.ngOnInit();
        }
      );
    }
  }
  //open edit form for data
  openEdit(targetModal: any, course: Course) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: '1g'
    })

    let boolmodules: boolean[] = [];  //**************************************
    let boolquals: boolean[] = [];

    this.allModules.forEach(element => {
      boolmodules.push(false);
    });

    course.modules.forEach(element => {
      boolmodules[element.moduleId - 1] = true;
    });

    this.allQuals.forEach(element => {
      boolquals.push(false);
    });

    course.quals.forEach(element => {
      boolquals[element.qualId - 1] = true;
    });

    this.editForm.patchValue({
      courseId: course.courseId,
      courseName: course.courseName,
      description: course.description,
      durationDays: course.durationDays,
      fees: course.fees,
      active: course.active,
      modules: boolmodules,
      quals: boolquals
    });
  }

  //Upadate
  onUpdate() {
    this.isSubmitted = true;
    let course: Course = new Course();

    course.courseId = this.editForm.value['courseId'];
    course.courseName = this.editForm.value['courseName'];
    course.description = this.editForm.value['description'];
    course.durationDays = this.editForm.value['durationDays'];
    course.fees = this.editForm.value['fees'];
    course.active = this.editForm.value['active'];

    this.editForm.value['quals'].forEach((element: boolean, i: number) => {
      if (element === true) {
        console.log("there is value in checkbox" + i + ":" + element);
        course.quals.push(new Qualification(i + 1));
      }
    });

    this.editForm.value['modules'].forEach((element: boolean, i: number) => {
      if (element === true) {
        console.log("there is value in checkbox" + i + ":" + element);
        course.modules.push(new Module(i + 1));
      }
    });
    //Assigning values from editform to modal
    console.log(course);

    //call service for update
    if (this.editForm.valid) {
      this.courseService.updateCourse(course).subscribe(
        (result) => {
          console.log(result);
          //reload
          this.isSubmitted = false;
          this.editForm.reset();
          this.ngOnInit();
        });
      this.modalService.dismissAll();
    }
  }


}
