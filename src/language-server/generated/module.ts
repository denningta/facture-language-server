/******************************************************************************
 * This file was generated by langium-cli 0.4.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import { LangiumGeneratedServices, LangiumGeneratedSharedServices, LangiumSharedServices, LangiumServices, LanguageMetaData, Module } from 'langium';
import { FactureAstReflection } from './ast';
import { FactureGrammar } from './grammar';

export const FactureLanguageMetaData: LanguageMetaData = {
    languageId: 'facture',
    fileExtensions: ['.fac'],
    caseInsensitive: false
};

export const FactureGeneratedSharedModule: Module<LangiumSharedServices, LangiumGeneratedSharedServices> = {
    AstReflection: () => new FactureAstReflection()
};

export const FactureGeneratedModule: Module<LangiumServices, LangiumGeneratedServices> = {
    Grammar: () => FactureGrammar(),
    LanguageMetaData: () => FactureLanguageMetaData,
    parser: {}
};
