"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const require_hooks_jsdoc_1 = require("./rules/require-hooks-jsdoc");
const require_export_jsdoc_1 = require("./rules/require-export-jsdoc");
module.exports = {
    rules: {
        'require-hooks-jsdoc': require_hooks_jsdoc_1.hooksRule,
        'require-export-jsdoc': require_export_jsdoc_1.requirJSDocForExport
    },
};
