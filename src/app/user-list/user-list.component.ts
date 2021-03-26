import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  

  page: number = 1;
 
  filter:any;

  key!: string; //set default
  reverse: boolean = false;
  
  sort(key:string){
    this.key = key;
    this.reverse = !this.reverse;
  }


  constructor(private userService: UserService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

    ngOnInit(): void {
      console.log("initialised");
      this.getAllUsers();
     

      //Populate form
      this.editForm = this.fb.group(
        {
          userId:[''],
          userName:[''],
          password:[''],
          fullName:[''],
          active:[''],
         
        }
      );
      
  }


  //get all users
  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
        this.allUsers=response;
        console.log(response);
      }
    );
  }

  //open form
  open(content: any){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        this.closeResult = `Closeed with:${result}`;
      },(reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      });
  }

  //get dismissReason
  private getDismissReason(reason: any): string{
    if(reason === ModalDismissReasons.ESC){
      return 'by pressing Esc';
    }else if (reason === ModalDismissReasons.BACKDROP_CLICK){
      return 'by clicking on a backdrop';
    }else{
      return `width:${reason}`;
    }
      
    }

    onSubmit(){
      console.log("Inserting");

      //Inserting record
      this.userService.insertUser(this.editForm.value).subscribe(
        (result) => {
          console.log(result);
        //reload
        this.ngOnInit();
      });
      this.modalService.dismissAll();

        }

      //open edit form for data
    openEdit(targetModal: any, user: User){
    this.modalService.open(targetModal, {
    backdrop: 'static',
    size: '1g'
    })
    this.editForm.patchValue({
      userId:  user.userId,
      userName: user.userName,
      password: user.password,
      fullName: user.fullName,
      active: user.active
    });

    }

  //Update
  onUpdate(){
  //Assigning values from editform to modal
  this.user = this.editForm.value;
  console.log(this.user);

  //call service for update
  this.userService.updateUser(this.user).subscribe(
    (result) => {
      console.log(result);
      //reload
      this.ngOnInit();
    });
    this.modalService.dismissAll();
}

}
