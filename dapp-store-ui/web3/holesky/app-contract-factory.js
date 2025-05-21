
        // The address of the smart contract to call.
        // dappetize token abi
        const appContractFactoryAddressHolesky = '0xCA534fbc3229c73747df9a8Bc18c751d6156EFb8';
        const appContractFactoryAbiHolesky =[
  {
    inputs: [
      {
        internalType: 'address',
        name: 'initialOwner',
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
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'createContractAddressEvent',
    type: 'event'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'appPrice', type: 'uint256' },
      { internalType: 'string', name: 'appName', type: 'string' },
      {
        internalType: 'address',
        name: 'ContractOptionsAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'DappetizeTokenAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'NFTContractAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'DownloadNFTAddress',
        type: 'address'
      },
      { internalType: 'string', name: 'appDetails', type: 'string' }
    ],
    name: 'createAppContract',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'address', name: '_address', type: 'address' } ],
    name: 'getdeployedAppContractAddress',
    outputs: [
      {
        internalType: 'contract AppContract[]',
        name: '',
        type: 'address[]'
      }
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
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
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
  }
];
    

        export { appContractFactoryAddressHolesky, appContractFactoryAbiHolesky  }
    