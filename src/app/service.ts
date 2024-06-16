import { Injectable,inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Firestore, collection, collectionData, doc, getDocs } from '@angular/fire/firestore';
import {tunIss} from "./tunnel-detail/tunIss"
export interface TunElem {
    "tunnel": string;
    "date":string;
    "issue":string;
  }  
export interface Issue {
    nom:string;
    date:string;
    porte:string;
    eclairage:string;
    surpr:string;
}
@Injectable({ providedIn: 'root' })
export class Service {    
    private firestore: Firestore = inject(Firestore);
    etatIss!:any;
    tunIssues: Record<string,string[]>=tunIss;
    constructor() {   
   }
    async getTunIss(){ return this.tunIssues }
    async getEtatIss(tunnel: string) {
        let querySnapshot = await getDocs(collection(this.firestore,'logs'));
        let logs:any[]=[];
        querySnapshot.forEach((doc) => {
              if(('email' in doc.data())&&  
              ('issue'  in doc.data()) ) 
                { logs.push( doc.data())  }
       });
        const etatIss=logs.reduce((are,cur)=>{
            const cd=cur.date;
            const cis=cur.issue;
            const cup=cur.porteEtat;
            const cue=cur.eclairage;
            const csurp=cur.surpression;
            if(!are[cis]){are[cis]={date:cd,porte:cup,eclairage:cue,surpr:csurp}  }
            else { if(are[cis].date<cd) { are[cis]={date:cd,porte:cup,eclairage:cue,surpr:csurp} }}
            return are
        },{});
        let lstIss:Issue[]=[];
        const issTun=this.tunIssues[tunnel] as string[];
        for (const cis of Object.keys(etatIss)) {
            if (issTun.includes(cis)) {
                let ob:Partial<Issue>=etatIss[cis];
                ob['nom']=cis as string;
                lstIss.push(ob  as Issue)
            }
        }
        return lstIss
    }
}

