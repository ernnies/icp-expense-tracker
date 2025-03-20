const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  // (address _router, address _link, address _owner, uint256 updateInterval, address _supportedToken)

  // info for Fuji avalanche
  // const router = "0xF694E193200268f9a4868e4Aa017A0118C9a8177";
  // const linkToken = "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846";
  // const owner = "0x751f24E6FF4A12466a5249Fe380a7cC412dE5164";
  // const supportedToken = "0x6abcA59eaF01D5Cb165c3522442E8b314F33B4e7";

  // for sepolia network

  const router = "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59";
  const linkToken = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
  const owner = "0x751f24E6FF4A12466a5249Fe380a7cC412dE5164";
  const supportedToken = "0xAd880DF1E803BcB5701d29E8a150F05c81F89B9E";

  // const TOKEN = await ethers.getContractFactory("Token");

  const TOKEN = await ethers.getContractFactory("MyToken");
  const receiver = "0x751f24E6FF4A12466a5249Fe380a7cC412dE5164";

  const Pool = await TOKEN.deploy(receiver);

  await Pool.waitForDeployment();

  console.log(` Your contract address: ${Pool.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
