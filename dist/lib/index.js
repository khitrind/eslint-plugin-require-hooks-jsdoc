"use strict";

var _requireHooksJsdoc = require("./rules/require-hooks-jsdoc");

var _requireExportJsdoc = require("./rules/require-export-jsdoc");

module.exports = {
  rules: {
    'require-hooks-jsdoc': _requireHooksJsdoc.hooksRule,
    'require-export-jsdoc': _requireExportJsdoc.requirJSDocForExport
  }
};