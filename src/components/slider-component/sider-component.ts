import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators/custom-element";
import { property } from "lit/decorators/property";
import { queryAsync } from "lit/decorators/query-async";
import { state } from "lit/decorators/state";
import style from "./slider-component.styles.scss";

@customElement("slider-component")
export class SliderComponent extends LitElement {
  @property() height: number = 800;

  @property() width: number = 250;

  @property() transition: number = 1;


  @queryAsync(".slots")
  slots: Promise<HTMLDivElement>;

  @queryAsync("#canary")
  canary: Promise<HTMLDivElement>;

  constructor() {
    super();
    this.slots.then((element) => {
      this.slider = element;
      this.mountListeners();
    });

    window.addEventListener("resize", this.resizeHandler);

      this.canary.then(element => {
          this.centerPosition = (element.offsetWidth / 2) - this.width / 2;
          this.slider.style.left = `${this.centerPosition}px`;
      });
  }

    centerPosition: number = 0;

  slider: HTMLDivElement;

  currentSlideIndex: number = 0;

  @state()
  get slidable(): boolean {
    return (
      this.width * this.slideAmount >
      this.shadowRoot.getElementById("canary").offsetWidth
    );
  }

  @state()
  slideAmount: number = 1;

  // The position where the click started
  @state()
  dragBeginning = 0;

  @state()
  dragPosition = 0;

  get center(): Promise<number> {
    return this.canary.then(element => (element.offsetWidth / 2) - this.width / 2);
  }

  allowShift = true;

  static styles = [style];

  render(): TemplateResult {
    return html`
      <div id="canary" style="width: 100%"></div>
      <div class="slot-container">
        <div class="slots" style="width: ${this.width * this.slideAmount}px">
          <div class="slider">
            <slot @slotchange=${this.handleSlotChange}></slot>
          </div>
        </div>
      </div>
    `;
  }


  private unmountListener(): void {
    this.slider.onmousedown = null;
    this.slider.removeEventListener("touchstart", this.dragStart);
    this.slider.removeEventListener("touchmove", this.dragAction);
    this.slider.removeEventListener("touchend", this.dragEnd);
  }

  private mountListeners(): void {
    this.slider.onmousedown = this.dragStart;
    this.slider.addEventListener("touchstart", this.dragStart);
    this.slider.addEventListener("touchmove", this.dragAction);
    this.slider.addEventListener("touchend", this.dragEnd);
  }

  firstUpdated(_changedProperties: any) {
    super.firstUpdated(_changedProperties);

  }

  private calculateBeginning(touchLocation: number): void {
    this.dragBeginning = touchLocation - this.slider.offsetLeft;
  }

  resizeHandler: () => void = () => {
    if (this.slidable && !this.slider.onmousedown) {
      this.mountListeners();
    } else if (!this.slidable && this.slider.onmousedown) {
      this.unmountListener();
    }
  };

  handleSlotChange(): void {
    const slot: HTMLSlotElement = this.shadowRoot.querySelector("slot");

    const elements = slot.assignedElements();
    this.slideAmount = elements.length;

    for (let i = 0; i < elements.length; i++) {
      const element: HTMLElement = elements[i] as HTMLElement;
      element.classList.add("slot-item");
      element.style.width = `${this.width}px`;
    }
  }


  private completeSlide() {
    this.slider.style.transition = `all ${this.transition}s`;

      const location = (this.dragBeginning - this.dragPosition) * -1;

      
      console.log(location, this.center, this.width);
    const index = Math.round(
      ((this.dragBeginning - this.dragPosition) * -1) / this.width
    );


    let nearestIndex = index;
    if (index + 1 > this.slideAmount) {
      nearestIndex = this.slideAmount - 1;
    } else if (index < 0) {
      nearestIndex = 0;
    }

    const nearest = nearestIndex * this.width;

    //this.slider.style.left = `${nearest}px`;

    setTimeout(() => {
      this.slider.style.transition = null;
    }, this.transition * 1000);
  }


  dragEnd: (e: Event) => void = (e: Event) => {
    e.preventDefault();
    this.completeSlide();
    document.onmouseup = null;
    document.onmousemove = null;
  };

  dragAction: (e: Event) => void = (e: Event) => {
    if (e.type == "touchmove") {
      this.dragPosition = (e as TouchEvent).touches[0].clientX;
    } else {
      this.dragPosition = (e as DragEvent).clientX;
    }
    this.slider.style.left = `${
      (this.dragBeginning - this.dragPosition) * -1
    }px`;
  };

  dragStart: (e: Event) => void = (e: Event) => {
    e.preventDefault();

    if (e.type == "touchstart") {
      this.calculateBeginning((e as TouchEvent).touches[0].pageX);
      document.onmousemove = this.dragAction;
    } else {
      this.calculateBeginning((e as DragEvent).pageX);
      document.onmousemove = this.dragAction;
      document.onmouseup = this.dragEnd;
    }
  };
}
