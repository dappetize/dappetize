
        // The address of the smart contract to call.
        // dappetize token abi
        const dtlzTransferAddressHolesky = '0x58C472517A21c3f23fe15E70be5d7C6045Ae8Db6';
        const dtlzTransferAbiHolesky =[
  {
    inputs: [
      { internalType: 'address', name: '_lzEndpoint', type: 'address' },
      {
        internalType: 'address',
        name: 'initialOwner',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
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
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenValue',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'desTokenContractAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'srcAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'desContractAddress',
        type: 'address'
      }
    ],
    name: 'BuyAppEvent',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string'
      }
    ],
    name: 'LogEvent',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint16',
        name: '_srcChainId',
        type: 'uint16'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_srcAddress',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: '_nonce',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_payload',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_reason',
        type: 'bytes'
      }
    ],
    name: 'MessageFailed',
    type: 'event'
  },
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
        internalType: 'string',
        name: 'message',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenValue',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'desTokenContractAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'srcAddress',
        type: 'address'
      }
    ],
    name: 'RecieveLogEvent',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint16',
        name: '_srcChainId',
        type: 'uint16'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_srcAddress',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: '_nonce',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: '_payloadHash',
        type: 'bytes32'
      }
    ],
    name: 'RetryMessageSuccess',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint16',
        name: '_dstChainId',
        type: 'uint16'
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: '_type',
        type: 'uint16'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_minDstGas',
        type: 'uint256'
      }
    ],
    name: 'SetMinDstGas',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'precrime',
        type: 'address'
      }
    ],
    name: 'SetPrecrime',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint16',
        name: '_remoteChainId',
        type: 'uint16'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_path',
        type: 'bytes'
      }
    ],
    name: 'SetTrustedRemote',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint16',
        name: '_remoteChainId',
        type: 'uint16'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_remoteAddress',
        type: 'bytes'
      }
    ],
    name: 'SetTrustedRemoteAddress',
    type: 'event'
  },
  {
    inputs: [],
    name: 'DEFAULT_PAYLOAD_SIZE_LIMIT',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'address', name: '_addr', type: 'address' } ],
    name: 'addressToString',
    outputs: [ { internalType: 'string', name: '', type: 'string' } ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'bool', name: '_useZro', type: 'bool' },
      { internalType: 'bytes', name: '_adapterParams', type: 'bytes' },
      { internalType: 'uint256', name: 'tokenValue', type: 'uint256' },
      {
        internalType: 'address',
        name: 'desTokenContractAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'desContractAddress',
        type: 'address'
      }
    ],
    name: 'estimateFee',
    outputs: [
      { internalType: 'uint256', name: 'nativeFee', type: 'uint256' },
      { internalType: 'uint256', name: 'zroFee', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint16', name: '', type: 'uint16' },
      { internalType: 'bytes', name: '', type: 'bytes' },
      { internalType: 'uint64', name: '', type: 'uint64' }
    ],
    name: 'failedMessages',
    outputs: [ { internalType: 'bytes32', name: '', type: 'bytes32' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_srcChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_srcAddress', type: 'bytes' }
    ],
    name: 'forceResumeReceive',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_version', type: 'uint16' },
      { internalType: 'uint16', name: '_chainId', type: 'uint16' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '_configType', type: 'uint256' }
    ],
    name: 'getConfig',
    outputs: [ { internalType: 'bytes', name: '', type: 'bytes' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '_remoteChainId',
        type: 'uint16'
      }
    ],
    name: 'getTrustedRemoteAddress',
    outputs: [ { internalType: 'bytes', name: '', type: 'bytes' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_srcChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_srcAddress', type: 'bytes' }
    ],
    name: 'isTrustedRemote',
    outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'lzEndpoint',
    outputs: [
      {
        internalType: 'contract ILayerZeroEndpoint',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_srcChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_srcAddress', type: 'bytes' },
      { internalType: 'uint64', name: '_nonce', type: 'uint64' },
      { internalType: 'bytes', name: '_payload', type: 'bytes' }
    ],
    name: 'lzReceive',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint16', name: '', type: 'uint16' },
      { internalType: 'uint16', name: '', type: 'uint16' }
    ],
    name: 'minDstGasLookup',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_srcChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_srcAddress', type: 'bytes' },
      { internalType: 'uint64', name: '_nonce', type: 'uint64' },
      { internalType: 'bytes', name: '_payload', type: 'bytes' }
    ],
    name: 'nonblockingLzReceive',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [ { internalType: 'uint16', name: '', type: 'uint16' } ],
    name: 'payloadSizeLimitLookup',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'precrime',
    outputs: [ { internalType: 'address', name: '', type: 'address' } ],
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
    inputs: [
      { internalType: 'uint16', name: '_srcChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_srcAddress', type: 'bytes' },
      { internalType: 'uint64', name: '_nonce', type: 'uint64' },
      { internalType: 'bytes', name: '_payload', type: 'bytes' }
    ],
    name: 'retryMessage',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'uint256', name: 'tokenValue', type: 'uint256' },
      {
        internalType: 'address',
        name: 'srcTokenContractAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'desTokenContractAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'desContractAddress',
        type: 'address'
      }
    ],
    name: 'sendToken',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_version', type: 'uint16' },
      { internalType: 'uint16', name: '_chainId', type: 'uint16' },
      { internalType: 'uint256', name: '_configType', type: 'uint256' },
      { internalType: 'bytes', name: '_config', type: 'bytes' }
    ],
    name: 'setConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'uint16', name: '_packetType', type: 'uint16' },
      { internalType: 'uint256', name: '_minGas', type: 'uint256' }
    ],
    name: 'setMinDstGas',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'uint256', name: '_size', type: 'uint256' }
    ],
    name: 'setPayloadSizeLimit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'address', name: '_precrime', type: 'address' } ],
    name: 'setPrecrime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'uint16', name: '_version', type: 'uint16' } ],
    name: 'setReceiveVersion',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ { internalType: 'uint16', name: '_version', type: 'uint16' } ],
    name: 'setSendVersion',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '_remoteChainId',
        type: 'uint16'
      },
      { internalType: 'bytes', name: '_path', type: 'bytes' }
    ],
    name: 'setTrustedRemote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '_remoteChainId',
        type: 'uint16'
      },
      { internalType: 'bytes', name: '_remoteAddress', type: 'bytes' }
    ],
    name: 'setTrustedRemoteAddress',
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
    inputs: [ { internalType: 'uint16', name: '', type: 'uint16' } ],
    name: 'trustedRemoteLookup',
    outputs: [ { internalType: 'bytes', name: '', type: 'bytes' } ],
    stateMutability: 'view',
    type: 'function'
  }
];
       
       
        export { dtlzTransferAddressHolesky, dtlzTransferAbiHolesky  }
    