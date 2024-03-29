import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { Utility } from '../app-util';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.less']
})
export class ViewerComponent {

  url:string | null;
  back:string | null;
  cors:string | null;

  numPages: number = 0;
  isMobile:boolean = Utility.mobileAndTabletCheck();

  page:number = 1;

  referenceWidth = window.innerWidth/3;

  constructor(private route: ActivatedRoute, private http:HttpClient){
    console.log("isMobile: "+this.isMobile);
    this.url = this.route.snapshot.queryParamMap.get("url");
    this.back = this.route.snapshot.queryParamMap.get("back");
    this.cors = this.route.snapshot.queryParamMap.get("cors");
    if(this.url && this.cors){
      this.http.get(this.url).subscribe({
        next: (res)=>{ console.log(res);},
        error: (err)=>{console.error(err);},
        complete: ()=>{console.log("complete")}
      });
    }
  }

  callBackFn(pdf: PDFDocumentProxy) {
    // do anything with "pdf"
    this.numPages=pdf.numPages;
  }

  react(event:MouseEvent){
    console.log("Click Event: ",event);
    let target:any = event.target;
    if(target && target.id=="close"){
      this.goback();
      event.stopImmediatePropagation();
    }
    if(event.clientX<this.referenceWidth){
      this.prev();
    }else if(event.clientX>2*this.referenceWidth){
      this.next();
    }

  }

  next(){
    if(this.page>=this.numPages)return;
    this.page++;
  }

  prev(){
    if(this.page<=1)return;
    this.page--;
  }

  goback(){
    if(this.back){
      console.log("redirecting to "+this.back);
      window.location.href=this.back;
    }
  }
}
