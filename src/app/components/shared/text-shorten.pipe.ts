import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'textShorten',
})
export class TextShortenPipe implements PipeTransform {
  transform(text: string, length: number) {
    const shorentText =
      text.length > length ? text.slice(0, length) + ' . . .' : text;
    return shorentText;
  }
}
