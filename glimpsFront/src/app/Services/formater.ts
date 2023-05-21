import { Api } from "./api";
interface Champion {
  id: string;
  key: string;
}
  export class Formater {
    static async sortChampions() {
      const freeChampionsList = await Api.getFreeChampionsList();
      const championsList: { [key: string]: Champion } = await Api.getChampionsList();
      const match: { champion: any; isFreeForNewPlayer: boolean }[] = [];
  
      for (const id of freeChampionsList.freeChampionIds) {
        const champion = Object.values(championsList).find((champ: any) => champ.key === id.toString());
        if (champion) {
          const championDetail = await Api.getChampionDetail(champion.id);
          match.push({
            champion: Object.values(championDetail)[0],
            isFreeForNewPlayer: false,
          });
        }
      }
      for (const id of freeChampionsList.freeChampionIdsForNewPlayers) {
        const isDuplicate = match.some((item) => item.champion.key === id.toString());
        if (!isDuplicate) {
          const champion = Object.values(championsList).find((champ: any) => champ.key === id.toString());

          if (champion) {
            const championDetail = await Api.getChampionDetail(champion.id);
            match.push({
              champion: Object.values(championDetail)[0],
              isFreeForNewPlayer: true,
            });
          }
        }
      }
      return match.reverse()
    }
    
    static async findChampion(champions: any[], id: string): Promise<Champion> {
      return await champions.find(element => element.champion.id === id);
    }
  }
  