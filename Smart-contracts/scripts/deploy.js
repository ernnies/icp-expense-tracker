const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  // info for Fuji avalanche
  // const router = "0xF694E193200268f9a4868e4Aa017A0118C9a8177";
  // const linkToken = "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846";
  // const owner = "0x751f24E6FF4A12466a5249Fe380a7cC412dE5164";
  // const interval = 60;

  // for sepolia network
  // const router = "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59";
  // const linkToken = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
  // const owner = "0x751f24E6FF4A12466a5249Fe380a7cC412dE5164";
  // const interval = 60;

  // // for Arbitrum test network
  // const router = "0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165";
  // const linkToken = "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E";
  // const owner = "0x751f24E6FF4A12466a5249Fe380a7cC412dE5164";
  // const interval = 60;

  // // for Polygon Amoy network
  // const router = "0x9C32fCB86BF0f4a1A8921a9Fe46de3198bb884B2";
  // const linkToken = "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904";
  // const owner = "0x751f24E6FF4A12466a5249Fe380a7cC412dE5164";
  // const interval = 60;

  // for BSC Test network
  const router = "0xE1053aE1857476f36A3C62580FF9b016E8EE8F6f";
  const linkToken = "0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06";
  const owner = "0x751f24E6FF4A12466a5249Fe380a7cC412dE5164";
  const interval = 60;

  const AUTOPOOL = await ethers.getContractFactory("ZKLiquidAutoPool");

  const Pool = await AUTOPOOL.deploy(router, linkToken, owner, interval);

  await Pool.waitForDeployment();

  console.log(` Your contract address: ${Pool.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
