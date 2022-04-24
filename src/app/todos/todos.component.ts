import {
  slideLeft,
  reusableAnimation,
  parameterizeFadeIn,
} from './../animations';
import {
  animate,
  animateChild,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { fade } from '../animations';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    trigger('headingAnimation', [
      transition(':enter', [
        /**
         * why I grouped the all query animation here?
         * ans: so that all of the animations run parallel.
         *
         * if I do not use group() here. then the query animation runs sequentially.
         *
         */
        group([
          query('h1', [
            style({ backgroundColor: 'green', transform: 'translateY(-25px)' }),
            animate(1500),
          ]),

          query('.form-control', [
            style({ transform: 'translateY(-35px)' }),
            animate(1000),
          ]),

          // this is how we can run child animation
          query('@todoAnimation', stagger(200, animateChild())),
        ]),
      ]),
    ]),

    trigger('todoAnimation', [
      transition(
        ':enter',
        // here how can I use parameterized animation. this params object is overwrite as a paramater
        useAnimation(parameterizeFadeIn, { params: { duration: '2000ms' } })
      ),
      transition(':leave', [
        style({ backgroundColor: 'red', textDecoration: 'line-through' }),
        animate(1000),
        // you can use useAnimation() or use customReusableAnimation directly
        // reusableAnimation
        useAnimation(reusableAnimation),
      ]),
    ]),

    // fade,
    // slideLeft,
    // here I use some custom animation, that is why I do not make any animation here like bellow.

    //   trigger('fade', [
    //     // declaring the void state here.
    //     // so that we do not declare styles for the void state inside the transition function.
    //     // state('void', style({ opacity: 0 })),

    //     /**

    //     transition('void => *', [
    //       // these two lines in bellow for demonstration...

    //       // this style() is basically a state
    //       // style({ backgroundColor: 'yellow', opacity: 0 }),
    //       // animate(2000, style({ backgroundColor: 'white', opacity: 1 })),

    //       // it means opacity is going to 1 after 2 seconds, which is a default state
    //       style({ opacity: 0 }),
    //       animate(2000),
    //     ]),
    //      */

    //     /**
    //     transition('* => void', [
    //       // it means opacity is going to 0 after 2 seconds
    //       animate(1000, style({ opacity: 0 })),
    //     ]),
    //      */

    //     // so, what are doing here. we are declering transition for two times here, which is
    //     // duplocation of code. To remove this duplication we can do this below:-
    //     // transition('void => *, * => void', animate(2000)),

    //     // we can use bidirectional operator '<=>'
    //     // transition('void <=> *', animate(2000)),

    //     // we can use elias ':enter' instead of 'void state => default(*) state'
    //     // and
    //     // we can use elias ':leave' instead of 'default(*) state => void state'

    //     // so
    //     // transition(':enter, :leave', animate(2000)),
    //   ]),
  ],
})
export class TodosComponent implements OnInit {
  items: any[] = [
    'Wash the dishes',
    'Call the accountant',
    'Apply for a car insurance',
  ];

  constructor() {}

  // this is how callback in animation works...
  todoAnimationStart($event: any) {
    console.log('Animation Started!');
    // alert('Animation started.');
    console.log($event);
  }

  // this is how callback in animation works...
  todoAnimationDone($event: any) {
    console.log('Animation Ended!');
    // alert('Animation ended.');
    console.log($event);
  }

  addItem(itemInput: HTMLInputElement) {
    this.items.splice(0, 0, itemInput.value);
    itemInput.value = '';
  }

  removeItem(item: string) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }

  ngOnInit(): void {}
}
