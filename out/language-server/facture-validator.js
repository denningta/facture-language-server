"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactureValidator = exports.FactureValidationRegistry = void 0;
const langium_1 = require("langium");
/**
 * Registry for validation checks.
 */
class FactureValidationRegistry extends langium_1.ValidationRegistry {
    constructor(services) {
        super(services);
        const validator = services.validation.FactureValidator;
        const checks = {
        // Person: validator.checkPersonStartsWithCapital
        };
        this.register(checks, validator);
    }
}
exports.FactureValidationRegistry = FactureValidationRegistry;
/**
 * Implementation of custom validations.
 */
class FactureValidator {
}
exports.FactureValidator = FactureValidator;
//# sourceMappingURL=facture-validator.js.map