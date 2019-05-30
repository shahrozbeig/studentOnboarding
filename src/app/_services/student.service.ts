import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../_models/student';

@Injectable({providedIn: 'root'})
export class StudentService {

  constructor (private http: HttpClient) {}

  register(student: Student) {
    return this.http.post(`/students/onboard`, student);
  }

  getAll() {
    return this.http.get<Student[]>(`/students`);
  }

  deleteStudent(id: number) {
    return this.http.delete(`/student/` + id);
  }

  getById(id: number) {
    return this.http.get(`/student/` + id);
  }

  update(student: Student) {
    return this.http.put(`/student/update` + student.rollNumber, student);
}

}
