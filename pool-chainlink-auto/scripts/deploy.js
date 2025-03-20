const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const Owner = "0x751f24E6FF4A12466a5249Fe380a7cC412dE5164";
  const supportedToken = "0xAd880DF1E803BcB5701d29E8a150F05c81F89B9E";

  // const TOKEN = await ethers.getContractFactory("Token");

  const AUTOPOOL = await ethers.getContractFactory("AutoPool");

  const Pool = await AUTOPOOL.deploy(Owner, 60, supportedToken);

  await Pool.waitForDeployment();

  console.log(` Your contract address: ${Pool.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
