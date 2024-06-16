import { Routes } from '@angular/router';
import { PcTunnelsComponent } from './pc-tunnels/pc-tunnels.component';
import { TunnelDetailComponent } from './tunnel-detail/tunnel-detail.component';

export const routes: Routes = [
    { path: './', component: PcTunnelsComponent },
    { path: 'tunnel-detail/:tunnel', component: TunnelDetailComponent },
];
