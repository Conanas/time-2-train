import beep321Import from '../../../assets/beep321.wav';
import beepGoImport from '../../../assets/beepGo.mp3';
import beepBreakImport from '../../../assets/beepBreak.wav';
import beepCompletedImport from '../../../assets/beepCompleted.wav';

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  }
  this.stop = function () {
    this.sound.pause();
  }
}

export let BEEP_321 = new sound(beep321Import);
export let BEEP_GO = new sound(beepGoImport);
export let BEEP_BREAK = new sound(beepBreakImport);
export let BEEP_COMPLETED = new sound(beepCompletedImport);