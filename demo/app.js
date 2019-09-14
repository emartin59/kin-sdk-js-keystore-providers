const SEED = "SARVSAHEAIHNN3WTCUX2YPNHPXB2PUDL3UBK3Z4RZMNPXDNUG5QD5VFF";
const PK = "GCEMQWMFAFO5UOZHNVFQTAGQG7F3KAVNNA5TWIMO7XPJIRGU4WR3NHQJ";
const RECIVER_PK = "GD5LWUF54MHZRZHFYFCHZ53TUVT3TWIGDM2JNRJDDWKBD4EZGQPEFULF";

const keyStoreProvider = new ExtensionKeystoreProvider(KinSdk);
const kinClient = new KinSdk.KinClient(KinSdk.Environment.Testnet, keyStoreProvider);

Vue.config.productionTip = false;
Vue.config.devtools = false;

new Vue({
  el: "#root",
  data: {
    accounts: [],
    properties: {
      extension_auto_install: true
    }
  },
  created: function() {
    this.refreshLocalStorageAccounts();
  },
  methods: {
    installExtension: async function() {
      try {
        const installExtension = await keyStoreProvider.isInstalled(this.properties);
        console.info(`installExtension: ${installExtension}`);
      } catch (err) {
        console.warn(`installExtension: ${err}`);
      }
    },
    refreshLocalStorageAccounts: async function() {
      try {
        const accounts = await kinClient.kinAccounts;
        this.accounts = accounts.map(account => {
          account.balance = 0;
          return account;
        });
        this.activateAccounts();
        this.refreshBalances();
      } catch (err) {
        console.warn(`refreshLocalStorageAccounts: ${err}`);
      }
    },
    tip: async function() {
      console.log("client: tip clicked");
      const txBuilder = await this.accounts[0].buildTransaction({
        address: RECIVER_PK,
        amount: 1,
        fee: 100,
        memoText: "Tip some kin"
      });
      console.log("client: tip -> builder done");
      await this.accounts[0].submitTransaction(txBuilder.toString());
      console.log("client: tip -> refresh balance");
      this.refreshBalances();
    },
    refreshBalances: async function() {
      for (let account of this.accounts) {
        const balance = await account.getBalance();
        account.balance = balance;
      }
    },
    activateAccounts: async function() {
      for (let account of this.accounts) {
        if (!(await account.isAccountExisting())) {
          await kinClient.friendbot({
            address: account._publicAddress,
            amount: 1000
          });

          this.refreshBalances();
        }
      }
    }
  }
});
