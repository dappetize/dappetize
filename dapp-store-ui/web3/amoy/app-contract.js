
    
        // The address of the smart contract to call.
        // dappetize token abi
        const appContractAddressAmoy = '0x389b40c194Ea2DC8E915Ee68b7433e2930694Ff2';
        const appContractAbiAmoy =[
  {
    inputs: [
      { internalType: 'uint256', name: '_appPrice', type: 'uint256' },
      { internalType: 'string', name: 'appName', type: 'string' },
      {
        internalType: 'address payable',
        name: 'appOwner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_ContractOptionsAddress',
        type: 'address'
      },
      {
        internalType: 'address payable',
        name: '_dappetizeWalletAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_DappetizeTokenAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_DownloadNFTAddress',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  { inputs: [], name: 'EnforcedPause', type: 'error' },
  { inputs: [], name: 'ExpectedPause', type: 'error' },
  {
    inputs: [ { internalType: 'address', name: 'owner', type: 'address' } ],
    name: 'OwnableInvalidOwner',
    type: 'error'
  },
  {
    inputs: [ { internalType: 'address', name: 'account', type: 'address' } ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error'
  },
  { inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'Paused',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'Unpaused',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'tokenTransfered',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'downloadNumber',
        type: 'uint256'
      }
    ],
    name: 'buyEvent',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'TransferToDappetize',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'TransferToOwner',
        type: 'bool'
      }
    ],
    name: 'successfulWithdraw',
    type: 'event'
  },
  {
    inputs: [ { internalType: 'string', name: 'uri', type: 'string' } ],
    name: 'buy',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'dappetizeDownloadNFT',
    outputs: [
      {
        internalType: 'contract IDappetizeTokenERC721',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'dappetizeToken',
    outputs: [ { internalType: 'contract IERC20', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAppInfo',
    outputs: [ { internalType: 'string', name: '', type: 'string' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAppPrice',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getScore',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'address', name: '', type: 'address' } ],
    name: 'purchasers',
    outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'string', name: 'info', type: 'string' } ],
    name: 'setAppInfo',
    outputs: [ { internalType: 'string', name: '', type: 'string' } ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'uint256', name: 'newPrice', type: 'uint256' } ],
    name: 'setAppPrice',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'uint256', name: 'score', type: 'uint256' } ],
    name: 'setScore',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'address', name: 'newOwner', type: 'address' } ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'address', name: '_user', type: 'address' } ],
    name: 'verifyPurchase',
    outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];

        export { appContractAddressAmoy, appContractAbiAmoy  }
       
    