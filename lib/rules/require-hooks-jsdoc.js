'use strict'

function isHookName(s) {
    return /^use[A-Z0-9].*$/.test(s);
}


function ifCommentExist(node, commentsList) {
    const nodeLine = node.loc.start.line;
    return (commentsList.includes(nodeLine - 2) || commentsList.includes(nodeLine - 1));
}

function ifJsdoc(comment) {
    return !!comment.value.replace(/\s/g, '');
}

module.exports = {
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
                    context.report({
                        node,
                        message: 'Hook must have JSDoc.',
                        data: {
                            identifier: node.name
                        },
                        loc: node.loc
                    });
                  }
                }
            },
            Program: function (node) {
                commentsList = node.comments.reduce((acc, comment) => {
                    if (ifJsdoc(comment)) {
                        acc.push(comment.loc.end.line);
                    }
                    return acc;
                }, [])
            }
        };
    }
};