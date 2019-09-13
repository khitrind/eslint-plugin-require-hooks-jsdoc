"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requirJSDocForExport = void 0;

var _utils = require("../utils");

const requirJSDocForExport = {
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
      ExportNamedDeclaration: function ExportNamedDeclaration(node) {
        if (!(0, _utils.ifCommentExist)(node, commentsList)) {
          const messageText = (0, _utils.getWarnMessageText)('Need JSDoc for utils export.', node);
          context.report(messageText);
        }
      },
      Program: function Program(node) {
        commentsList = (0, _utils.checkComments)(node);
      }
    };
  }

};
exports.requirJSDocForExport = requirJSDocForExport;