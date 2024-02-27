import { Component, OnInit } from '@angular/core';
import { HeroSlide } from './hero-slide.model';

import {
  animate,
  style,
  trigger,
  state,
  transition
} from '@angular/animations';

@Component({
  selector: 'gs-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  animations: [
    trigger('carousel', [
      state('slide1', style({
        'background-image': 'url("{{imagePath}}")',
        'background-size': 'cover',
        'background-position': '35% top'
      }), { params: { imagePath: '' } }),
      state('slide2', style({
        'background-image': 'url("{{imagePath}}")',
        'background-size': 'cover',
        'background-position': '35% top'
      }), { params: { imagePath: '' } }),
      state('slide3', style({
        'background-image': 'url("{{imagePath}}")',
        'background-size': 'cover',
        'background-position': '35% top'
      }), { params: { imagePath: '' } }),
      state('slide4', style({
        'background-image': 'url("{{imagePath}}")',
        'background-size': 'cover',
        'background-position': '35% top'
      }), { params: { imagePath: '' } }),
      transition('slide1 => slide2', animate("500ms ease-in")),
      transition('slide2 => slide3', animate("500ms ease-in")),
      transition('slide3 => slide4', animate("500ms ease-in")),
      transition('slide4 => slide1', animate("500ms ease-in"))
    ])
  ]

})
export class HeroComponent implements OnInit {

  slideCounter: number = 0;
  states = ['slide1', 'slide2', 'slide3', 'slide4']
  slides: HeroSlide[] = new Array<HeroSlide>(4)
  progessPercentage: number = 0;
  progressBarTimer: NodeJS.Timer;
  sliderStateTimer: NodeJS.Timer;

  constructor() {
    //todo: create web service to feed the slides
    this.slides[0] = { gameName: 'Portal 2', gameDescription: 'Portal 2 is a first-person perspective puzzle game. The Player takes the role of Chell in the single-player campaign', imagePath: '../../../assets/images/hero/wall1.jpg' }
    this.slides[1] = { gameName: 'Zelda: Breath of the Wild', gameDescription: 'Conversely to previous Legend of Zelda games, Breath of the Wild features a full open world, twelve times larger than the overworld in Twilight Princess', imagePath: '../../../assets/images/hero/wall2.png' }
    this.slides[2] = { gameName: 'Rise of the Tomb Raider', gameDescription: 'Rise of the Tomb Raider is an action-adventure video game developed by Crystal Dynamics. It is the sequel to the 2013 video game  ', imagePath: '../../../assets/images/hero/wall3.jpg' }
    this.slides[3] = { gameName: 'Fallout 4', gameDescription: 'Fallout 4 is a post-apocalyptic action role-playing video game developed by Bethesda Game Studios', imagePath: '../../../assets/images/hero/wall4.jpg' }
    this.setUpSlider()
  }

  ngOnInit() { }

  increaseBarPercentage() {
    this.progessPercentage += .15
  }

  changeSlide() {
    this.progessPercentage = 0;
    if (this.states[this.slideCounter] != 'slide4')
      this.slideCounter++
    else
      this.slideCounter = 0;
  }

  setUpSlider() {
    this.progressBarTimer = setInterval(() => {
      this.increaseBarPercentage()
    }, 10);
    this.sliderStateTimer = setInterval(() => {
      this.changeSlide();
    }, 7000);
  }

  passSlideRight() {
    this.slideCounter = (this.slideCounter != 3) ? this.slideCounter += 1 : 0
    this.progessPercentage = 0;
    this.restartTimers()
  }

  passSlideLeft() {
    this.slideCounter = (this.slideCounter != 0) ? this.slideCounter -= 1 : 3
    this.progessPercentage = 0;
    this.restartTimers()
  }

  restartTimers() {
    clearInterval(this.progressBarTimer)
    clearInterval(this.sliderStateTimer)
    this.setUpSlider()
  }
}
