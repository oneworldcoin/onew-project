// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardsVault is Ownable {
    IERC20 public token;
    address public beneficiary;
    uint256 public allocated;
    uint256 public startTime;
    uint256 public duration;
    uint256 public released;

    event Released(uint256 amount);

    constructor(address _token, address _beneficiary, uint256 _allocated, uint256 _startTime, uint256 _duration) {
        require(_token != address(0) && _beneficiary != address(0));
        token = IERC20(_token);
        beneficiary = _beneficiary;
        allocated = _allocated;
        startTime = _startTime;
        duration = _duration;
        released = 0;
    }

    function vestedAmount() public view returns (uint256) {
        if (block.timestamp < startTime) return 0;
        if (block.timestamp >= startTime + duration) return allocated;
        uint256 elapsed = block.timestamp - startTime;
        return (allocated * elapsed) / duration;
    }

    function releasableAmount() public view returns (uint256) {
        return vestedAmount() - released;
    }

    function release() external {
        uint256 amount = releasableAmount();
        require(amount > 0, "no releasable");
        released += amount;
        require(token.transfer(beneficiary, amount), "transfer failed");
        emit Released(amount);
    }

    function setBeneficiary(address newBeneficiary) external onlyOwner {
        beneficiary = newBeneficiary;
    }
}
