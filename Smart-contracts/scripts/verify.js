// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

//0x11B076DBFAfdf2327F962052397b02E9419eDCfC

const hre = require("hardhat");
const { ethers } = require("hardhat");
const network = hre.network.name;

async function main() {
  // for sepolia network
  const contractAddress = "0x2B5474bCCCae8C9cce8D70Ed0e24B8D3797b2BAD";
  const router = "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59";
  const linkToken = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
  const owner = "0x751f24E6FF4A12466a5249Fe380a7cC412dE5164";
  const interval = 60;

  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [router, linkToken, owner, interval],
    contract: "contracts/Pool.sol:ZKLiquidAutoPool",
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
