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
    },
    bsc: {
      url: secrets.bscUrl,
      accounts: [secrets.key],
    },
  },
  etherscan: {
    apiKey: secrets.apiKey,
  },
};
