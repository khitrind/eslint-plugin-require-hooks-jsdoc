function ifJsdoc(comment) {
    return !!comment.value.replace(/\s/g, '');
}


export function ifCommentExist(node, commentsList) {
    const nodeLine = node.loc.start.line;
    return (commentsList.includes(nodeLine - 2) || commentsList.includes(nodeLine - 1));
}


export function checkComments (node) {
    const commentsList = node.comments.reduce((acc, comment) => {
        if (ifJsdoc(comment)) {
            acc.push(comment.loc.end.line);
        }
        return acc;
    }, []);
    return commentsList;
}

export function getWarnMessageText (message, node) {
    const warnMessageText = {
        node,
        message: message,
        data: {
            identifier: node.name
        },
        loc: node.loc
    }
    return warnMessageText;
}