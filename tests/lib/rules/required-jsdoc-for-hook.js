'use strict';

const rule = require('../../../../lib/rules/require-hooks-jsdoc');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2016}});
const ruleError = [
    {
        message: rule.meta.docs.description,
    },
];

ruleTester.run('ginny/no-compound-selector', rule, {
    valid: [
        {
            code: `/**
            *
            * This hook is uses for... 
            */
            [StaticRange, value] = useSate('Apple')`,
        }, {
            code: `/**
            * @description This hook is uses for... 
            */
            [StaticRange, value] = useSate('Apple')`,
        },
    ],
    invalid: [
        {
            code: `/*** @description This hook is uses for... */
            [StaticRange, value] = useSate('Apple')`,
            errors: ruleError,
        }, {
            code: `// asddsa
            [StaticRange, value] = useSate('Apple')`,
            errors: ruleError,
        },
        {
            code: `[StaticRange, value] = useSate('Apple')`,
            errors: ruleError,
        },
    ],
});