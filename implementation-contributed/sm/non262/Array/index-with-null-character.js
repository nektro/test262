// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-Array-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*//*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

var testArray = [1, 2, 3]
assert.sameValue(testArray['0' + '\0'], undefined);
assert.sameValue(testArray['1' + '\0' + 'aaaa'], undefined)
assert.sameValue(testArray['\0' + '2'], undefined);
assert.sameValue(testArray['\0' + ' 2'], undefined);

testArray['\0'] = 'hello';
testArray[' \0'] = 'world';
assert.sameValue(testArray['\0'], 'hello');
assert.sameValue(testArray[' \0'], 'world');

if (typeof assert.sameValue == 'function')
