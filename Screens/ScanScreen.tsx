import React, { Component, Fragment, useContext, useRef, useState } from 'react';
import QRCodeScanner, { RNQRCodeScannerProps } from 'react-native-qrcode-scanner';
import styles from './scanStyle'
import {
    TouchableOpacity,
    Text,
    StatusBar,
    Linking,
    View
} from 'react-native';

import {
    Header,
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { createNewWcConnector, registerWalletConnectListeners } from '../utils/walletconnect';
import { useWcDisconnect } from '../utils/walletconnect/onWcDisconnect';
import { RNCamera } from 'react-native-camera';
import { WalletConnectContext } from '../utils';
import { Wallet } from 'ethers';
import EthereWalletContext from '../context/Etherwallet';
import { useNavigation } from '@react-navigation/native';

const ScanScreen = () => {

    const [result, setResult] = useState()
    const [scan, setScan] = useState(true)
    const [ScanResult, setScanResult] = useState(false)
    // const [url, setURL] = useState<string | undefined>()
    const { onWcDisconnect } = useWcDisconnect()
    const wallet = useContext<Wallet>(EthereWalletContext)
    const navigation = useNavigation()
    // const { onWcTimestampUpdate } = useWcTimestampUpdate()

    const { walletConnectList, setWalletConnectList } = useContext(WalletConnectContext)

    const extractURL = (str: string, start: string, end: string): string => {
        let url: string = '';
        const startindex = str.indexOf(start);
        const endindex = str.indexOf(end, startindex);
        if (startindex != -1 && endindex != -1 && endindex > startindex) {
            url = str.substring(startindex, endindex)
        }
        return url

    }

    const onSuccess = async(e: any) => {
        const protocol = e.data.substring(0, 2);
        setResult(e)
        setScan(false)
        setScanResult(true)
        // const returnedUrl = e.data
        // if (protocol == 'wc') {
        //     const fullUrl = extractURL(returnedUrl, "http", "&key")
        //     setURL(decodeURIComponent(fullUrl))
        // }
        // else {
        //     setURL(returnedUrl)
        // }
        const _wcSession = createNewWcConnector(e.data)
        
        // walletConnectList?.length
        //   ? setWalletConnectList([...walletConnectList, _wcSession])
        //   : setWalletConnectList([_wcSession])
        await registerWalletConnectListeners(_wcSession,wallet,navigation, onWcDisconnect)// change her

    }

    const activeQR = () => {
        setScan(true)
    }
    const scanAgain = () => {
        setScan(true)
        setScanResult(false)
    }

    // accept walletConnect connection
    // const acceptConnection  = async (url:string) => {
        
 
    //     const _wcSession = createNewWcConnector(url)
    //     walletConnectList?.length
    //       ? setWalletConnectList([...walletConnectList, _wcSession])
    //       : setWalletConnectList([_wcSession])
    //     await registerWalletConnectListeners(_wcSession, onWcDisconnect)


    // }
    // deny connection
    const denyConnection = () => {

    }

    // let scanner = useRef<QRCodeScanner>(null);

    let scanner: QRCodeScanner | null;

    return (
        <View style={styles.scrollViewStyle}>
            <Fragment>
                <StatusBar barStyle="dark-content" />

                {/* {!scan && !ScanResult &&
                    <View style={styles.cardView} >
                        <TouchableOpacity onPress={activeQR} style={styles.buttonTouchable}>
                            <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
                        </TouchableOpacity>

                    </View>
                } */}

                {/* {ScanResult && (result !== undefined) &&
                    <Fragment>

                        <View style={ScanResult ? styles.scanCardView : styles.cardView}>

                            <Text style={styles.textTitle1}>{url} has sent you a connection request</Text>
                            <TouchableOpacity onPress={scanAgain} style={styles.buttonTouchable}>
                                <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
                            </TouchableOpacity>
            

                        </View>
                    </Fragment>
                } */}


                {scan &&
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        ref={(node) => { scanner = node }}
                        onRead={onSuccess}
                        flashMode={RNCamera.Constants.FlashMode.auto} 
                        topContent={
                            <Text style={styles.centerText}>
                                Scan QR to connect to DApp Marketplace
                            </Text>
                        }
                        bottomContent={
                            <View>
                                {/* <TouchableOpacity style={styles.buttonTouchable} onPress={() => scanner.reactivate()}>
                                    <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                                </TouchableOpacity> */}

                                <TouchableOpacity style={styles.buttonTouchable} onPress={() => setScan(false)}>
                                    <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                                </TouchableOpacity>
                            </View>

                        }
                    />
                }
            </Fragment>
        </View>

    );


}




export default ScanScreen;
