// Copyright (C) 2022 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.calendar.prototype.month
description: Leap second is a valid ISO string for a calendar in a property bag
features: [Temporal]
---*/

const instance = new Temporal.Calendar("iso8601");

const calendar = "2016-12-31T23:59:60";

const arg = { year: 1976, monthCode: "M11", day: 18, calendar };
const result = instance.month(arg);
assert.sameValue(
  result,
  11,
  "leap second is a valid ISO string for calendar"
);
