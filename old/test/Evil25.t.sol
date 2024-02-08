// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";

import {Evil25} from "../src/L25/Evil25.sol";

contract TestEvil_25 is Test {
    Evil25 evil;

    function setUp() public {
        evil = new Evil25();
        deal(address(evil), 0.002 ether);
    }

    function test_pwn() external {
        evil.pwn();
    }
}
