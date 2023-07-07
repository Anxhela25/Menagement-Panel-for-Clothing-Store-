import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat',
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: any): string {
    const parsedValue = parseFloat(value);
    const formattedValue = isNaN(parsedValue) ? NaN : parsedValue.toFixed(2);
    return `$${formattedValue}`;
  }
}
