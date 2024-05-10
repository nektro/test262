// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-extensions-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
info: |
  requires serialize()
description: |
  pending
esid: pending
---*/// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

function test()
{
  // On my system, with an unfixed build where transfer-list processing is
  // quadratic, 5e5 elements makes this test take ~70s in a shell opt build.
  // Debug build is well into timeout-land at 300+s.  As long as at least *one*
  // platform times out for a quadratic algorithm, a regression should be
  // obvious.  (Time to run the test in even a debug shell is ~17s, well short
  // of timing out.)
  var transfers = [];
  for (var i = 0; i < 5e5; i++)
    transfers.push(new ArrayBuffer());

  // If serialization is quadratic in the length of |transfers|, the test will
  // time out.  If the test doesn't time out, it passed.
  serialize({}, transfers);
}

test();

