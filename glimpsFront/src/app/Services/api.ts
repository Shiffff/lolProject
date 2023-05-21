import { environment } from "../../environments/environments";

export class Api {

    static async getChampionsList(){
        try {
            const response = await fetch(`${environment.BaseUrl}13.10.1/data/en_US/champion.json`);
            const data = await response.json();
            return data.data;
          } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des champions :", error);
            throw error;
          }
        }
    static async getFreeChampionsList(){
        try {
            const response = await fetch(`${environment.apiBaseUrl}`);
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des champions gratuit :", error);
            throw error;
          }
        }    
        static async getChampionDetail(id:string){
          try {
              const response = await fetch(`${environment.BaseUrl}13.10.1/data/en_US/champion/${id}.json`);
              const data = await response.json();
              return data.data;
            } catch (error) {
              console.error("Une erreur s'est produite lors de la récupération du détail du champion :", error);
              throw error;
            }
          }   
}



