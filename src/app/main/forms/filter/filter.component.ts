import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private colorService: ColorService
  ) { }

  filters = this.builder.group({
    red: [ false ],
    green: [ false ],
    blue: [ false ],
    saturation: [ false ]
  })

  ngOnInit(): void {
  }

  applyFilters() {
    const filters = this.filters.value;

    this.colorService.doApplyFilters(filters);
  }

}
