grammar Facture

entry Model:
    (specification=Specification)
    (elements+=DocumentElement)*;

DocumentElement:
    Section | Procedure;

Specification:
    'define' 'specification' spec=(SPEC) title=STRING;

Section:
    'section' sectionNumber=(SH_DECIMAL|SH_INT) ':' sectionID=SH_ID (',' sectionTitle=STRING)? '{' 
        elements+=SectionElement*
    '}';

SectionElement:
    Section | Procedure | Step | Markdown;

Procedure:
    'procedure' procedureNumber=(SH_DECIMAL|SH_INT) ':' procedureTitle=STRING '{' 
        content+=ProcedureElement*
    '}';

ProcedureElement:
    Step;

Step:
    'step' stepNumber=(SH_DECIMAL|SH_INT) ':' stepTitle=STRING '{'
        content+=StepElement*
    '}';

StepElement:
    Step;

Markdown:
    MD_START
        content+=AbstractMarkdownElement* AbstractMarkdownInlineElement*
    MD_END;


AbstractMarkdownElement:
    Heading1 | PlainText;

AbstractMarkdownInlineElement:
    Bold;

PlainText:
    text+=Text*;

Text returns string:
    (SH_ID | SH_DECIMAL | SH_INT | SPEC | SH_SYMBOL)+;

Heading1:
    MD_HEADING1 text=Text;

Bold:
    '**' value+=(Text)+ '**';

hidden terminal SH_WS: /\s+/;

// Facture terminal Rules
terminal STRING: /"[^"]*"|'[^']*'/;
terminal SH_DECIMAL returns number: /[0-9]+\.[0-9]+/;
terminal SH_INT returns number: /[0-9]+/;
terminal SPEC: /[A-Z0-9]+\-[A-Z0-9-]+/;
terminal URL: /http:\/\/|https:\/\/[^\n\r]*.[\w]/;

// Markdown terminal rules
terminal MD_START returns string: 'md>';
terminal MD_HEADING1: /# /;
// terminal MD_BOLD: /\*\*[^\*\*]*\*\*/;
terminal MD_END returns string: '<md';

// Shared terminal rules
terminal SH_SYMBOL: /[^\w\s]+/;
terminal SH_ID: /[_a-zA-Z][\w_]*/;

hidden terminal SH_ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SH_SL_COMMENT: /\/\/[^\n\r]*/;