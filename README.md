# WalletConnect with React-native 0.69, Typescript, Etherjs

This is a generic wallet build on top of WalletConnect and Etherjs
It has nothing specific to NFT. But NFT would be the first use case.


```
./node_modules/.bin/rn-nodeify --hack --install
```

Do the basic app setup steps like
```
yarn
```

# Running on Simulator

Metro
```
npx react-native start
```

Android Build
```
npx react-native run-android   
```

# Run on device
Get connected devices first
```
adb devices
```
Run
```
npx react-native run-android --deviceId=254c042cb90d7ece
```

# React natve 0.69 issues

- changing compile to implementation in gradle files of dependent projects
- ViewPropTypes deprecated - changing the import in dependent projects

Both should be fixed as projects update or you can always send a PR

# Wallet Slowness
EtherJs uses Crypto shims and hence the wallet generation or set up is quite slow now.

This should be fixed in Ethers version 6. See [here](https://github.com/ethers-io/ethers.js/issues/2250)


# Structure High level


# To fix
