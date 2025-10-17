// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract OneW is ERC20Capped, Ownable {
        constructor(uint256 cap_) ERC20("OneW", "OneW") ERC20Capped(cap_) {
                    // minting will be done by owner via mint()
        }

            function mint(address to, uint256 amount) external onlyOwner {
                        _mint(to, amount);
            }

                function rescueTokens(address tokenAddress, uint256 amount) external onlyOwner {
                            IERC20(tokenAddress).transfer(owner(), amount);
                }
}
                }
            }
        }
}