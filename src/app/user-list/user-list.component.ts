import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../shared/role';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users!: User[];
  user: User = new User;
  closeResult = '';
  editForm!: FormGroup;
  allUsers!: User[];
  allRoles!: Role[];
  isSubmitted = false;


  page: number = 1;
  filter: any;
  key!: string; //set default
  reverse: boolean = false;

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  constructor(private userService: UserService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();


    //Populate form
    this.editForm = this.fb.group(
      {
        userId: [''],
        userName: ['', [Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(20)]],
        password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{5,}'),Validators.maxLength(20)]],
        fullName: ['', [Validators.required,Validators.maxLength(20)]],
        active: [''],
        roleId: ['', [Validators.required]]

      }
    );

  }

  get formControls() {
    return this.editForm.controls;
  }
  //get all users
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
        this.allUsers = response;
        console.log(response);
      }
    );
  }

  getAllRoles() {
    this.userService.getAllRoles().subscribe(
      (response) => {
        this.allRoles = response;
      }
    );
  }

  //open form
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closeed with:${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      });
  }

  //get dismissReason
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing Esc';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `width:${reason}`;
    }

  }

  onSubmit() {
    this.isSubmitted = true;
    console.log("inside submit function");
    let user: User = new User();
    user.userId = this.editForm.value['userId'];
    user.userName = this.editForm.value['userName'];
    user.fullName = this.editForm.value['fullName'];
    user.password = this.editForm.value['password'];
    user.role = new Role(this.editForm.value['roleId']);
    user.active = true;


    if (this.editForm.valid) {

      //Inserting record
      console.log(user);
      this.userService.insertUser(user).subscribe(
        (result) => {
          console.log(result);
          //reload
          this.isSubmitted = false;
          this.editForm.reset();
          this.toastr.success('Inserted Successfully', 'CRM');
          this.ngOnInit();
        });
      this.modalService.dismissAll();

    }

  }

  onToggleUser(user: User) {
    if (user.active == true) {
      this.userService.disableUser(user).subscribe();
    } else if (user.active == false) {
      this.userService.enableUser(user).subscribe();

    }
    this.ngOnInit();
  }

  //open edit form for data
  openEdit(targetModal: any, user: User) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: '1g'
    })
    this.editForm.patchValue({
      userId: user.userId,
      userName: user.userName,
      password: user.password,
      fullName: user.fullName,
      active: user.active,
      roleId: user.role.roleId
    });

  }

  //Update
  onUpdate() {
    this.isSubmitted = true;
    //Assigning values from editform to modal
    let user: User = new User();
    user.userId = this.editForm.value['userId'];
    user.userName = this.editForm.value['userName'];
    user.fullName = this.editForm.value['fullName'];
    user.password = this.editForm.value['password'];
    user.role = new Role(this.editForm.value['roleId']);
    user.active = this.editForm.value['active'];

    //call service for update

    if (this.editForm.valid) {
      this.userService.updateUser(user).subscribe(
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
