import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/Services/api';

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
      this.championInfo = await Api.getChampionsDetails();
      console.log(this.championInfo)
      this.loading = false;
    } catch (error) {
      console.error(error);
      this.loading = false;
      this.fetchError = true;
    }
  }
}
