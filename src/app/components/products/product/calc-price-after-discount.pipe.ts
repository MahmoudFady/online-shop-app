import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'clacPriceAfterDiscount',
})
export class CalcPriceAfterDiscountPipe implements PipeTransform {
  transform(price: number, discountPercentge: number) {
    const priceAfterDiscount =
      discountPercentge == 0
        ? price
        : price - price * (discountPercentge / 100);
    return Math.round(priceAfterDiscount);
  }
}
