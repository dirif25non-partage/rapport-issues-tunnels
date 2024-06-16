import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonModule } from '@angular/common';
import { Service,Issue } from '../service';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'tunnel-detail',
  standalone: true,
  templateUrl: './tunnel-detail.component.html',
  styleUrls: [ './tunnel-detail.component.scss' ],
  imports:[MatTableModule, CommonModule],
})
export class TunnelDetailComponent {
  tunnel!: string ;
  dataSource:Issue[]=[];
  displayedColumns: string[] = ['nom','date','porte','eclairage','surpr'];
  constructor( private route: ActivatedRoute ,  private service: Service ) {
    this.route.params.subscribe(params => {
      this.tunnel = params['tunnel']; 
     service.getEtatIss(this.tunnel).then((data:Issue[])=>
      {this.dataSource=data} )
    });
  }
  clickBt(){console.log(this.dataSource)}
}

