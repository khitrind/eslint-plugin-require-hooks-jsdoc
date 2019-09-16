import {checkComments, ifCommentExist, createRule} from '../utils';
import {TSESTree} from '@typescript-eslint/experimental-utils';

function isHookName(s: string) {
    return /^use[A-Z0-9].*$/.test(s);
}


export const hooksRule = createRule({
    name: 'require-hooks-jsdoc',
    defaultOptions: [],
    meta: {
        type: 'suggestion',
        docs: {
            category: 'Stylistic Issues',
            description: 'Hook must have JSDoc.',
            recommended: 'error',
        },
        messages: {
            requireHookJSDoc: 'Hook must have JSDoc.',
        },
        schema: []
    },

    create(context) {
        let commentsList: number[];
        return {
            ['VariableDeclarator>Identifier']: (node: TSESTree.Identifier): void => {

                if (isHookName(node.name)) {
                  if (!ifCommentExist(node, commentsList)) {
                    context.report({
                        node,
                        loc: node.loc,
                        messageId: 'requireHookJSDoc'
                    });
                  }
                }
            },
            Program: (node: TSESTree.Program): void => {
                commentsList = checkComments(node);
            }
        };
    }
});
