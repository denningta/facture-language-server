"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactureTokenBuilder = void 0;
const langium_1 = require("langium");
class FactureTokenBuilder extends langium_1.DefaultTokenBuilder {
    buildTokens(grammar, options) {
        const tokenTypes = super.buildTokens(grammar, options);
        const markdownStart = tokenTypes.find(token => token.name === 'MD_START');
        if (markdownStart)
            markdownStart.PUSH_MODE = 'markdown';
        const markdownEnd = tokenTypes.find(token => token.name === 'MD_END');
        if (markdownEnd)
            markdownEnd.POP_MODE = true;
        const factureTokens = tokenTypes.filter(token => token.name === 'MD_START' ||
            !token.name.startsWith('MD_'));
        const markdownTokens = tokenTypes.filter(token => (token.name.startsWith('MD_') &&
            !(token.name === 'MD_START')) ||
            token.name.startsWith('SH_'));
        const multiModeLexerDef = {
            modes: {
                facture: factureTokens,
                markdown: markdownTokens
            },
            defaultMode: 'facture'
        };
        console.log(multiModeLexerDef);
        return multiModeLexerDef;
    }
}
exports.FactureTokenBuilder = FactureTokenBuilder;
//# sourceMappingURL=facture-token-builder.js.map