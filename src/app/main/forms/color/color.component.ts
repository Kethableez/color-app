import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseColor } from '../../model/base-color.model';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private colorService: ColorService
  ) { }

  colorForm = this.builder.group({
    color: ['', [Validators.pattern(this.colorService.colorRegexp), Validators.required]]
  })

  ngOnInit(): void {
  }

  onSubmit() {
    const newColor: BaseColor = this.colorForm.value;
    this.colorService.doSubmitForm(newColor);
  }

}
