// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.20;
// Importing necessary libraries and contracts
import "./common/Utils.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/utils/SafeERC20.sol";

contract Faucet is Utils {
    using SafeERC20 for IERC20;

    uint256 public numberOfRequests;
    uint256 public amount;
    IERC20 public token1;
    IERC20 public token2;
    address public owner; // Ensure owner is declared

    constructor(uint256 _amount, address _token1, address _token2, address _owner) {
        owner = _owner; // Directly assign the address
        token1 = IERC20(_token1);
        token2 = IERC20(_token2);
        amount = _amount; // Add semicolon
    }

    function requestTestTokens() public {
        numberOfRequests++; // Correct the typo
        _sendAsset(address(token1), msg.sender, amount);
        _sendAsset(address(token2), msg.sender, amount);

        // Handle the success status if needed
    }
}
