import {checkComments, getWarnMessageText, ifCommentExist} from '../utils';

function isHookName(s) {
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

    create(context) {
        let commentsList;
        return {
            ['VariableDeclarator>Identifier']: function (node) {

                if (isHookName(node.name)) {
                  if (!ifCommentExist(node, commentsList)) {
                      const messageText = getWarnMessageText(meta.docs.description, node);
                    context.report(messageText);
                  }
                }
            },
            Program: function (node) {
                commentsList = checkComments(node);
            }
        };
    }
};