// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";

import {Evil26} from "../src/L26/Evil26.sol";

contract TestEvil_26 is Test {
    Evil26 evil;

    function setUp() public {
        evil = new Evil26();
        deal(address(evil), 0.002 ether);
    }

    function test_pwn() external {
        evil.pwn();
    }
}
