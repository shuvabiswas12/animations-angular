import {
  animate,
  animation,
  keyframes,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

export let reusableAnimation = animation(
  animate(
    '1s ease-out',
    keyframes([
      // here offset 0.2 means first 20% of keyframes
      style({ offset: 0.2, opacity: 1, transform: 'translateX(50px)' }),

      // here offset 1 means 100% of keyframes
      style({ offset: 1, opacity: 0, transform: 'translateX(-100%)' }),
    ])
  )
);

export let slide = trigger('slide', [
  transition(':enter', [style({ transform: 'translateX(-10px)' })]),

  transition(':leave', [useAnimation(reusableAnimation)]),
]);

export let fade = trigger('fade', [
  state('void', style({ opacity: 0 })),
  transition(':enter', [animate(2000)]),
]);

export let slideLeft = trigger('slideLeft', [
  //   state('void', style({ transform: 'translateX(-100%)' })),
  transition(':enter', [animate('.5s'), style({ opacity: 0 })]),

  transition(':leave', [
    // first time is for animate and second time is for delaying
    // animate('.5s 1s'),
    animate('.5s ease-in'),
    style({ color: 'red', transform: 'translateX(-100%)' }),
  ]),
]);

export let parameterizeFadeIn = animation(
  [style({ opacity: 0 }), animate('{{ duration }} {{ easing }}')],
  {
    params: {
      duration: '2s',
      easing: 'ease-out',
    },
  }
);
