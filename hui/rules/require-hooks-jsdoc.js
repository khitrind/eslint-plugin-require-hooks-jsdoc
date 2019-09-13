"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function isHookName(s) {
    return /^use[A-Z0-9].*$/.test(s);
}
exports.hooksRule = {
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
                    if (!utils_1.ifCommentExist(node, commentsList)) {
                        const messageText = utils_1.getWarnMessageText('Hook must have JSDoc.', node);
                        context.report(messageText);
                    }
                }
            },
            Program: function (node) {
                commentsList = utils_1.checkComments(node);
            }
        };
    }
};
