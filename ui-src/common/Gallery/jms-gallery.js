import {Component, ChangeDetectorRef, HostListener, Input} from '@angular/core';

@Component({
  selector: 'jms-gallery',
  template: require('./jms-gallery.html'),
  styles: [require('./jms-gallery.css')]
})
export class jmsGallery implements AfterViewInit {
  @Input() picList = [];
  currentIndex = 0;
  imageUrl = {};
  showNext = 1;
  status = '';
  showRowThumbs = 0;
  showColThumbs = 0;

  constructor(changeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }

  ngAfterViewInit() {
    this.picList.forEach((item, index, list) => {
      list[index].thumbUrl = item.smFolder + item.FileName;
    });
    this.setImage();
  }
  
  @HostListener('window:keydown', ['$event'])
  onKeypress = event => {
    let intKey = (window.Event) ? event.which : event.keyCode;
    switch (intKey) {
      case 39: this.onNext(); event.preventDefault(); break;
      case 37: this.onPrev(); event.preventDefault(); break;
    }
  }
  onPrev = () => {
    this.currentIndex -= 1;
    this.setImage();
  }
  onNext = () => {
    this.currentIndex += 1;
    this.setImage();
  }
  onThumbClick = index => {
    this.currentIndex = index;
    this.setImage();
  }
  onShowColThumb = () => {
    this.showColThumbs = 1;
    this.showRowThumbs = 0;
    this.changeDetectorRef.detectChanges();
  }
  onShowRowThumb = () => {
    this.showColThumbs = 0;
    this.showRowThumbs = 1;
    this.changeDetectorRef.detectChanges();
  }
  onCloseThumbs = () => {
    this.showColThumbs = 0;
    this.showRowThumbs = 0;
    this.changeDetectorRef.detectChanges();
  }
  setImage = () => {
    let imageSrc = this.picList[this.currentIndex].lgFolder + this.picList[this.currentIndex].FileName;
    let imageUrl = `url(${imageSrc})`;
    this.showNext = (this.currentIndex < (this.picList.length - 1));
    this.imageUrl = {'background-image': imageUrl};
    this.status = (this.currentIndex + 1) + '/' + this.picList.length;
    if (this.showColThumbs) {
      let currentElementID = `imgc${this.currentIndex}`;
      let currentElement = document.getElementById(currentElementID);
      if (currentElement) {
        let parentElement = document.getElementById('colThumbs');
        parentElement.scrollTop = currentElement.offsetTop - (parentElement.clientHeight / 2);
      }
    }
    if (this.showRowThumbs) {
      let currentElementID = `imgr${this.currentIndex}`;
      let currentElement = document.getElementById(currentElementID);
      if (currentElement) {
        let parentElement = document.getElementById('rowThumbs');
        parentElement.scrollLeft = currentElement.offsetLeft - (parentElement.clientWidth / 2);
      }
    }
    this.changeDetectorRef.detectChanges();
  }
}
jmsGallery.parameters = [[ChangeDetectorRef]];
