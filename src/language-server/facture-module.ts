import {
    createDefaultModule, createDefaultSharedModule, DefaultSharedModuleContext, inject,
    LangiumServices, LangiumSharedServices, Module, PartialLangiumServices
} from 'langium';
import { FactureGeneratedModule, FactureGeneratedSharedModule } from './generated/module';
import { FactureValidationRegistry, FactureValidator } from './facture-validator';
import { FactureScopeProvider } from './facture-scope-provider';
import { FactureTokenBuilder } from './facture-token-builder';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type FactureAddedServices = {
    validation: {
        FactureValidator: FactureValidator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type FactureServices = LangiumServices & FactureAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const FactureModule: Module<FactureServices, PartialLangiumServices & FactureAddedServices> = {
    validation: {
        ValidationRegistry: (services) => new FactureValidationRegistry(services),
        FactureValidator: () => new FactureValidator()
    },
    references: {
        ScopeProvider: (services) => new FactureScopeProvider(services)
    },
    parser: {
        TokenBuilder: () => new FactureTokenBuilder()
    }
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createFactureServices(context: DefaultSharedModuleContext): {
    shared: LangiumSharedServices,
    Facture: FactureServices
} {
    const shared = inject(
        createDefaultSharedModule(context),
        FactureGeneratedSharedModule     
    );
    const Facture = inject(
        createDefaultModule({ shared }), 
        FactureGeneratedModule,
        FactureModule
    );
    shared.ServiceRegistry.register(Facture);
    return { shared, Facture };
}