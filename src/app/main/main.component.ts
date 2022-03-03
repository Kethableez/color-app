import { Component, OnInit } from '@angular/core';
import { ColorService } from './services/color.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
  }

  clear() {
    this.colorService.doClear();
  }
}
