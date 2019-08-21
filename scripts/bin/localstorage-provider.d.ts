import * as KinSdk from "@kinecosystem/kin-sdk-js";
declare global {
    interface Window {
        KeystoreProvider: any;
    }
}
export declare class LocalStorageKeystoreProvider implements KinSdk.KeystoreProvider {
    private readonly _sdk;
    private _storage;
    constructor(_sdk: typeof KinSdk, secret: string);
    addKeyPair(seed: string): void;
    readonly accounts: Promise<any[]>;
    sign(accountAddress: string, transactionEnvelpoe: string): Promise<any>;
}
