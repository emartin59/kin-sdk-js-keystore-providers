import * as KinSdk from "@kinecosystem/kin-sdk-js";
declare global {
    interface Window {
        LocalStorageKeystoreProvider: typeof LocalStorageKeystoreProvider;
    }
}
export declare class LocalStorageKeystoreProvider implements KinSdk.KeystoreProvider {
    private readonly _sdk;
    private _keypairs;
    constructor(_sdk: typeof KinSdk);
    private getSeedsFromStorage;
    private updateSeedsStorage;
    addKeyPair(seed: string): void;
    readonly accounts: Promise<any[]>;
    sign(accountAddress: string, transactionEnvelpoe: string): Promise<any>;
}
