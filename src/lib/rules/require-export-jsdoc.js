import {checkComments, getWarnMessageText, ifCommentExist} from '../utils';


export const requirJSDocForExport = {
    meta: {
        docs: {
            description: "Need JSDoc for utils export."
        },
        fixable: null,
        schema: []
    },

    create(context) {
        let commentsList;

        return {
            ExportNamedDeclaration: function (node) {
                if (!ifCommentExist(node, commentsList)) {
                    const messageText = getWarnMessageText(meta.docs.description, node);
                    context.report(messageText);
                }
            },

            Program: function (node) {
                commentsList = checkComments(node);
            }
        };
    }
};