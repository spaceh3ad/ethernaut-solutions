// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";

import {Evil24} from "../src/L24/Evil24.sol";
import {DexTwo} from "../src/L24/DexTwo.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Test_Evil_24 is Test {
    DexTwo target = DexTwo(0x186e0043f9Ef011f1bB262B793A4fF4C66B44265);
    Evil24 evil;

    function setUp() public {
        evil = new Evil24();
    }

    function test_pwn() external {
        evil.pwn();

        assertEq(IERC20(target.token1()).balanceOf(address(target)), 0);
        assertEq(IERC20(target.token2()).balanceOf(address(target)), 0);
    }
}
