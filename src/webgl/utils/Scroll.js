import EventEmitter from "./EventEmitter.js";

export default class Scroll extends EventEmitter {
  constructor(data) {
    super();
    this.nextScroll = 0;
    this.scroll = 0;
    this.data = data;

    this.lerpSpeed = 0.05;
    this.updateSpeed = 5;

    window.addEventListener("mousewheel", (e) => {
      this.scrollUpdate(e);
    });
  }

  scrollUpdate(e) {
    this.nextScroll += e.deltaY * 0.01;

    if (this.nextScroll < 0) {
      this.nextScroll = this.data.length;
    } else if (this.nextScroll > this.data.length) {
      this.nextScroll = 0;
    }

    let interval = setInterval(() => {
      //Lerp the scroll
      this.scroll = this.lerp(this.scroll, this.nextScroll, this.lerpSpeed);

      //Clear interval si la valeur est égale au nextScroll
      if (
        this.nextScroll - 0.001 <= this.scroll &&
        this.nextScroll > this.scroll
      ) {
        clearInterval(interval);
      } else if (
        this.nextScroll + 0.001 >= this.scroll &&
        this.nextScroll < this.scroll
      ) {
        clearInterval(interval);
      }

      //Console log la semaine
      // console.log(this.data[Math.round(this.scroll)].week)
      //Log les values de scroll
      // console.log(this.nextScroll, this.scroll);
    }, this.updateSpeed);
  }

  getScrollValue() {
    return this.scroll;
  }

  getDataValue() {
    return this.data[Math.round(this.scroll)];
  }

  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }
}
