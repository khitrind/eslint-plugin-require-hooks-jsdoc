import {checkComments, getWarnMessageText, ifCommentExist} from '../utils';
import {ExportNamedDeclaration, Comment, Program} from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';


export const requirJSDocForExport = {
    meta: {
        docs: {
            description: "Need JSDoc for utils export."
        },
        fixable: null,
        schema: []
    },

    create(context: any) {
        let commentsList: number[];

        return {
            ExportNamedDeclaration: (node: ExportNamedDeclaration): void => {
                if (!ifCommentExist(node, commentsList)) {
                    const messageText = getWarnMessageText('Need JSDoc for utils export.', node);
                    context.report(messageText);
                }
            },

            Program: (node: Program): void => {
                commentsList = checkComments(node);
            }
        };
    }
};
