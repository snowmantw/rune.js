'use strict';

import Playlang from './playlang.js';

var playlang = new Playlang();
playlang.start()
  .next(() => { console.log('>>>>> #0'); return 3; })
  .next((x) => { console.log('>>>>> #1', x); return x + 4;})
  .next((x) => { console.log('>>>>> #2', x); return x + 5;})
  .all(() => { return 1; },
      () => {
        return new Promise((r, j) => {
          setTimeout(() => { r(20); }, 1000);
        });
      })
  .next((rs) => {
    console.log('>>>>>>> rs: ', rs);
  })
  .done();

