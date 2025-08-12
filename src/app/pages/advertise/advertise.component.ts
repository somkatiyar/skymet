import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { WindowService } from '../../services/window.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advertise',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './advertise.component.html',
  styleUrl: './advertise.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvertiseComponent implements AfterViewInit,OnInit{
  constructor(private windowService: WindowService,
    private dataService:DataService,
    private fb: FormBuilder) {}
  swiper: Swiper | undefined;
  contactForm!: FormGroup;
  submitted = false;
  ngAfterViewInit(): void {
    if(this.windowService.isBrowser()) {
      this.initializeSwiper();
    
    }
  }

  ngOnInit(): void {
    this.configForm();
  }

  initializeSwiper(): void {
    this.swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }

  configForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      mobile: ['', Validators.required],
      remarks: [''], // Optional
    });
  }

   onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return; 
    }

    const formData = this.contactForm.value;
  
    this.dataService.submitForm(formData).subscribe(
      (res) => {
        if(res && res.status ==1) {
        alert('Form submitted successfully!');
        this.contactForm.reset();
        this.submitted = false;
        }else {
        alert('Something went wrong.');
        }
   
      },
      (err) => {
        alert('Something went wrong.');
      }
    );
  }
}
