// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface IMotorbike {
    function initialize() external;

    function upgradeToAndCall(
        address newImplementation,
        bytes memory data
    ) external payable;
}
