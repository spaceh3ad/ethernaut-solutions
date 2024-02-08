// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";

import {Evil27} from "../src/L27/Evil27.sol";

contract TestEvil_27 is Test {
    Evil27 evil;

    function setUp() public {
        evil = new Evil27();
    }

    function test_pwn() external {
        evil.pwn();
    }
}
