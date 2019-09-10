'use strict'

function isHookName(s) {
    return /^use[A-Z0-9].*$/.test(s);
}

  
function isHook(node) {
    if (node.type === 'Identifier') {
        return isHookName(node.name);
    } else if (node.type === 'MemberExpression' && !node.computed && isHook(node.property)) {
        const obj = node.object;
        return obj.type === 'Identifier' && obj.name === 'React';
    } else {
        return false;
    }
}

function ifJsCommentExist(node, commentsList) {
    let nodeLine = node.loc.start.line - 1;
    return commentsList.includes(nodeLine);
}

function ifJsdoc(comment) {
    let text = comment.value.replace(/\s/g, '');
    return (text && comment.loc.start.line !== comment.loc.end.line);
}

module.exports = {
    meta: {
        docs: {
            description: "Required JsDoc comments for React hooks."
        },
        fixable: null,
        schema: []
    },

    create(context) {
        let commentsList;
        return {
            // CallExpression: function (node) {
            //     if (isHook(node.callee)) {
            //       if (!ifJsCommentExist(node, commentsList)) {
            //         context.report({
            //             node,
            //             message: 'The hook must have JsDoc.',
            //             data: {
            //                 identifier: node.name
            //             },
            //             loc: node.loc
            //         });
            //       }
            //     }
            // },

            VariableDeclaration: function (node) {
                if (isHookName(node.id.name)) {
                    if (!ifJsCommentExist(node, commentsList)) {
                        context.report({
                            node,
                            message: 'The hook must have JsDoc.',
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