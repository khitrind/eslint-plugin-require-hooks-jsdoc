import {checkComments, getWarnMessageText, ifCommentExist} from '../utils';
import {TSESTree} from '@typescript-eslint/experimental-utils';

function isHookName(s: string) {
    return /^use[A-Z0-9].*$/.test(s);
}


export const hooksRule = {
    meta: {
        docs: {
            description: "Hook must have JSDoc."
        },
        fixable: null,
        schema: []
    },

    create(context: any) {
        let commentsList: number[];
        return {
            ['VariableDeclarator>Identifier']: (node: TSESTree.Identifier): void => {

                if (isHookName(node.name)) {
                  if (!ifCommentExist(node, commentsList)) {
                      const messageText = getWarnMessageText('Hook must have JSDoc.', node);
                    context.report(messageText);
                  }
                }
            },
            Program: (node: TSESTree.Program): void => {
                commentsList = checkComments(node);
            }
        };
    }
};
