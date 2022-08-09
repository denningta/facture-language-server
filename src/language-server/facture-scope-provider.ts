import { AstNodeDescription, DefaultScopeProvider, Scope, Stream, StreamScope } from "langium";

export class FactureScopeProvider extends DefaultScopeProvider {

  protected createScope(elements: Stream<AstNodeDescription>, outerScope: Scope): Scope {
    return new StreamScope(elements, outerScope, { caseInsensitive: true });
  }

  protected getGlobalScope(referenceType: string): Scope {
    return new StreamScope(
      this.indexManager.allElements(referenceType), 
      undefined, 
      { caseInsensitive: true }
    );
  }

}