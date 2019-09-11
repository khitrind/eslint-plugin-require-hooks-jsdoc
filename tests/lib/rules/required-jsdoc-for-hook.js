'use strict';

const rule = require('../../../../lib/rules/require-hooks-jsdoc');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2016}});
const ruleError = [
    {
        message: rule.meta.docs.description,
    },
];

ruleTester.run('required-hooks-jsdoc', rule, {
    valid: [
        {
            code: `/**
            *
            * This hook is uses for... 
            */
            [StaticRange, value] = useState('Apple')`,
        }, {
            code: `/**
            * @description This hook is uses for... 
            */
            useDef = () => useState('Apple')`,
        },
    ],
    invalid: [
        {
            code: `/*** @description This hook is uses for... */
            useDef = () => useState('Apple')`,
            errors: ruleError,
        }, {
            code: `// asddsa
            useDef = () => useState('Apple')`,
            errors: ruleError,
        },
        {
            code: `useDef = () => useState('Apple')`,
            errors: ruleError,
        },
    ],
});