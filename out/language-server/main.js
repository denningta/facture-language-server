"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const langium_1 = require("langium");
const node_1 = require("vscode-languageserver/node");
const facture_module_1 = require("./facture-module");
const node_2 = require("langium/node");
// Create a connection to the client
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
// Inject the shared services and language-specific services
const { shared } = (0, facture_module_1.createFactureServices)(Object.assign({ connection }, node_2.NodeFileSystem));
// Start the language server with the shared services
(0, langium_1.startLanguageServer)(shared);
connection.onDidChangeTextDocument((text) => {
    console.log(text);
});
//# sourceMappingURL=main.js.map