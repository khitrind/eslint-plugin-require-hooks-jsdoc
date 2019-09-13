import {hooksRule} from './rules/require-hooks-jsdoc';
import {requirJSDocForExport} from './rules/require-export-jsdoc'

module.exports = {
    rules: {
        'require-hooks-jsdoc': hooksRule,
        'require-export-jsdoc': requirJSDocForExport
    },
};
