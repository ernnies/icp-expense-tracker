require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
let secrets = require("./secrets");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    sepolia: {
      url: secrets.url,
      accounts: [secrets.key],
      apiKey: secrets.apiKey,
    },
    bsc: {
      url: secrets.bscUrl,
      accounts: [secrets.bscKey],
    },
    fuji: {
      url: secrets.fujiUrl,
      accounts: [secrets.key],
    },
    amoy: {
      url: secrets.amoyUrl,
      accounts: [secrets.key],
    },
    arbitrum: {
      url: secrets.arUrl,
      accounts: [secrets.arKey],
    },
  },
  etherscan: {
    apiKey: secrets.apiKey,
  },
};
