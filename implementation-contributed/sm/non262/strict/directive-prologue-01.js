// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-shell.js
- non262-strict-shell.js
- shell.js
flags:
- noStrict
description: |
  pending
esid: pending
---*/// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

//-----------------------------------------------------------------------------
var BUGNUMBER = 601262;
var summary =
  "A string literal containing an octal escape before a strict mode " +
  "directive should be a syntax error";

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

try
{
  eval(" '\\145'; 'use strict'; ");
  throw new Error("no error thrown for eval");
}
catch (e)
{
  assert.sameValue(e instanceof SyntaxError, true,
           "wrong error for octal-escape before strict directive in eval");
}

try
{
  Function(" '\\145'; 'use strict'; ");
  throw new Error("no error thrown for Function");
}
catch (e)
{
  assert.sameValue(e instanceof SyntaxError, true,
           "wrong error for octal-escape before strict directive in Function");
}

try
{
  eval(" function f(){ '\\145'; 'use strict'; } ");
  throw new Error("no error thrown for eval of function");
}
catch (e)
{
  assert.sameValue(e instanceof SyntaxError, true,
           "wrong error for octal-escape before strict directive in eval of " +
           "function");
}

try
{
  Function(" function f(){ '\\145'; 'use strict'; } ");
  throw new Error("no error thrown for eval of function");
}
catch (e)
{
  assert.sameValue(e instanceof SyntaxError, true,
           "wrong error for octal-escape before strict directive in eval of " +
           "function");
}

eval("function notAnError1() { 5; '\\145'; function g() { 'use strict'; } }");

Function("function notAnError2() { 5; '\\145'; function g() { 'use strict'; } }");

function notAnError3()
{
  5;
  "\145";
  function g() { "use strict"; }
}

/******************************************************************************/

print("All tests passed!");
