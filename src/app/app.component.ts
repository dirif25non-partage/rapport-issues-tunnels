
import {Router, RouterOutlet,ActivatedRoute  } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Firestore, collection, collectionData, doc, getDocs, orderBy, query } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table'  
import { PcTunnelsComponent } from './pc-tunnels/pc-tunnels.component';

export interface TunElem {
  "tunnel": string;
  "date":string;
  "issue":string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, RouterModule,  MatButtonModule,MatTableModule,
    MatIconModule, MatMenuModule, MatCardModule, MatListModule,MatFormFieldModule,
    MatInputModule ,MatSelectModule,MatGridListModule,PcTunnelsComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  pcTunnels={'PCTT-Est': ['BOISSY', 'CHAMPIGNY', 'GUY-MOQUET', 'MOULIN', 'NOGENT'],
    'PCTT-Nord': ['BOBIGNY', 'LA_COURNEUVE', 'LANDY', 'LUMEN_NORTON', 'TAVERNY'],
    'PCTT-Ouest': ['LA_DEFENSE', 'AMBROISE_PARE', 'CHENNEVIERES', 'ECHANGEUR_NANTERRE', 'FONTENAY',
     'NANTERRE_CENTRE','NEUILLY','BELLE-RIVE', 'SAINT-CLOUD','SEVINES'],
    'PCTT-Sud': ['ANTONY', 'BICETRE', 'FRESNES', 'ITALIE', 'ORLY']};
  pctts: string[] = ['PCTT-Est','PCTT-Nord','PCTT-Ouest','PCTT-Sud'];
  pctt:string='PCTT-Ouest';
  tunnels=this.pcTunnels[this.pctt as keyof typeof this.pcTunnels];
  tunnel:string='Pas sélectionné';
  logs!:any[];
  log!:any;
  dernDate!:any;
  tunIssues!:any;
  dernVisiteIss!:any;
 
  constructor(
    private router: Router,private route: ActivatedRoute
  ) {      }

  async ngOnInit(): Promise<void> {
    let querySnapshot = await getDocs(collection(this.firestore,'logs'));
    let logs:any[]=[];
    querySnapshot.forEach((doc) => {
          if('email' in doc.data()) { logs.push( doc.data())  }
   });

    const dernDate=logs.reduce((frst,cur)=>{  //dernière entrée par un agent
      const cm=cur.email;
      const cd=cur.date;
        if(!frst[cm]){frst[cm]=cd }
        else { if (frst[cm]<cd ){ frst[cm]=cd}}
        return frst       
    } ,{});
    this.dernDate= Object.entries(dernDate) ;
 //   console.log(this.dernDate);
    this.logs=logs;
    const dernVisiteIss=logs.reduce((are,cur)=>{
        const cd=cur.date;
        const cis=cur.issue;
        if(!are[cis]){are[cis]=cd}
        else { if(are[cis]<cd) { are[cis]=cd}}
        return are
    },{});
    this.dernVisiteIss=dernVisiteIss;


  }

}
