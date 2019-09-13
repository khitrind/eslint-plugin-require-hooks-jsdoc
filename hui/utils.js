"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ifJsdoc(comment) {
    return !!comment.value.replace(/\s/g, '');
}
function ifCommentExist(node, commentsList) {
    const nodeLine = node.loc.start.line;
    return (commentsList.includes(nodeLine - 2) || commentsList.includes(nodeLine - 1));
}
exports.ifCommentExist = ifCommentExist;
function checkComments(node) {
    const commentsList = node.comments.reduce((acc, comment) => {
        if (ifJsdoc(comment)) {
            acc.push(comment.loc.end.line);
        }
        return acc;
    }, []);
    return commentsList;
}
exports.checkComments = checkComments;
function getWarnMessageText(message, node) {
    const warnMessageText = {
        node,
        message: message,
        data: {
            identifier: node.name
        },
        loc: node.loc
    };
    return warnMessageText;
}
exports.getWarnMessageText = getWarnMessageText;
