import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgControl, FormControl, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../_services/alert.service';
import { StudentService } from '../_services/student.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Student } from '../_models/student';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-onborading-form',
  templateUrl: './onborading-form.component.html',
  styleUrls: ['./onborading-form.component.css']
})
export class OnboradingFormComponent implements OnInit {
  onBoardingForm: FormGroup;
  @Input() student: Student;
  loading = false;
  submitted = false;
  isInternational = false;
  isDomestic = false;
  enableCheckboxes = false;
  localParams: Params;
  fromCard = false;
  @Input() isNonEditable: boolean = false;
  isUpdating: boolean = false;
  noDocError: boolean = true;
  @ViewChild("category", {read: ElementRef}) category: ElementRef;

  documentsCheckboxErrorIS: boolean = false;
  documentsCheckboxErrorDS: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private studentService: StudentService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef) {
      console.log('constructor chala');
      this.route.queryParams.subscribe(params => {
        console.log('Check');
        this.localParams = params;
        console.log('params: ' + JSON.stringify(this.localParams['editForm']));
        console.log('tyoeOf: ' + typeof this.localParams['editForm']);
        if (Object.entries(this.localParams).length !== 0 && this.localParams['fromCard'] === "true") {
          this.fromCard = true;
          this.getStudentDetails(params.id, this.localParams['editForm']);
        }
        else {
          if(!this.isUpdating) {
            this.isNonEditable = false;
          this.fromCard = false;
          this.onBoardingForm = this.formBuilder.group({
            studentName: ['', Validators.required],
            rollNumber: ['', Validators.required],
            category: ['', Validators.required],
            domicile: [false, Validators.required],
            birthCertificate: [false, Validators.required],
            previousMarksheets: [false, Validators.required],
            policeClearance: [false, Validators.required],
            passport: [false, Validators.required],
            signedDeclaration: [false, Validators.required],
            dateOfBirth: ['', Validators.required],
            fatherName: ['', Validators.required],
            motherName: ['', Validators.required],
            lastscore: ['', Validators.required]
          });
          }
        }
      });

      console.log('Student: ' + this.student);
    if (this.student === undefined) {
      this.isNonEditable = false;
      this.onBoardingForm = this.formBuilder.group({
        studentName: ['', Validators.required],
        rollNumber: ['', Validators.required],
        category: ['', Validators.required],
        domicile: [false, Validators.required],
        birthCertificate: [false, Validators.required],
        previousMarksheets: [false, Validators.required],
        policeClearance: [false, Validators.required],
        passport: [false, Validators.required],
        signedDeclaration: [false, Validators.required],
        dateOfBirth: ['', Validators.required],
        fatherName: ['', Validators.required],
        motherName: ['', Validators.required],
        lastscore: ['', Validators.required]
      });
    }

  }

  ngAfterViewChecked(){
    console.log( "! changement de la date du composant !" );
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    console.log('Student: ' + this.student);
    if (this.student === undefined) {
      this.isNonEditable = false;
      this.onBoardingForm = this.formBuilder.group({
        studentName: ['', Validators.required],
        rollNumber: ['', Validators.required],
        category: ['', Validators.required],
        domicile: [false, Validators.required],
        birthCertificate: [false, Validators.required],
        previousMarksheets: [false, Validators.required],
        policeClearance: [false, Validators.required],
        passport: [false, Validators.required],
        signedDeclaration: [false, Validators.required],
        dateOfBirth: ['', Validators.required],
        fatherName: ['', Validators.required],
        motherName: ['', Validators.required],
        lastscore: ['', Validators.required],
        documentsCheckbox: new FormArray([])
      });
    }
  }

  // convenience getter for easy access to form fields
  get formField() { return this.onBoardingForm.controls; }

  validateDocuments(): boolean {
    if(this.onBoardingForm.controls.category.value === 'international'
      && (this.onBoardingForm.controls.domicile.value === false
      || this.onBoardingForm.controls.birthCertificate.value === false
      || this.onBoardingForm.controls.previousMarksheets.value === false
      || this.onBoardingForm.controls.policeClearance.value === false
      || this.onBoardingForm.controls.passport.value === false
      || this.onBoardingForm.controls.signedDeclaration.value === false)) {
        this.documentsCheckboxErrorIS = true;
        return false;
      } else if(this.onBoardingForm.controls.category.value === 'domestic'
        && (this.onBoardingForm.controls.domicile.value === false
        || this.onBoardingForm.controls.birthCertificate.value === false
        || this.onBoardingForm.controls.previousMarksheets.value === false
        || this.onBoardingForm.controls.signedDeclaration.value === false)) {
          this.documentsCheckboxErrorDS = true;
          return false;
        } else {
          return true;
        }
  }

  onSubmit() {
    console.log('submit ran');
    this.submitted = true;
    this.documentsCheckboxErrorIS = false;
    this.documentsCheckboxErrorDS = false;
    // console.log(this.onBoardingForm);
    console.log(this.onBoardingForm.controls.category.value);

    // stop here if form is invalid
    if (this.onBoardingForm.invalid) {
      this.noDocError = this.validateDocuments();
      return;
    }
    this.noDocError = this.validateDocuments();
    if (!this.noDocError) {
      console.log('Doc error');
      return;
    }
    this.loading = true;
    this.studentService.register(this.onBoardingForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if ( this.isUpdating ) {
            this.alertService.success('Update successful', true);
            this.category.nativeElement.disabled = true;
          } else {
            this.alertService.success('Registration successful', true);
            this.category.nativeElement.disabled = true;
          }
          this.isNonEditable = true;
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          this.isNonEditable = false;
        });
  }

  categoryChangeHandler(selectedCategory: string): void {
    if (selectedCategory === 'international') {
      this.isInternational = true;
      this.enableCheckboxes = true;
      this.isDomestic = false;
    } else if (selectedCategory === 'domestic') {
      this.isDomestic = true;
      this.isInternational = false;
      this.enableCheckboxes = true;
    } else {
      this.enableCheckboxes = false;
      this.isInternational = false;
      this.isDomestic = false;
    }
  }

  getStudentDetails(id: number, editForm: string) {
    if (id !== undefined) {
      this.studentService.getById(id).pipe(first()).subscribe((studentDetail: Student) => {
        this.student = studentDetail;
        console.log('Student: ' + JSON.stringify(this.student));
        if (this.student !== undefined && editForm == "true") {
          console.log('Test true');
          this.enableCheckboxes = true;
          this.isNonEditable = false;
        }
        if (this.student !== undefined && editForm == "false") {
          console.log('Test false');
          this.enableCheckboxes = true;
          this.isNonEditable = true;
          this.category.nativeElement.disabled = true;
        }
        console.log('dob: ' + this.student.dateOfBirth);
        console.log('lastscore: ' + this.student.lastscore);
        this.onBoardingForm.controls.studentName.setValue(this.student.studentName);
        this.onBoardingForm.controls.rollNumber.setValue(this.student.rollNumber);
        this.onBoardingForm.controls.category.setValue(this.student.category);
        this.onBoardingForm.controls.domicile.setValue(this.student.domicile);
        this.onBoardingForm.controls.birthCertificate.setValue(this.student.birthCertificate);
        this.onBoardingForm.controls.previousMarksheets.setValue(this.student.previousMarksheets);
        this.onBoardingForm.controls.policeClearance.setValue(this.student.policeClearance);
        this.onBoardingForm.controls.passport.setValue(this.student.passport);
        this.onBoardingForm.controls.signedDeclaration.setValue(this.student.signedDeclaration);
        this.onBoardingForm.controls.dateOfBirth.setValue(this.student.dateOfBirth); // TODO
        this.onBoardingForm.controls.fatherName.setValue(this.student.fatherName);
        this.onBoardingForm.controls.motherName.setValue(this.student.motherName);
        this.onBoardingForm.controls.lastscore.setValue(this.student.lastscore); // TODO
      });
    }
  }

  reloadPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        isNonEditable: false
      }
    }
    this.router.navigate(['/onboardingForm'], navigationExtras);
  }

  updateStudentData(id: number) {
    this.isUpdating = true;
    this.studentService.deleteStudent(id).pipe(first()).subscribe();
  }
}

