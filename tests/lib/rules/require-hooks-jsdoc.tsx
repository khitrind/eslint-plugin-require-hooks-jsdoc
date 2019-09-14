import {hooksRule} from "../../../src/lib/rules/require-hooks-jsdoc"
import {RuleTester} from 'eslint';


const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2016}});
const ruleError = [
    {
        message: hooksRule.meta.docs.description,
    },
];

ruleTester.run('required-hooks-jsdoc', hooksRule, {
    valid: [
        {
            code: `/**
            *
            * This hook is uses for... 
            */
           useDef = () => useState('Apple')`,
        }, {
            code: `/**
            * @description This hook is uses for... 
            */
            useDef = () => useState('Apple')`,
        },
    ],
    invalid: [
        {
            code: 
            `/*** @description This hook is uses for... */



            const useDef = () => useState('Apple')`,
            errors: ruleError,
        }, {
            code: 
            `const useDef = () => useState('Apple')`,
            errors: ruleError,
        },
    ],
});
