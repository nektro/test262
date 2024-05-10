// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-shell.js
- non262-strict-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*//* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */

/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

/*
 * In strict mode code, 'let' and 'const' declarations may not bind
 * 'eval' or 'arguments'.
 */
assert.sameValue(testLenientAndStrict('let eval;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);
assert.sameValue(testLenientAndStrict('let x,eval;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);
assert.sameValue(testLenientAndStrict('let arguments;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);
assert.sameValue(testLenientAndStrict('let x,arguments;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);
assert.sameValue(testLenientAndStrict('const eval = undefined;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);
assert.sameValue(testLenientAndStrict('const x = undefined,eval = undefined;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);
assert.sameValue(testLenientAndStrict('const arguments = undefined;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);
assert.sameValue(testLenientAndStrict('const x = undefined,arguments = undefined;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);

/*
 * In strict mode code, 'let' declarations appearing in 'for'
 * or 'for in' statements may not bind 'eval' or 'arguments'.
 */
assert.sameValue(testLenientAndStrict('for (let eval in [])break;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);
assert.sameValue(testLenientAndStrict('for (let [eval] in [])break;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);
assert.sameValue(testLenientAndStrict('for (let {x:eval} in [])break;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);
assert.sameValue(testLenientAndStrict('for (let arguments in [])break;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);
assert.sameValue(testLenientAndStrict('for (let [arguments] in [])break;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);
assert.sameValue(testLenientAndStrict('for (let {x:arguments} in [])break;',
                              parsesSuccessfully,
                              parseRaisesException(SyntaxError)),
         true);

