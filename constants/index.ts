export const CALL_REQUEST = 'call_request';
export const CREATED_CREDENTIAL_REQUEST = 'CREATED_CREDENTIAL_REQUEST';
export const DISCONNECT = 'disconnect';
export const FAIL = 'Fail';
export const SESSION_REQUEST_EVENT = 'session_request';

export const SUCCESS = 'Success'
export const REJECT = 'Reject'
export const APPROVE = 'Approve'
export const HOME_SCREEN="Home"
export const CONTACT_SCREEN="Contact"
export const SCAN_SCREEN="Scan"
export const WC_SCREEN="WCScreen"
export const LOG_BOX_LOGS="Non-serializable values were found in the navigation state"


export enum ETH_METHODS {
    PERSONAL_SIGN = "personal_sign",
    ETH_SIGN = "eth_sign",
    ETH_SIGN_TYPE_DATA = "eth_signTypedData",
    ETH_SEND_TRANSACTION = "eth_sendTransaction",
    ETH_SIGN_TRANSACTION = "eth_signTransaction",
    ETH_SEND_RAW_TRANSACTION = "eth_sendRawTransaction"
  }