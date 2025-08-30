import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../services/faq.service';
import { Router } from '@angular/router';
import { IFaq } from '../../models/faq.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq implements OnInit {
  constructor(private _faqS: FaqService, private router: Router) { }
  faqs: IFaq[] = []
  isEditing = false;
  currentEditId: string | null = null;
  
  ngOnInit(): void {
    this.loadFaq();
  }

  reactiveForm: FormGroup = new FormGroup({
    question: new FormControl('' , Validators.required),
    answer: new FormControl('', Validators.required)
  })

  loadFaq(){
    this._faqS.getAllFaq().subscribe({
      next: res =>{
        this.faqs = res.data;
        console.log('faq list: ' ,res);
      },
      error: err =>{
        console.log(err);
      }
    })
  }
  
  onSubmit(){
    const data = this.reactiveForm.value;
    console.log('Form data:', data);
    console.log('Form valid:', this.reactiveForm.valid);
    
    if (this.isEditing && this.currentEditId) {
      this.editFaq(this.currentEditId, data);
    } else {
      this.addNewFaq(data);
    }
  }

  addNewFaq(data:IFaq){
    this._faqS.addNewFaq(data).subscribe({
      next: res => {
        console.log(res);
        this.loadFaq();
        this.reactiveForm.reset();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  editFaq(id: string, data: IFaq){
    this._faqS.editFaq(id, data).subscribe({
      next: res => {
        console.log(res);
        this.loadFaq();
        this.cancelEdit();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  deleteFaq(id: string){
      this._faqS.deleteFaq(id).subscribe({
        next: res => {
          this.faqs = res.data
          console.log(res);
          this.loadFaq();
        },
        error: err => {
          console.log(err);
        }
      })
  }

  startEdit(faq: IFaq & { _id?: string }){
    if (faq._id) {
      this.isEditing = true;
      this.currentEditId = faq._id;
      this.reactiveForm.patchValue({
        question: faq.question,
        answer: faq.answer
      });
    }
  }

  cancelEdit(){
    this.isEditing = false;
    this.currentEditId = null;
    this.reactiveForm.reset();
  }
}
