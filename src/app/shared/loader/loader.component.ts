import { Component, OnInit } from '@angular/core';import { NgxLoaderService } from 'src/app/services/core/ngx-loader.service';
;

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(
    public ngxLoader:NgxLoaderService
  ){

  }
  ngOnInit(): void {
    
  }
}
