"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactureScopeProvider = void 0;
const langium_1 = require("langium");
class FactureScopeProvider extends langium_1.DefaultScopeProvider {
    createScope(elements, outerScope) {
        return new langium_1.StreamScope(elements, outerScope, { caseInsensitive: true });
    }
    getGlobalScope(referenceType) {
        return new langium_1.StreamScope(this.indexManager.allElements(referenceType), undefined, { caseInsensitive: true });
    }
}
exports.FactureScopeProvider = FactureScopeProvider;
//# sourceMappingURL=facture-scope-provider.js.map