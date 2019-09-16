import {Node, Comment, Program} from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';
import {RuleCreator} from '@typescript-eslint/experimental-utils/dist/eslint-utils/RuleCreator';

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

export function getWarnMessageText (message: string, node: Node, messageId: string) {
    const warnMessageText = {
        node,
        message,
        loc: node.loc,
        messageId,
    }
    return warnMessageText;
}

export const createRule = RuleCreator(
    name =>
      `https://github.yandex-team.ru/zen/code/tree/master/zen-front/rezen/eslint-plugin-zen/docs/rules/${name}.md`
  );