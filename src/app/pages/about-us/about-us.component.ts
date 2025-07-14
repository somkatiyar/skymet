import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { SeoService } from '../../services/seo.service';
import { DataService } from '../../services/data.service';
// Update the path below if your data.service.ts is located elsewhere



@Component({
  selector: 'app-about-us',
  standalone: true,
  imports:[SharedModule,FormsModule,ReactiveFormsModule,
    CommonModule,RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class AboutUsComponent implements OnInit {
  selectedLng: any;
  constructor(
    private meta: Meta,
    private translateService:TranslateService,
    private dataService: DataService,
    private seoService: SeoService
  ) {
    this.dataService.selectedLanguages.subscribe((lng: any) => {
      this.translateService.use(lng)
      this.selectedLng = lng;
    });

 
  }
  data: any = [
    {
      id: 'jatin',
      checked: false,
      name: 'Mr. Jatin Singh',
      designation: 'Chairman',
      company: 'Skymet Weather Services Pvt Ltd.',
      twitter: 'https://x.com/JATINSKYMET',
      linkedin: 'https://www.linkedin.com/in/jatin-singh-skymet',

      content:
        'Jatin Singh is the Founder & Managing Director at Skymet Weather Services Pvt Ltd. He is in charge of the overall growth strategy of the company, technology innovation, operations, and business dimensions. Prior to being an entrepreneur, Jatin was associated with TV Today Group as an Assistant Producer and anchor. Before joining the group, he was a reporter with ANI/Reuters handling multiple verticals such as National Broadcasting Corporation (New Delhi and Jammu & Kashmir) and a news bulletin carried in the United States, the South Asian Newsline. He is also the Founder of Gramcover, which brings an innovative approach for insurance distribution in rural India with effective use of technology. He has been an Associate Producer for the Singapore-based 24-hour news network, Channel News Asia.',
    },
    {
      id: 'yogesh',
      checked: false,
      name: 'Mr. Yogesh Patil',
      designation: 'CEO',
      company: 'Skymet Weather Services Pvt Ltd.',
      twitter: 'https://x.com/Yogesh010680',
      linkedin: 'https://www.linkedin.com/in/yogeshaarya',
      content:
        'Yogesh is a meteorologist and weather instrumentation expert, balanced by an understanding of risk, to create opportunity and articulate ways to best leverage weather information across multiple platforms. He is an engineer by training followed by studies in management and has more than 22 years of experience. He has a strong foundation for understanding the Weather Risk industry and values teamwork to create synergies within an operational environment as well as externally to build engaging relationships with clients to help build and grow business. He strives to use an entrepreneurial approach to link earth, ocean, atmospheric, and climate science to corporate risk management, business product development, and investment portfolios.',
    },
    {
      id: 'vivek',
      checked: false,
      name: 'Mr. Vivek Singh',
      designation: 'CEO & CTO',
      company: 'Skymet Weather Services Pvt Ltd.',
      twitter: 'https://x.com/SkymetWeather',
      linkedin: 'https://www.linkedin.com/in/vivek-singh-a126a93b',
      content:
        "Vivek, an engineer with 20 years of experience, excels in PDLC, SAAS delivery, software architecture, programming, and strategic business model development. He established India's largest IoT-based weather network for Skymet, improving forecasting accuracy and benefiting millions through AI and ML-based models. Proficient in Python, TensorFlow, PyTorch, and Keras, Vivek's deep learning skills cover CNNs, RNNs, GANs, and Transformer models. He is skilled in NLP, data processing with Pandas and NumPy, and visualization with Matplotlib and Seaborn. Experienced with Git, Docker, Agile, cloud platforms like AWS and Azure, and databases such as SQL, MongoDB, and PostgreSQL, Vivek brings a comprehensive tech skill set.",
    },
    {
      id: 'mukesh',
      checked: false,
      name: 'Mr. Mukesh Mangal',
      designation: 'CFO',
      company: 'Skymet Weather Services Pvt Ltd.',
      twitter: 'https://x.com/SkymetWeather',
      linkedin: 'https://www.linkedin.com/company/skymet',
      content:
        'A qualified Chartered Accountant with 23+ years of experience in operations, finance, taxation, accounts, audit, and IT across manufacturing, telecom, and retail sectors. Skilled in designing business plans, preparing budgets, analyzing financial statements, managing working capital, and building internal financial controls. Proficient in ERP packages such as SAP (FICO and MM modules), Tally, and MS Excel, with expertise in integrating POS applications with SAP FI. Led IT initiatives for finance functions and coordinated a USD 450 million acquisition of ETIPL by ATC USA. Experienced in management accounting and financial controlling.',
    },
  ];
  showData: any;
  slectedFrame: any;
  async ngOnInit() {
   // this.seoService.aboutUsDynamic('aboutUs');
  }



  configData(index: any) {
    var arr = [0, 1, 2, 3];
    var md = arr.splice(index, 1);
    arr.forEach((el: any) => {
      this.data[el].checked = false;
    });
  }

  onImageClick(id: any, index: any) {
    this.slectedFrame = index;
    if (this.data[index]?.checked) {
      this.data[index].checked = false;
      this.configData(index);
    } else {
      this.data[index].checked = true;
      this.configData(index);
    }
  }
  restLeader() {
    this.data.forEach((element: any, index: any) => {
      element.checked = false;
    });
  }
}

