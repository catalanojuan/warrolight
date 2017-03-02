import {ColorUtils} from "../utils/ColorUtils";
import {SoundBasedFunction} from "./SoundBasedFunction";

export class Func extends SoundBasedFunction{
  constructor(config, leds) {
    super(config, leds);
    this.averageVol = 0;
  }

  start(config, draw, done){
    this.lastVolume = new Array(this.numberOfLeds+1).join('0').split('').map(() => "#000000");
    this.time = 0;
    this.maxVolume = 0;

    super.start(config, draw, done)
  }

  // Override parent method
  drawFrame(draw, done){
    this.time += this.config.speed;

    let vol = this.averageVolume*this.config.multiplier*3+0.2;
    this.averageVol = (vol+2*this.averageVol)/3


    for(let i=0;i<this.numberOfLeds;i++) {
      let newColor = "#000000";
      if(i < (this.numberOfLeds)*this.averageVol && (Math.ceil(i/3)*3)%(Math.round(this.numberOfLeds/10))){
        let tone = 0.35;
        if((i/this.numberOfLeds) > 0.5){
          tone = 0.25;
        }
        if((i/this.numberOfLeds) > 0.7){
          tone = 0;
        }
        newColor = ColorUtils.HSVtoHex(tone, 1, Math.min(1, vol));
      }
      this.lastVolume[i] = newColor;
    }

    draw(this.lastVolume);
    done();
  }

  static presets(){
    return {
      fastDobleDesdeCentro: {speed: 5, doble: true, haciaAfuera: true},
    }
  }

  // Override and extend config Schema
  static configSchema(){
    let res = super.configSchema();
    res.multiplier = {type: Number, min: 0, max: 2, step: 0.01, default: 3};
    res.numberOfOnLeds = {type: Number, min: 1, max: 100, step: 1, default: 40};
    return res;
  }
}