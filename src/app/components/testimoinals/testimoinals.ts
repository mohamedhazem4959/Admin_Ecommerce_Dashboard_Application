import { Component, OnInit } from '@angular/core';
import { TestimoinalsService } from '../../services/testimoinals.service';
import { ITestimoinals } from '../../models/testimoinals.model';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-testimoinals',
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './testimoinals.html',
  styleUrl: './testimoinals.css'
})
export class Testimoinals implements OnInit {
  constructor(private _testS: TestimoinalsService, private router: ActivatedRoute) { }
  testiminals: ITestimoinals[] = [];
  id: string | null = '';


  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log('testiminals id: ', this.id);
    })
    this.getAllTestimoinals()
  }
  getAllTestimoinals() {
    this._testS.getAllTestimoinals().subscribe({
      next: res => {
        console.log('testimoinals list: ', res)
        this.testiminals = res.data;
      }
    })
  }


  deletedTestimoinals(id: string) {
    if (id) {
      this._testS.deleteTestimoinal(id).subscribe({
        next: res => {
          const index = this.testiminals.findIndex(t => t._id === id);
          if (index !== -1) {
            this.testiminals[index].isDeleted = true;
          }
          console.log('testimoinal is deleted: ', res)
        },
        error: err => {
          console.log(err);
        }
      })

    }
  }
}
