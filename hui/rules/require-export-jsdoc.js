"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
exports.requirJSDocForExport = {
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
            ExportNamedDeclaration: (node) => {
                if (!utils_1.ifCommentExist(node, commentsList)) {
                    const messageText = utils_1.getWarnMessageText('Need JSDoc for utils export.', node);
                    context.report(messageText);
                }
            },
            Program: (node) => {
                commentsList = utils_1.checkComments(node);
            }
        };
    }
};
