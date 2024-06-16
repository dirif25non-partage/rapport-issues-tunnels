
import {Router, RouterOutlet } from '@angular/router';
import { Component, OnInit, inject ,Input, OnChanges} from '@angular/core';
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

export interface TunElem {
  "tunnel": string;
  "date":string;
  "issue":string;
}
export const pcTunnels={'PCTT-Est': ['BOISSY', 'CHAMPIGNY', 'GUY-MOQUET', 'MOULIN', 'NOGENT'],
  'PCTT-Nord': ['BOBIGNY', 'LA_COURNEUVE', 'LANDY', 'LUMEN_NORTON', 'TAVERNY'],
  'PCTT-Ouest': ['LA_DEFENSE', 'AMBROISE_PARE', 'CHENNEVIERES', 'ECHANGEUR_NANTERRE', 'FONTENAY',
   'NANTERRE_CENTRE','NEUILLY','BELLE-RIVE', 'SAINT-CLOUD','SEVINES'],
  'PCTT-Sud': ['ANTONY', 'BICETRE', 'FRESNES', 'ITALIE', 'ORLY']};

@Component({
  selector: 'pc-tunnels',
  standalone: true,
  imports: [RouterOutlet,CommonModule, RouterModule,  MatButtonModule,MatTableModule,
    MatIconModule, MatMenuModule, MatCardModule, MatListModule,MatFormFieldModule,
    MatInputModule ,MatSelectModule,MatGridListModule ],
  templateUrl: './pc-tunnels.component.html',
  styleUrl: './pc-tunnels.component.scss'
})
export class PcTunnelsComponent implements OnChanges {
  private firestore: Firestore = inject(Firestore);
  readonly pcTunnels=pcTunnels;
  @Input()  pctt:string='PCTT-Ouest';
  @Input()  dernVisiteIss={};
  tunnels=this.pcTunnels[this.pctt as keyof typeof this.pcTunnels];
  dataSource:TunElem[]=[];
  displayedColumns: string[] = ['tunnel','date','issue'];
  clickedRows = new Set<TunElem>();

  constructor(
    private router: Router,
  ) {      }

  async ngOnChanges() {
    this.tunnels=this.pcTunnels[this.pctt as keyof typeof this.pcTunnels];
    let tabTunnels:TunElem[]=[];
    let querySnapshot = await getDocs(collection(this.firestore,'tunnels'));
    let tunIssues:any={};
    querySnapshot.forEach((doc) => {
      tunIssues[doc.id]=doc.data()['issues']
   });
    this.tunnels.forEach((tunnel) =>{
      let date ='99';
      let derIss='';
      tunIssues[tunnel].forEach((iss:string )=> {
        let dVI=this.dernVisiteIss[iss as keyof typeof this.dernVisiteIss] as string;
        if(dVI){
          if(dVI<date) {date=dVI; derIss=iss}
        }
      });
      tabTunnels.push({"tunnel":tunnel,"date":date,'issue':derIss} as TunElem)
    } ) ;
    this.dataSource=tabTunnels;
  }

  clickRow=((row:TunElem)=> {  
    this.clickedRows.clear();
    this.clickedRows.add(row);
    this.router.navigateByUrl('./');
    this.router.navigateByUrl('/tunnel-detail/'+row.tunnel);})
}
