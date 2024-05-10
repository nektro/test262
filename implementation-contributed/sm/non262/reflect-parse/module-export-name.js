// Copyright (C) 2024 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes:
- non262-reflect-parse-shell.js
- non262-shell.js
- shell.js
flags:
- noStrict
features: []
description: |
  pending
esid: pending
---*/
function moduleRequest(source, attributes) {
  return {
    type: "ModuleRequest",
    source,
    attributes,
  };
}

function importAttribute(key, value) {
  return {
    type: "ImportAttribute",
    key,
    value,
  };
}

function importDecl(specifiers, moduleRequest) {
  return {
    type: "ImportDeclaration",
    specifiers,
    moduleRequest,
  };
}

function importSpec(id, name) {
  return {
    type: "ImportSpecifier",
    id,
    name,
  };
}

function exportDecl(declaration, specifiers, moduleRequest, isDefault) {
  return {
    type: "ExportDeclaration",
    declaration,
    specifiers,
    moduleRequest,
    isDefault,
  };
}

function exportSpec(id, name) {
  return {
    type: "ExportSpecifier",
    id,
    name,
  };
}

function exportNamespaceSpec(name) {
  return {
    type: "ExportNamespaceSpecifier",
    name,
  };
}

function assertModule(src, patt) {
  program(patt).assert(Reflect.parse(src, {target: "module"}));
}

assertModule(`
  import {"x" as y} from "module";
`, [
  importDecl([importSpec(literal("x"), ident("y"))], moduleRequest(literal("module"), [])),
]);

assertModule(`
  var x;
  export {x as "y"};
`, [
  varDecl([{id: ident("x"), init: null}]),
  exportDecl(null, [exportSpec(ident("x"), literal("y"))], null, false),
]);

assertModule(`
  export {x as "y"} from "module";
`, [
  exportDecl(null, [exportSpec(ident("x"), literal("y"))], moduleRequest(literal("module"), []), false),
]);

assertModule(`
  export {"x" as y} from "module";
`, [
  exportDecl(null, [exportSpec(literal("x"), ident("y"))], moduleRequest(literal("module"), []), false),
]);

assertModule(`
  export {"x" as "y"} from "module";
`, [
  exportDecl(null, [exportSpec(literal("x"), literal("y"))], moduleRequest(literal("module"), []), false),
]);

assertModule(`
  export {"x"} from "module";
`, [
  exportDecl(null, [exportSpec(literal("x"), literal("x"))], moduleRequest(literal("module"), []), false),
]);

assertModule(`
  export * as "x" from "module";
`, [
  exportDecl(null, [exportNamespaceSpec(literal("x"))], moduleRequest(literal("module"), []), false),
]);
if (getRealmConfiguration("importAttributes")) {
  assertModule(`
    import {"x" as y} from "module" with {type: "json"};
  `, [
    importDecl([importSpec(literal("x"), ident("y"))], moduleRequest(literal("module"), [importAttribute(ident("type"), literal("json"))])),
  ]);
  assertModule(`
    import {"x" as y} from "module" assert {type: "json"};
  `, [
    importDecl([importSpec(literal("x"), ident("y"))], moduleRequest(literal("module"), [importAttribute(ident("type"), literal("json"))])),
  ]);
}

