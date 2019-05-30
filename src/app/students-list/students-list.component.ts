import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { StudentService } from '../_services/student.service'
import { AuthenticationService } from '../_services/authentication.service';
import { Student } from '../_models/student';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit, OnChanges {

  selectedCategory = 'All';

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.loadAllStudents();
  }

  @Input() students: Student[] =[];
  @Input() filteredStudents: Student[] =[];
  @Output() student: Student;


  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredStudents = this.listFilter ? this.performFilterByName(this.listFilter) : this.students;
  }

  performFilterByName(filterBy: string): Student[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.students.filter((student: Student) =>
      student.studentName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  performFilterByCategory(filterBy: string): Student[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.students.filter((student: Student) =>
      student.category.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  categoryChangeHandler(selectedCategory){
    this.filteredStudents = selectedCategory ? this.performFilterByCategory(selectedCategory) : this.students;
  }

  constructor(
    private authenticationService: AuthenticationService,
    private studentService: StudentService,
    private router: Router,) {}

  ngOnInit() {
    this.loadAllStudents();
  }

  private loadAllStudents() {
    this.studentService.getAll().pipe(first()).subscribe(students => {
      this.students = students;
      this.filteredStudents = students;
      // console.log('Students: ' + JSON.stringify(students));
    });
  }

  private deletedEventHandler(msg: string) {
    this.loadAllStudents();
  }

  // deleteStudent(id: number) {
  //   this.studentService.deleteStudent(id).subscribe(() => this.loadAllStudents());
  // }

  // viewStudentDetails(id: number) {
  //   this.getStudentDetails(id);
  //   if(this.student) {
  //     this.router.navigate(['/onboardingForm']);
  //   }
  // }

  getStudentDetails(id: number) {
    this.studentService.getById(id).pipe(first()).subscribe((studentDetail: Student) => {
      this.student = studentDetail
    });
  }

}
