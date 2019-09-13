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
    let isUtils = false;
    return {
      ExportNamedDeclaration: function ExportNamedDeclaration(node) {
        if (isUtils) {
          if (!(0, _utils.ifCommentExist)(node, commentsList)) {
            const messageText = (0, _utils.getWarnMessageText)(meta.docs.description, node);
            context.report(messageText);
          }
        }
      },
      Program: function Program(node) {
        commentsList = (0, _utils.checkComments)(node);

        if (context.getFilename().match('utils')) {
          isUtils = true;
        }
      }
    };
  }

};
exports.requirJSDocForExport = requirJSDocForExport;