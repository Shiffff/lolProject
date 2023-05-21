import { Component, OnInit } from '@angular/core';
import { Formater } from 'src/app/Services/formater';

@Component({
  selector: 'app-champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss']
})
export class ChampionListComponent implements OnInit {
  loading: boolean = true;
  fetchError: boolean = false;
  championInfo: any[] = []; 

  async ngOnInit(): Promise<void> {
    try {
      this.championInfo = await Formater.sortChampions();
      this.loading = false;
      console.log(this.championInfo)
    } catch (error) {
      console.error(error);
      this.loading = false;
      this.fetchError = true;
    }
  }
}
