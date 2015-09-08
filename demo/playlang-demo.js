'use strict';

import Playlang from './playlang.js';

var playlang = new Playlang();
playlang.start()
  .next((ctx) => { console.log('>>>>>>>>>> #0: 3 as a', 3); ctx.returns(3); }).as('a')
  .until((x) => x === 9)
  .loop((ctx, x) => {
    ctx.returns(x + 1);
  })
  .until((x) => x === 9)
  .loop((ctx, x) => {
    console.log('>>>>>>> I should not run!');
    ctx.returns(x + 1);
  })
  .until((x) => x === 10)
  .loop((ctx, x) => {
    console.log('>>>>>>> I should run once');
    ctx.returns(x + 1);
  })
  .next((ctx, x) => { console.log('>>>>>>>> #1: + 4 as b', x, x + 4); ctx.returns(x + 4);}).as('b')
  .next((ctx) => {
    console.log('>>>>>>>>> # + a b: ', ctx.a + ctx.b);
    ctx.returns(ctx.a + ctx.b);
  })
  .match()
    .case((n) => n < 17).to((ctx, a) => { ctx.returns(a + 1);})
    .case((n) => n > 17 ).to((ctx, b) => { ctx.returns(b + 999);})
    .case((n) => n === 17 ).to((ctx, c) => {
      new Promise((r, j) => {
        setTimeout(r, 2000);
      }).then(() => {
        console.log('>>>>>>>>> # after waiting 2 secs; + 1: ',c ,c + 1);
        ctx.returns(c+1);
      });
    })
    .case((n) => n === 17 ).to((ctx, d) => {
      ctx.returns(d - 255);
    })
  .end()
  .next((ctx, x) => { console.log('>>>>>>>> # + 5:', x, x + 5); ctx.returns(x + 5);})
  .all((ctx) => {ctx.returns(1); },
      (ctx) => {
        ctx.returns(new Promise((r, j) => {
          setTimeout(() => { r(20); }, 1000);
        }));
      })
  .next((ctx, rs) => {
    console.log('>>>>>>>>> # after |all|: ', rs);
    ctx.returns(rs);
  })
  .any((ctx, rs) => {ctx.returns(rs[0] + rs[1]); },
      (ctx, rs) => {
        ctx.returns(new Promise((r, j) => {
          setTimeout(() => { r(rs[0] - rs[1]); }, 1000);
        }));
      })
  .next((ctx, r) => {
    console.log('>>>>>>>>> # after |any|; reset as [1, 2, 3]: ', r);
    ctx.returns(1, 2, 3);
  })
  .next((ctx, rs) => {
    console.log('>>>>>>>>> # return multiple values will become array: ', rs);
    ctx.returns(1);
  })
  .next((ctx) => {
    console.log('>>>>> try to raise error or interruption');
    //ctx.raise('TRY TO RAISE');
    ctx.interrupt('TEST INTERRUPT');
    // `interrupts` should cancel the `returns`.
    ctx.returns(3);
  })
  .next((ctx, rs) => {
    console.log('>>>>>>> should not run!');
    ctx.returns(1);
  })
  .next((ctx, rs) => {
    console.log('>>>>>>> should not run!');
    ctx.returns(1);
  })
  .effect()
  .start()
  .run();

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
