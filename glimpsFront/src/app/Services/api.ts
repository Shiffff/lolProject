import { environment } from "../../environments/environments";

interface ChampionData {
  [key: string]: Champion;
}

interface Champion {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
}
interface FreeChampionsData {
  freeChampionIds: number[];
  freeChampionIdsForNewPlayers: number[];
  maxNewPlayerLevel: number;
}

export class Api {


  static async getChampions(): Promise<ChampionData> {
    const response = await fetch(`${environment.BaseUrl}13.10.1/data/en_US/champion.json`);
    const data = await response.json();
    return data.data;
  }
  
  static async getFreeChampions(): Promise<FreeChampionsData> {
    try {
      const response = await fetch(`${environment.apiBaseUrl}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getFChampionInfo(): Promise<any> {
    const champions = await this.getChampions();
    const freeChampions = await this.getFreeChampions();



    const freeChampionIds = freeChampions.freeChampionIds;
    const freeChampionIdsForNewPlayers = freeChampions.freeChampionIdsForNewPlayers;
    const newPlayerLevel = freeChampions.maxNewPlayerLevel;
    const freeChampionsList: Champion[] = [];
    const freeChampionsNewPlayerList: Champion[] = [];
    const addedChampionKeys = new Set<string>();


    for (const championKey of Object.keys(champions)) {
      const champion = champions[championKey];
      const championKeyNumber = Number(champion.key);


      if (freeChampionIds.includes(championKeyNumber) && !addedChampionKeys.has(championKey)) {
        freeChampionsList.push(champion);
        addedChampionKeys.add(championKey);
      }
      if (freeChampionIdsForNewPlayers.includes(championKeyNumber) && !addedChampionKeys.has(championKey)) {
        freeChampionsNewPlayerList.push(champion);
        addedChampionKeys.add(championKey);
      }
    }
  
    const result = {
      freeChampions: freeChampionsList,
      freeChampionsNewPlayer: freeChampionsNewPlayerList,
      newPlayerLevel: newPlayerLevel
    };
  
    return result;
  }
  
  static async getChampionsDetails(): Promise<any[]> {
      const championsInfo = await this.getFChampionInfo();
      const getChampionDetails = async (champion: { id: string }, isFreeForNewPlayer: boolean) => {
      const championDetailsUrl = `https://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion/${champion.id}.json`;
      const response = await fetch(championDetailsUrl);
      const championDetails = await response.json();
      const championData = championDetails.data;
      const championName = Object.keys(championData)[0];
  
      return { champion: championData[championName], isFreeForNewPlayer };
    };
  
    const newPlayerChampionsPromises = championsInfo.freeChampionsNewPlayer.map(async (champion: { id: string }) => {
      return getChampionDetails(champion, true);
    });
  
    const freeChampionsPromises = championsInfo.freeChampions.map(async (champion: { id: string }) => {
      return getChampionDetails(champion, false);
    });
  
    const newPlayerChampionDetails = await Promise.all(newPlayerChampionsPromises);
    const freeChampionDetails = await Promise.all(freeChampionsPromises);
    const allChampionDetails = [...newPlayerChampionDetails, ...freeChampionDetails];

    return allChampionDetails
  }

}

