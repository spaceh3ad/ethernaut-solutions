// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/console2.sol";

contract SimpleTrick {
    GatekeeperThree public target;
    address public trick;
    uint private password = block.timestamp;

    constructor(address payable _target) {
        target = GatekeeperThree(_target);
    }

    function checkPassword(uint _password) public returns (bool) {
        if (_password == password) {
            return true;
        }
        password = block.timestamp;
        return false;
    }

    function trickInit() public {
        trick = address(this);
    }

    function trickyTrick() public {
        if (address(this) == msg.sender && address(this) != trick) {
            target.getAllowance(password);
        }
    }
}

contract GatekeeperThree {
    address public owner;
    address public entrant;
    bool public allowEntrance;

    SimpleTrick public trick;

    function construct0r() public {
        owner = msg.sender;
    }

    modifier gateOne() {
        console2.log(msg.sender);
        console2.log(tx.origin);
        require(msg.sender == owner, "Not owner");
        require(tx.origin != owner, "!origin");
        _;
    }

    modifier gateTwo() {
        require(allowEntrance == true, "g2");
        _;
    }

    modifier gateThree() {
        if (
            address(this).balance > 0.001 ether &&
            payable(owner).send(0.001 ether) == false
        ) {
            _;
        } else {
            revert("g3");
        }
    }

    function getAllowance(uint _password) public {
        if (trick.checkPassword(_password)) {
            allowEntrance = true;
        }
    }

    function createTrick() public {
        trick = new SimpleTrick(payable(address(this)));
        trick.trickInit();
    }

    function enter() public gateOne gateTwo gateThree {
        entrant = tx.origin;
    }

    receive() external payable {}
}
