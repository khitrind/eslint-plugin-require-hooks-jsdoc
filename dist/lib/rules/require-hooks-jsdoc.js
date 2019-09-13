"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hooksRule = void 0;

var _utils = require("../utils");

function isHookName(s) {
  return /^use[A-Z0-9].*$/.test(s);
}

const hooksRule = {
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
      ['VariableDeclarator>Identifier']: function VariableDeclaratorIdentifier(node) {
        if (isHookName(node.name)) {
          if (!(0, _utils.ifCommentExist)(node, commentsList)) {
            const messageText = (0, _utils.getWarnMessageText)('Hook must have JSDoc.', node);
            context.report(messageText);
          }
        }
      },
      Program: function Program(node) {
        commentsList = (0, _utils.checkComments)(node);
      }
    };
  }

};
exports.hooksRule = hooksRule;