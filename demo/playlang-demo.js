'use strict';

import Playlang from './playlang.js';

var playlang = new Playlang();
playlang.start()
  .next((ctx) => { console.log('>>>>> #0'); ctx.returns(3); }).as('a')
  .next((ctx, x) => { console.log('>>>>> #1', x); ctx.returns(x + 4);}).as('b')
  .next((ctx) => {
    ctx.returns(ctx.a + ctx.b);
  })
  .match()
    .case((n) => n < 10).to((ctx, a) => { ctx.returns(a + 1);})
    .case((n) => n > 10 ).to((ctx, b) => { ctx.returns(b + 999);})
    .case((n) => n === 10 ).to((ctx, c) => {
      new Promise((r, j) => {
        setTimeout(r, 2000);
      }).then(() => {
        ctx.returns(c+1);
      });
    })
    .case((n) => n === 10 ).to((ctx, d) => {
      ctx.returns(d - 255);
    })
  .end()
  .next((ctx, x) => { console.log('>>>>> #2', x); ctx.returns(x + 5);})
  .all((ctx) => {ctx.returns(1); },
      (ctx) => {
        ctx.returns(new Promise((r, j) => {
          setTimeout(() => { r(20); }, 1000);
        }));
      })
  .any((ctx, rs) => {ctx.returns(rs[0] + rs[1]); },
      (ctx, rs) => {
        ctx.returns(new Promise((r, j) => {
          setTimeout(() => { r(rs[0] - rs[1]); }, 1000);
        }));
      })
  .next((ctx, rs) => {
    console.log('>>>>>>> rs: ', rs);
    ctx.returns(1);
  })
  .done();
  // TODO: done --> run!

/*

fn = (ctx, a, b) => {
  var p = new Playlang()
  ctx.returns(p.start().next((ctx) => {
    // It's good to shadowing the outer one,
    // since we already booked to return that.
    ctx.returns(a + b);
  }));
};

// DONT USE; NOT IMPLEMENTED INTENTIONALLY
gn = (ctx, a, b) => {
  var p = new Playlang()
  ctx.returns(new Promise((r, j) => {
    setTimeout(r(a - b), 1000);
  }).then((result) => {
    return result + 1;
  }));
};

hn = (ctx, a, b) => {
  var p = new Playlang()
  (new Promise((r, j) => {
    setTimeout(r(a - b), 1000);
  }).then((result) => {
    // Use a closure to return it,
    // just like other ordinary functions.
    ctx.returns(result + 1);
  });
};

 */
