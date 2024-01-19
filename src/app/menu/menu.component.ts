import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { User } from '../app.model';
import { updateCurrentUser } from 'firebase/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent {

  @Output()
  close = new EventEmitter();

  active:string="";

  user?:User;

  menus:Menu[]=[];

  constructor(public router:Router, public route:ActivatedRoute, public firestore: FirestoreService){
    this.active = this.router.url;
    this.user = firestore.user;
    this.load();
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.active = this.router.url;
      }
    });
    
    
    firestore.refreshUser.subscribe(user=>{this.user=user;this.load();});
  }

  load(){
    this.menus=[];
    if(!this.user){
      this.menus.push({name:"Design",icon:"architecture",route:"home/design"});
      this.menus.push({name:"Develop",icon:"code",route:"home/develop"});
      this.menus.push({name:"Deploy",icon:"construction",route:"home/deploy"});
    }
    else if(this.user.role=="ADMIN"){
      this.menus.push({name:"Home",icon:"home",route:"home"});
      this.menus.push({name:"Admin",icon:"settings",route:"admin"});
      this.menus.push({name:"Categories",icon:"category",route:"categories"});
      this.menus.push({name:"Courses",icon:"menu_book",route:"courses"});
      this.menus.push({name:"Topics",icon:"menu_book",route:"topics"});
      this.menus.push({name:"Notifications",icon:"notifications",route:"notifications"});
      this.menus.push({name:"Logout",icon:"logout",route:"logout"});
    }
    else if(this.user.role=="CLIENT"){
      this.menus.push({name:"Home",icon:"home",route:"home"});
      this.menus.push({name:"Assessments",icon:"assignment",route:"assessments"});
      this.menus.push({name:"Notifications",icon:"notifications",route:"notifications"});
      this.menus.push({name:"Logout",icon:"logout",route:"logout"});
    }
    else if(this.user.role=="USER"){
      this.menus.push({name:"Design",icon:"architecture",route:"home/design"});
      this.menus.push({name:"Develop",icon:"code",route:"home/develop"});
      this.menus.push({name:"Deploy",icon:"construction",route:"home/deploy"});
      this.menus.push({name:"Logout",icon:"logout",route:"logout"});
    }
  }


  focus(view:string){
    this.router.navigate([view]);
    this.close.emit(true);
  }

}

type Menu = {
  name:string,
  icon:string,
  route:string
}
