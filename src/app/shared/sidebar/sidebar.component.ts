import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  username:string='';
  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService){}


  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.username = params['username'];
    })
    
  }
  logout() {
    this.authService.clearToken();
    this.router.navigate(['/']);
  }
  
  goToReportes(){
    this.router.navigate([`/perfil/${this.username}/control-reportes`])
   }

  

}
