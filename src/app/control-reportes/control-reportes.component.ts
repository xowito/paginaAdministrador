import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-control-reportes',
  templateUrl: './control-reportes.component.html',
  styleUrls: ['./control-reportes.component.css']
})
export class ControlReportesComponent implements OnInit {


  constructor(private authService:AuthService,
    private route: Router,
    ){}

    ngOnInit(){
        
    }

}
