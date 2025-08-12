import { Injectable } from '@angular/core';
import { WindowService } from './window.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  public synth: any;
  public utterance!: SpeechSynthesisUtterance;
  isSpeaking = false;
  isPaused = false;
  currentText: string | null = null; // Track which text is being read

  constructor(private windowService: WindowService) {
    if (this.windowService.isBrowser()) {
      this.synth = window.speechSynthesis;
    }
  }

  speak(text: string) {
    if (!this.windowService.isBrowser()) return;

    // If the same text is paused → resume
    if (this.synth.paused && this.currentText === text) {
      this.synth.resume();
      this.isPaused = false;
      this.isSpeaking = true;
      return;
    }

    // If something else is speaking → stop and start new
    if (this.synth.speaking || this.currentText !== text) {
      this.synth.cancel();
    }

    // Start fresh with the new text
    this.currentText = text;
    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.lang = 'en-US';


    this.synth.speak(this.utterance);
    this.isSpeaking = true;
    this.isPaused = false;

    this.utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentText = null;
    };
  }

  pause() {
    if (this.windowService.isBrowser() && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPaused = true;
      this.isSpeaking = false;
    }
  }

  stop() {
    if (this.windowService.isBrowser()) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentText = null;
    }
  }
}
