/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import dayjs from 'dayjs';  
import { CustomWalletConnect } from './walletconnect'

// export const getFCMToken = async (): Promise<string> => {
//   const authStatus = await messaging().requestPermission()
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL
//   if (enabled) {
//     return await messaging().getToken()
//   } else {
//     return ''
//   }
// }

export const calculateDate = (date: Date): string => {
  const yyyy = date.getFullYear()
  let mm = date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  let dd = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()
  return `${dd}/${mm}/${yyyy}`
}

export const formatDateTime = (date: Date): string => {
  return dayjs(date).format('DD/MM/YYYY hh:mm A')
}

// export const filedMapper = (type: string[], data: any, email: string) => {
//   const date = new Date(data?.issuanceDate)
//   if (type.includes(NEW_SFF_COURSE)) {
//     return [
//       {
//         title: ISSUED_BY,
//         value:
//           data.courseOrg !== undefined && Array.isArray(data.courseOrg)
//             ? data.courseOrg.map((item: any, index: number) => {
//                 return data.courseOrg.length === index + 1 ? `${item}` : `${item}, `
//               })
//             : '',
//       },
//       {
//         title: ISSUED_ON,
//         value: `${date.getDate()}/${
//           date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
//         }/${date.getFullYear()}`,
//       },

//       {
//         title: ISSUED_TO,
//         value: data.participantName,
//       },
//       {
//         title: PARTICIPANT_EMAIL,
//         value: data.participantEmail,
//       },
//       {
//         title: CERTIFICATE_DESCRIPTION,
//         value:
//           data.certDescription !== undefined && Array.isArray(data.certDescription)
//             ? data.certDescription.map((item: any, index: number) => {
//                 return data.certDescription.length === index + 1 ? `${item}` : `${item}, `
//               })
//             : '',
//       },
//       {
//         title: INSTRUCTOR,
//         value:
//           data.professorDetails !== undefined && Array.isArray(data.professorDetails)
//             ? data.professorDetails.map((item: any, index: number) => {
//                 return data.professorDetails.length === index + 1
//                   ? `${item.professorName}`
//                   : `${item.professorName}, `
//               })
//             : '',
//       },
//       {
//         title: ISSUING_PLATFORM,
//         value: data.issuingPlatform,
//       },
//     ]
//   } else if (type.includes(YOUR_EDGE_KUDOS)) {
//     return [
//       {
//         title: ISSUED_BY,
//         value: data.sender !== undefined ? data.sender.senderName : '',
//       },
//       {
//         title: ISSUED_TO,
//         value: data.receiver !== undefined ? data.receiver.receiverName : '',
//       },
//       {
//         title: PERSONAL_TEXT_FROM_ISSUER,
//         value: data.kudos !== undefined ? data.kudos.kudosText : '',
//       },
//       {
//         title: ISSUED_ON,
//         value: `${date.getDate()}/${
//           date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
//         }/${date.getFullYear()}`,
//       },
//     ]
//   } else if (type.includes(ID_CARD)) {
//     return [
//       {
//         title: ISSUED_BY,
//         value: SELF_ISSUED,
//       },
//       {
//         title: ISSUED_TO,
//         value: data.name,
//       },
//       {
//         title: CREDENTIAL_TYPE,
//         value: ID_CARD,
//       },
//     ]
//   } else if (type.includes(EMAIL_OWNERSHIP)) {
//     return [
//       {
//         title: ISSUED_BY,
//         value: SELF_ISSUED,
//       },
//       {
//         title: ISSUED_TO,
//         value: email,
//       },
//       {
//         title: CREDENTIAL_TYPE,
//         value: EMAIL_CREDENTIAL,
//       },
//     ]
//   } else if (type.includes(YOUR_EDGE_BADGE)) {
//     return [
//       {
//         title: COURSE_ORG_PROGRAM,
//         value: data.courseOrg,
//       },
//       {
//         title: ISSUED_ON,
//         value: `${date.getDate()}/${
//           date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
//         }/${date.getFullYear()}`,
//       },
//       {
//         title: PARTICIPANTS_NAME,
//         value: data.participantName,
//       },
//       {
//         title: PARTICIPANT_EMAIL,
//         value: data.participantEmail,
//       },
//       {
//         title: CREDENTIAL_NAME,
//         value: data.certName,
//       },
//       {
//         title: CREDENTIAL_DESCRIPTION,
//         value: data.certDescription,
//       },
//       {
//         title: data.affiliation !== null && data.affiliation !== undefined && AFFILIATION,
//         value: data.affiliation,
//       },
//     ]
//   } else if (type.includes(RESUME_VC_WITHOUT_SPACE)) {
//     return [
//       {
//         title: NAME,
//         value: data.name,
//       },
//       {
//         title: PHONE_NUMBER,
//         value: data.phoneNumber,
//       },
//       {
//         title: EMAIL,
//         value: data.email,
//       },
//       {
//         title: LINKEDIN_PROFILE,
//         value: data.linkedIn,
//       },
//       {
//         title: NATIONALITY,
//         value: data.nationality,
//       },
//       {
//         title: RESUME_NAME,
//         value: data.resumeName,
//       },
//       {
//         title: RESUME_FILE_PATH,
//         value: data.resumeFilePathUrl,
//       },
//     ]
//   } else {
//     return [
//       {
//         title: ISSUED_TO,
//         value: email,
//       },
//       {
//         title: CREDENTIAL_TYPE,
//         value: ISSUER_CREDENTIAL,
//       },
//     ]
//   }
// }

export interface CheckEligibilityPayload {
  id: number
  jsonrpc: string
  method: string
  params: CheckEligibilityParams[]
}

interface CheckEligibilityParams {
  requiredSchemas: CheckEligibilitySchemas[]
  serviceUuid: string
  serviceName: string
  marketplaceName: string
}

export interface CheckEligibilitySchemas {
  schemaType: string
  schemaName: string
  issuerDid: string
  isSelfIssuance: boolean
}

export interface CreatedCredentialRequestSchemas {
  id: number
  schemaType: string
  callbackUrl: string
  createdAt: Date
  status: string
}
export interface CreatedCredentialRequestPayload {
  id: number
  jsonrpc: string
  method: string
  params: CreatedCredentialRequestSchemas[]
}

export interface WalletConnectStateType {
  walletConnectList: CustomWalletConnect[]
  setWalletConnectList: (walletConnect: CustomWalletConnect[]) => void
}

export const WalletConnectContext = React.createContext<WalletConnectStateType>({
  walletConnectList: [],
  setWalletConnectList: (walletConnect: CustomWalletConnect[]) => {},
})

export interface ServiceApplicationPayload {
  id: number
  jsonrpc: string
  method: string
  params: ServiceApplicationParams[]
}

interface ServiceApplicationParams {
  schemaTypes: ServiceApplicationSchemas[]
  serviceUuid: string
  serviceName: string
  marketplaceName: string
  verifierDid: string
  verifierPublicKey: string
  callbackUrl: string
  credentialShareRequestToken: string
}

export interface ServiceApplicationSchemas {
  name: string
  typeName: string
  isSelfIssuance: boolean
  issuerDid: string
}

//Type for creating presentation challenge for vp
export declare class CredentialRequirement {
  type: string[]
}
