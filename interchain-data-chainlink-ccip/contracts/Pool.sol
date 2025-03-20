// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.20;

import "./common/Utils.sol";
import "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";


contract AutoPool is Utils, Pausable, AutomationCompatibleInterface {
    address payable public owner;
    uint256 public lastTimeStamp;
    uint256 public immutable interval;
    address public supportedToken;
    mapping (address => uint) public pendingTransfer;
    address[] public transferAddresses;
    


     constructor(address _owner, uint256 updateInterval, address _supportedToken) {
        owner = payable(_owner);
        interval=updateInterval;
        supportedToken=_supportedToken;
    }


    function emptyAddress() public {
            delete transferAddresses;
        }

//add address and amounts to transfer

    function addPendingTransfer(address _to, uint _amount) public {
        if(pendingTransfer[_to]==0){
            transferAddresses.push(payable(_to));
        }
        pendingTransfer[_to] += _amount;
    }

    //send respective amounts to addresses

    function transferTokens(address[] memory transferAddresses) public{
        uint256 length = transferAddresses.length;
        for(uint256 idx=0; idx<length; idx++){
            address receiver=payable(transferAddresses[idx]); 
            uint256 amount = pendingTransfer[receiver];
            bool success =_sendAsset(supportedToken,receiver, amount);
            require(success, "Token transfer failed");
            pendingTransfer[receiver]=0;   
        }

        emptyAddress();
    }

       function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        // upkeepNeeded = amount > 0;
        upkeepNeeded = transferAddresses.length > 0;
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        if ((block.timestamp - lastTimeStamp) > interval) {
            lastTimeStamp = block.timestamp;
            transferTokens(transferAddresses);
        }

        
    }

    function setSupportedToken(address _supportedToken) external onlyOwner {
        supportedToken=_supportedToken;
    }


    //modifiers

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
   
}
