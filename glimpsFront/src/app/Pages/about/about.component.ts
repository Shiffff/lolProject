import { Component } from '@angular/core';
import { Api } from 'src/app/Services/api';
import { Formater } from 'src/app/Services/formater';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  async ngOnInit() {
    const champions = await Formater.sortChampions();

  }


}
