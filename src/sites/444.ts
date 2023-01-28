export class FourFourFour {
  imageUrl: string | null;
  imageContainer: HTMLDivElement | null;
  article: HTMLElement | null;
  articleParent: HTMLElement | null;

  constructor() {
    this.fourFourFourImageZoomer();
  }

  destroyFourFourFourZoomer(): void {
    if (this.imageContainer) {
      this.articleParent?.removeChild(this.imageContainer);
    }
    this.imageContainer?.remove();
    this.imageContainer = null;

    if (this.article) {
      this.article.style.height = 'unset';
    }

    this.article = null;
    this.articleParent = null;
    this.imageUrl = null;
  }

  setImageContainer(): HTMLDivElement {
    this.imageContainer = document.createElement('div');
    this.imageContainer.classList.add('image-zoomer');
    this.imageContainer.style.zIndex = '1';
    this.imageContainer.style.position = 'relative';
    this.imageContainer.style.left = '180px';
    this.imageContainer.style.bottom = '350px';
    this.imageContainer.style.border = '2px solid #777777';
    this.imageContainer.style.backgroundColor = 'white';

    this.imageContainer.style.padding = '3px';
    this.imageContainer.style.paddingBottom = '0';
    this.imageContainer.style.boxShadow = 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px';
    this.imageContainer.style.borderRadius = '5px';

    return this.imageContainer;
  }

  mouseOverAction(event: MouseEvent): void {
    const element = event.composedPath()[0] as HTMLElement;
    const elementType = (event.composedPath()[0] as HTMLElement).nodeName;
    if (elementType === 'IMG') {
      this.article = element?.parentNode?.parentNode?.parentNode?.parentNode as HTMLElement;
      this.articleParent = (element?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode as HTMLElement).parentElement;
      const articleGrandParentHeight = this.articleParent?.getBoundingClientRect().height;

      this.imageUrl = element.getAttribute('src');
      const previewImageUrl = element.getAttribute('srcset')?.split(', ')[1].split(' ')[0];
      const bigImageElement = document.createElement('img');

      if (previewImageUrl) {
        bigImageElement.setAttribute('src', previewImageUrl);
      }

      this.imageContainer = this.setImageContainer();

      if (this.articleParent) {
        this.articleParent.style.height = `${articleGrandParentHeight}px`;
      }

      this.imageContainer.insertAdjacentElement('beforeend', bigImageElement);
      this.articleParent?.insertAdjacentElement('beforeend', this.imageContainer);
    }
  }

  mouseOutAction(event: MouseEvent): void {
    const elementType = (event.composedPath()[0] as HTMLElement).nodeName;
    if (elementType === 'IMG') {
      if (this.article && this.imageContainer) {
        this.destroyFourFourFourZoomer();
      }
    }
  }

  keyDownAction(event: KeyboardEvent): void {
    if (this.imageContainer && this.imageUrl && event.code === 'KeyT') {
      window.open(this.imageUrl, '_blank')?.focus();
      this.destroyFourFourFourZoomer();
    }
  }

  fourFourFourImageZoomer(): void {
    document.addEventListener('mouseover', (event: MouseEvent) => this.mouseOverAction(event));
    document.addEventListener('mouseout', (event: MouseEvent) => this.mouseOutAction(event));
    document.addEventListener('keydown', (event: KeyboardEvent) => this.keyDownAction(event));
  }
}
