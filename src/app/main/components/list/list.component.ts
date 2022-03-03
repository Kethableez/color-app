import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private colorService: ColorService) { }

  list = this.colorService.colorList;

  ngOnInit(): void {
    this.colorService.update.subscribe(() => this.list = this.colorService.colorList)
  }
}
