import beep321Import from '../../../assets/beep321.flac';
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

const BEEP_321 = new sound(beep321Import);
const BEEP_GO = new sound(beepGoImport);
const BEEP_BREAK = new sound(beepBreakImport);
const BEEP_COMPLETED = new sound(beepCompletedImport);

export { BEEP_321, BEEP_GO, BEEP_BREAK, BEEP_COMPLETED }
