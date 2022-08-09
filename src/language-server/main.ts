import { startLanguageServer } from 'langium';
import { createConnection, ProposedFeatures, TextDocument, TextDocuments } from 'vscode-languageserver/node';
import { createFactureServices } from './facture-module';
import { NodeFileSystem } from 'langium/node';
import { TextDocument } from 'vscode';

// Create a connection to the client
const connection = createConnection(ProposedFeatures.all);

// Inject the shared services and language-specific services
const { shared } = createFactureServices({ connection, ...NodeFileSystem });
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument)

// Start the language server with the shared services
startLanguageServer(shared);

