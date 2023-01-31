export class Telex {
  parentElement: HTMLElement | null | undefined;
  imageContainer: HTMLDivElement | null;
  fullsizeImgUrl: string | null;

  constructor() {
    this.init();
  }

  init(): void {
    this.setEventListeners();
  }

  setEventListeners(): void {
    document.addEventListener('mouseover', (event: MouseEvent) => this.mouseOverAction(event));
    document.addEventListener('mouseout', (event: MouseEvent) => this.mouseOutAction(event));
    document.addEventListener('keydown', (event: KeyboardEvent) => this.keyDownAction(event));
  }

  setPreviewImageContainer(): HTMLDivElement {
    this.imageContainer = document.createElement('div');
    this.imageContainer.classList.add('image-zoomer');
    this.imageContainer.style.zIndex = '10';
    this.imageContainer.style.position = 'absolute';
    this.imageContainer.style.width = `600px`;
    this.imageContainer.style.height = `405px`;
    this.imageContainer.style.top = '-190px';
    this.imageContainer.style.left = '3px';
    this.imageContainer.style.border = '2px solid #777777';
    this.imageContainer.style.backgroundColor = 'white';
    this.imageContainer.style.padding = '3px';
    this.imageContainer.style.paddingBottom = '0';
    this.imageContainer.style.boxShadow = 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px';
    this.imageContainer.style.borderRadius = '5px';
    return this.imageContainer;
  }

  mouseOverAction(event: MouseEvent): void {
    this.cleanUp();
    const element = event.composedPath()[0] as HTMLElement;
    const elementType = (event.composedPath()[0] as HTMLElement).nodeName;
    if (elementType === 'IMG') {
      const srcset = element.getAttribute('srcset');
      const sources = srcset?.split(', ');

      let previewImgUrl = '';

      sources?.forEach((source: string) => {
        const [url, size] = source.split(' ');
        if (size === '2x') {
          previewImgUrl = url;
        } else if (size === '4x') {
          this.fullsizeImgUrl = url;
        }
      });

      const previewImageElement = document.createElement('img');

      if (previewImgUrl) {
        previewImageElement.setAttribute('src', previewImgUrl);
        previewImageElement.setAttribute('alt', 'Zoomed article photo');
        previewImageElement.onload = () => {
          this.imageContainer = this.setPreviewImageContainer();
          this.imageContainer.insertAdjacentElement('beforeend', previewImageElement);
          this.parentElement = element.parentNode?.parentNode?.parentNode?.parentNode?.querySelector(
            '.list__item__info'
          ) as HTMLElement;
          this.parentElement.style.position = 'relative';
          this.parentElement.insertAdjacentElement('afterbegin', this.imageContainer);
        };
      }
    }
  }

  mouseOutAction(event: MouseEvent): void {
    const elementType = (event.composedPath()[0] as HTMLElement).nodeName;
    if (elementType === 'IMG') {
      if (this.parentElement && this.imageContainer) {
        this.cleanUp();
      }
    }
  }

  keyDownAction(event: KeyboardEvent): void {
    if (this.imageContainer && this.fullsizeImgUrl && event.code === 'KeyT') {
      window.open(this.fullsizeImgUrl, '_blank')?.focus();
      this.cleanUp();
    }
  }

  cleanUp(): void {
    const allImageZoomers = document.querySelectorAll('.image-zoomer');
    allImageZoomers.forEach((element: Element) => element.remove());
    this.imageContainer = null;
    this.fullsizeImgUrl = null;
    this.parentElement = null;
  }
}
