import { Component, Input, OnInit } from '@angular/core';
import { Color } from '../../model/color.model';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color-box',
  templateUrl: './color-box.component.html',
  styleUrls: ['./color-box.component.scss']
})
export class ColorBoxComponent implements OnInit {

  @Input()
  color?: Color;

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {

  }

}
