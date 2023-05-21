import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from 'src/app/Services/api';
import { Formater } from 'src/app/Services/formater';

@Component({
  selector: 'app-champion-detail',
  templateUrl: './champion-detail.component.html',
  styleUrls: ['./champion-detail.component.scss']
})
export class ChampionDetailComponent implements OnInit {
  loading: boolean = true;
  fetchError: boolean = false;

  championId: string = '';
  championInfo: any;
  championSelected: any;
  imageArray: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      this.championInfo = await Api.getChampionsDetails();
      this.championId = this.route.snapshot.paramMap.get('id') || '';
      this.championSelected = await Formater.findChampion(this.championInfo, this.championId);
      if (this.championSelected === undefined) {
        this.router.navigate(['/unknown']);
      }

      this.loading = false;
    } catch (error) {
      console.error(error);
      this.loading = false;
      this.fetchError = true;
    }
  }
}
