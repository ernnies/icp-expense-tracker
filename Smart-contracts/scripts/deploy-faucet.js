const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const owner = "0x751f24E6FF4A12466a5249Fe380a7cC412dE5164";
  const amount = "500000000000000000000";

  //fuji
  const token1 = "0xec1804F0DE8fbB3689D4b13BfB8035B77283a6D1";
  const token2 = "0xA17389EAAA6Eb19b6f288cD0a555137E13a947a1";

  const FAUCET = await ethers.getContractFactory("Faucet");

  const Faucet = await FAUCET.deploy(amount, token1, token2, owner);

  await Faucet.waitForDeployment();

  console.log(` Your contract address: ${Faucet.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
