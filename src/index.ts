class ImageZoomer {
  imageUrl: string | null = null;
  imageContainer: HTMLDivElement | null = null;
  article: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  clearDom(): void {
    if (this.imageContainer) {
      this.article?.removeChild(this.imageContainer);
    }
    this.imageContainer?.remove();
    this.imageContainer = null;
    this.article = null;
    this.imageUrl = null;
  }

  init(): void {
    document.addEventListener('mouseover', (event: MouseEvent) => {
      const element = event.composedPath()[0] as HTMLElement;
      const elementType = (event.composedPath()[0] as HTMLElement).nodeName;
      if (elementType === 'IMG') {
        this.article = element?.parentNode?.parentNode?.parentNode?.parentNode as HTMLElement;

        this.imageUrl = element.getAttribute('src');
        const bigImageElement = document.createElement('img');
        if (this.imageUrl) {
          bigImageElement.setAttribute('src', this.imageUrl);
        }
        this.imageContainer = document.createElement('div');
        this.imageContainer.classList.add('image-zoomer');
        this.imageContainer.style.zIndex = '1';
        this.imageContainer.style.position = 'relative';
        this.imageContainer.style.left = '180px';
        this.imageContainer.style.bottom = '350px';

        this.article.style.height = '234.66px';

        this.imageContainer.insertAdjacentElement('beforeend', bigImageElement);
        this.article.insertAdjacentElement('beforeend', this.imageContainer);
      }
    });

    document.addEventListener('mouseout', (event: MouseEvent) => {
      const elementType = (event.composedPath()[0] as HTMLElement).nodeName;
      if (elementType === 'IMG') {
        if (this.article && this.imageContainer) {
          this.clearDom();
        }
      }
    });

    document.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (this.imageContainer && this.imageUrl && event.code === 'KeyT') {
          window.open(this.imageUrl, '_blank')?.focus();
          this.clearDom();
        }
      },
      false
    );
  }
}

new ImageZoomer();
