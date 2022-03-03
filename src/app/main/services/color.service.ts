import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { BaseColor } from '../model/base-color.model';
import { Color } from '../model/color.model';
import { Filters } from '../model/filters.model';

const storageKey = 'colorList';
const halfValue = 127.5;
const hexBase = '0x';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  update = new Subject<string>();

  get colorRegexp(): RegExp {
    return /^[0-9A-F]{6}$/i;
  }

  filters: Filters = {
    red: false,
    green: false,
    blue: false,
    saturation: false,
    enabled: false
  }

  toRGB(hexValue: string) {
    const rgb = [
      hexBase + hexValue[0] + hexValue[1],
      hexBase + hexValue[2] + hexValue[2],
      hexBase + hexValue[4] + hexValue[5],
    ].map(v => +v);

    return rgb;
  }

  getSaturation(rgbValue: number[]) {

    const vals = rgbValue.map(v => v / 255);

    const cmin = Math.min(vals[0], vals[1], vals[2]);
    const cmax = Math.max(vals[0], vals[1], vals[2]);
    const delta  = cmax - cmin;

    let s, l;

    l = (cmax + cmin) / 2

    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);

    return s;
  }

  get colorList(): Observable<Color[]> {
    return of(this.deserializeList(this.colorListStr).filter(color => this.filterMatch(color)));
  }

  doClear() {
    this.localStorage.clear();
    this.update.next('update');
  }

  filterMatch(color: Color) {
    return this.filters.enabled ? this.filters.red && color.rgbValue[0] >= halfValue ||
    this.filters.green && color.rgbValue[1] >= halfValue ||
    this.filters.blue && color.rgbValue[0] >= halfValue ||
    this.filters.saturation && color.saturation >= 50 : true;
  }

  doApplyFilters(filters: Filters) {
    this.filters = filters;
    if(filters.red || filters.green || filters.blue || filters.saturation) {
      this.filters.enabled = true;
    }
    else {
      this.filters.enabled = false;
    }

    this.update.next('update');
  }

  doSubmitForm(baseColor: BaseColor): void {
    const rgbValue = this.toRGB(baseColor.color);
    const saturation = this.getSaturation(rgbValue);
    const hexValue = ['#', baseColor.color].join('');

    const newColor: Color = {
      rgbValue,
      saturation,
      hexValue,
      displayValue: baseColor.color.toUpperCase()
    }

    this.saveInStorage(newColor)
  }

  private saveInStorage(newColor: Color) {
    const list = this.deserializeList(this.colorListStr);

    list.push(newColor);
    list.sort(this.compare);

    this.localStorage.setItem(storageKey, this.serializeList(list));

    this.update.next('update');
  }

  private get colorListStr(): string {
    const list =  this.localStorage.getItem(storageKey) as string;
    if(list) {
      return list;
    }
    else return '';
  }

  compare(col1: Color, col2: Color) {
    return +col2.rgbValue.join('') - +col1.rgbValue.join('')
  }

  private get localStorage(): Storage {
    return window.localStorage;
  }

  private serializeList(colorList: Color[]) {
    return JSON.stringify(colorList);
  }

  private deserializeList(colorList: string): Color[] {
    if(colorList === '') {
      return [];
    }
    return JSON.parse(colorList);
  }
}
