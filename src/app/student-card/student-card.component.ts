import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StudentService } from '../_services/student.service'
import { AuthenticationService } from '../_services/authentication.service';
import { Student } from '../_models/student';
import { first } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent implements OnInit {

  @Input() students: Student[] =[];
  @Input() student: Student;
  @Output() notifyDelete: EventEmitter<string> = new EventEmitter<string>();
  display: string = 'none';
  loading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private studentService: StudentService,
    private router: Router) {}

  ngOnInit() {}

  private loadAllStudents() {
    this.notifyDelete.emit(`A student is deleted`);
  }

  deleteStudent(id: number) {
    this.loading = true;
    this.studentService.deleteStudent(id).pipe(first()).subscribe(() => this.loadAllStudents());
  }

  viewStudentDetails(id: number) {
    this.getStudentDetails(id);
    if(this.student) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
            name: this.student.studentName,
            id: this.student.rollNumber,
            isEditable: true,
            fromCard: true,
            editForm: false
        }
    }
      this.router.navigate(['/onboardingForm'], navigationExtras);
    }
  }

  editStudentDetails(id: number) {
    this.getStudentDetails(id);
    if(this.student) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
            name: this.student.studentName,
            id: this.student.rollNumber,
            isEditable: false,
            fromCard: true,
            editForm: true
        }
    }
      this.router.navigate(['/onboardingForm'], navigationExtras);
    }
  }

  getStudentDetails(id: number) {
    this.studentService.getById(id).pipe(first()).subscribe((studentDetail: Student) => {
      this.student = studentDetail
    });
  }

  openModal() {
    this.display = 'Block';
  }

  onCloseHandled() {
    this.display = 'none';
  }

}
