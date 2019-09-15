import {checkComments, getWarnMessageText, ifCommentExist} from '../utils';
import {TSESTree} from '@typescript-eslint/experimental-utils';


export const requirJSDocForExport = {
    meta: {
        docs: {
            description: "Need JSDoc for utils export."
        },
        fixable: null,
        schema: []
    },

    create(context: any) {
        let commentsList: number[];

        return {
            ExportNamedDeclaration: (node: TSESTree.ExportNamedDeclaration): void => {
                if (!ifCommentExist(node, commentsList)) {
                    const messageText = getWarnMessageText('Need JSDoc for utils export.', node);
                    context.report(messageText);
                }
            },

            Program: (node: TSESTree.Program): void => {
                commentsList = checkComments(node);
            }
        };
    }
};
