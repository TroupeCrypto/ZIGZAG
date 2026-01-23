// Smart Contract Generator Functionality

document.addEventListener('DOMContentLoaded', function() {
    const contractTypeSelect = document.getElementById('contract-type');
    const tokenNameInput = document.getElementById('token-name');
    const tokenSymbolInput = document.getElementById('token-symbol');
    const generateContractBtn = document.querySelector('.btn-generate-contract');
    const contractOutput = document.querySelector('.contract-output');
    const contractCode = document.getElementById('contract-code');
    const copyBtn = document.querySelector('.btn-copy-contract');
    const deployBtn = document.querySelector('.btn-deploy-contract');
    
    if (!generateContractBtn) return;
    
    const contractTemplates = {
        'ERC-721 (NFT)': (name, symbol) => `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ${symbol} is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    constructor() ERC721("${name}", "${symbol}") {}
    
    function mintNFT(address recipient) 
        public onlyOwner 
        returns (uint256) 
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        return newItemId;
    }
    
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}`,
        
        'ERC-20 (Token)': (name, symbol) => `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ${symbol} is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("${name}", "${symbol}") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}`,
        
        'ERC-1155 (Multi-Token)': (name, symbol) => `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ${symbol} is ERC1155, Ownable {
    string public name;
    string public symbol;
    
    constructor() ERC1155("https://api.${name.toLowerCase()}.com/metadata/{id}") {
        name = "${name}";
        symbol = "${symbol}";
    }
    
    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(to, id, amount, data);
    }
    
    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }
}`,
        
        'Custom': (name, symbol) => `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ${symbol} is Ownable {
    string public name;
    string public symbol;
    
    // State variables
    mapping(address => uint256) public balances;
    
    // Events
    event CustomEvent(address indexed user, uint256 amount);
    
    constructor() {
        name = "${name}";
        symbol = "${symbol}";
    }
    
    // Add your custom functions here
    function customFunction() public {
        // Your logic here
    }
}`
    };
    
    function generateContract() {
        const contractType = contractTypeSelect.value;
        const tokenName = tokenNameInput.value || 'MyToken';
        const tokenSymbol = tokenSymbolInput.value || 'MTK';
        
        const sanitizedSymbol = tokenSymbol.replace(/[^a-zA-Z0-9]/g, '');
        const contractCode = contractTemplates[contractType](tokenName, sanitizedSymbol);
        
        displayContract(contractCode);
        
        if (window.mimoNotify) {
            window.mimoNotify('📄', `Generated ${contractType} contract`);
        }
    }
    
    function displayContract(code) {
        contractCode.textContent = code;
        contractOutput.style.display = 'block';
        
        // Smooth scroll to output
        contractOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function copyContract() {
        const code = contractCode.textContent;
        
        navigator.clipboard.writeText(code).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            
            if (window.mimoNotify) {
                window.mimoNotify('📋', 'Contract code copied to clipboard');
            }
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy contract code');
        });
    }
    
    async function deployContract() {
        deployBtn.textContent = 'Deploying...';
        deployBtn.disabled = true;
        
        // Simulate deployment
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const contractAddress = '0x' + Array.from({length: 40}, () => 
            Math.floor(Math.random() * 16).toString(16)).join('');
        
        if (window.mimoNotify) {
            window.mimoNotify('🚀', 'Contract deployed successfully!');
        }
        
        alert(`Contract Deployed!\n\nAddress: ${contractAddress}\n\nNetwork: Ethereum Goerli Testnet\n\nYour smart contract has been deployed!`);
        
        deployBtn.textContent = 'Deploy to Network';
        deployBtn.disabled = false;
    }
    
    // Event listeners
    generateContractBtn.addEventListener('click', generateContract);
    
    if (copyBtn) {
        copyBtn.addEventListener('click', copyContract);
    }
    
    if (deployBtn) {
        deployBtn.addEventListener('click', deployContract);
    }
    
    console.log('📜 Smart Contract Generator loaded');
});
