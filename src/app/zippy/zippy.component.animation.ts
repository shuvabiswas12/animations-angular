import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const expandCollapse = trigger('expandAndCollapse', [
  state(
    'collapse',
    style({
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      overflow: 'hidden',
      opacity: 0,
    })
  ),
  state(
    'expand',
    style({
      height: '*',
      paddingTop: '*',
      paddingBottom: '*',
    })
  ),
  transition('collapse => expand', [
    // multi stage animation
    // this is called multi stage animation, because here are two animate() function, one after one. which are execute sequentially.
    animate(
      '200ms ease-out',
      style({
        height: '*',
        paddingTop: '*',
        paddingBottom: '*',
      })
    ),
    animate('1s', style({ opacity: 1 })),
  ]),

  transition('expand => collapse', [
    style({ opacity: 0.4 }),
    animate('200ms ease-out'),
  ]),
]);
