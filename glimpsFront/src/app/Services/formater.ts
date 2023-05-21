export class Formater {
    static async findChampion(champions: any[], id: string): Promise<any> {
      return await champions.find(element => element.champion.id === id);
    }
  }
  