import {checkComments, ifCommentExist, createRule} from '../utils';
import {TSESTree} from '@typescript-eslint/experimental-utils';



export const requirJSDocForExport = createRule({
    name: 'require-export-jsdoc',
    defaultOptions: [],
    meta: {
        type: 'suggestion',
        docs: {
            category: 'Stylistic Issues',
            description: "Need JSDoc for utils export.",
            recommended: 'error',
        },
        messages: {
            requiredUtilsJSDoc: 'Need JSDoc for utils export.',
        },
        schema: []
    },

    create(context) {
        let commentsList: number[];

        return {
            ExportNamedDeclaration: (node: TSESTree.ExportNamedDeclaration): void => {
                if (!ifCommentExist(node, commentsList)) {
                    // const messageText = getWarnMessageText('Need JSDoc for utils export.', node, 'requiredUtilsJSDoc');
                    context.report({
                        node,
                        loc: node.loc,
                        messageId: 'requiredUtilsJSDoc',
                    });
                }
            },

            Program: (node: TSESTree.Program): void => {
                commentsList = checkComments(node);
            }
        };
    }
});
