import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
  standalone: false
})
export class ImageFallbackDirective {
  @Input() appImageFallback: string = 'assets/images/recipe-placeholder.jpg';

  constructor(private el: ElementRef) {}

  @HostListener('error') onError() {
    this.el.nativeElement.src = this.appImageFallback;
  }
}