import {requirJSDocForExport} from '../../../src/lib/rules/require-export-jsdoc';
import {ruleTester} from '../utils';




ruleTester.run('required-export-jsdoc', requirJSDocForExport, {
    valid: [
        {
            code: `/**
            *
            * This hook is uses for...
            */
           export const useDef = () => useState('Apple')`,
        }, {
            code: `/**
            * @description This hook is uses for...
            */
            export const useDef = () => useState('Apple')`,
        },
    ],
    invalid: [],
});
