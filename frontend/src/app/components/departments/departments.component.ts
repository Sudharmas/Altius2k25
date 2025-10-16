import { Component } from '@angular/core';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {
  departments = [
    { id: 'CSE', name: 'Computer Science Engineering', photo: 'CSE.jpg' },
    { id: 'ISE', name: 'Information Science Engineering', photo: 'ISE.jpg' },
    { id: 'ECE', name: 'Electronics & Communication', photo: 'ECE.jpg' },
    { id: 'MECH', name: 'Mechanical Engineering', photo: 'MECH.jpg' },
    { id: 'CIVIL', name: 'Civil Engineering', photo: 'CIVIL.jpg' },
    { id: 'AIML', name: 'AI & Machine Learning', photo: 'AIML.jpg' }
  ];
}
