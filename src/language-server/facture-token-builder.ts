import { IMultiModeLexerDefinition, TokenType, TokenVocabulary } from "chevrotain";
import { DefaultTokenBuilder, Grammar } from "langium";

export class FactureTokenBuilder extends DefaultTokenBuilder {
  buildTokens(grammar: Grammar, options?: { caseInsensitive?: boolean }): TokenVocabulary {
    const tokenTypes: TokenType[] = super.buildTokens(grammar, options) as TokenType[];

    const markdownStart = tokenTypes.find(token => token.name === 'MD_START')
    if (markdownStart) markdownStart.PUSH_MODE = 'markdown';
    const markdownEnd = tokenTypes.find(token => token.name === 'MD_END')
    if (markdownEnd) markdownEnd.POP_MODE = true;

    const factureTokens = tokenTypes.filter(token => 
      token.name === 'MD_START' ||
      !token.name.startsWith('MD_')
    );

    const markdownTokens = tokenTypes.filter(token =>
      (
        token.name.startsWith('MD_') &&
        !(token.name === 'MD_START')
      ) ||
      token.name.startsWith('SH_')
    )

    const multiModeLexerDef: IMultiModeLexerDefinition = {
      modes: {
        facture: factureTokens,
        markdown: markdownTokens
      },
      defaultMode: 'facture'
    }

    console.log(multiModeLexerDef)

    return multiModeLexerDef;
  }
}