import {Node, Comment, Program} from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';

function ifJsdoc(comment: Comment): boolean {
    return !!comment.value.replace(/\s/g, '');
}


export function ifCommentExist(node: Node, commentsLineList: number[]) {
    const nodeLine = node.loc.start.line;
    return (commentsLineList.includes(nodeLine - 2) || commentsLineList.includes(nodeLine - 1));
}


export function checkComments (node: Program) {
    let commentsList;
    if (node.comments) {
        commentsList = node.comments.reduce((acc: number[], comment: Comment) => {
            if (ifJsdoc(comment)) {
                acc.push(comment.loc.end.line);
            }
            return acc;
        }, []);
    }
    return commentsList || [];
}

export function getWarnMessageText (message: string, node: any) {
    const warnMessageText = {
        node,
        message,
        data: {
            identifier: node.name
        },
        loc: node.loc
    }
    return warnMessageText;
}
