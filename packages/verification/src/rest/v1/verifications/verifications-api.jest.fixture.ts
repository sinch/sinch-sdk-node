import { VerificationsApi } from './verifications-api';
import {
  StartCalloutVerificationResponse,
  CalloutVerificationReportResponse,
  StartSeamlessVerificationResponse,
  StartFlashCallVerificationResponse,
  FlashCallVerificationReportResponse,
  StartSmsVerificationResponse,
  SmsVerificationReportResponse,
  StartSmsVerificationRequestData,
  StartFlashCallVerificationRequestData,
  StartCalloutVerificationRequestData,
  StartSeamlessVerificationRequestData,
  ReportSmsVerificationByIdRequestData,
  ReportCalloutVerificationByIdRequestData,
  ReportFlashCallVerificationByIdRequestData,
  ReportSmsVerificationByIdentityRequestData,
  ReportFlashCallVerificationByIdentityRequestData,
  ReportCalloutVerificationByIdentityRequestData,
  StartDataVerificationRequestData,
  StartPhoneCallVerificationResponse,
  StartPhoneCallVerificationRequestData,
  StartDataVerificationResponse,
  ReportPhoneCallVerificationByIdRequestData,
  ReportPhoneCallVerificationByIdentityRequestData,
  PhoneCallVerificationReportResponse,
} from '../../../models';

export class VerificationsApiFixture implements Partial<Readonly<VerificationsApi>> {

  /**
   * Fixture associated to function reportSmsById
   */
  public reportSmsById: jest.Mock<Promise<
    SmsVerificationReportResponse>,
    [ReportSmsVerificationByIdRequestData]> = jest.fn();
  /**
   * Fixture associated to function reportFlashCallById
   */
  public reportFlashCallById: jest.Mock<Promise<
    FlashCallVerificationReportResponse>,
    [ReportFlashCallVerificationByIdRequestData]> = jest.fn();
  /**
   * Fixture associated to function reportPhoneCallById
   */
  public reportPhoneCallById: jest.Mock<Promise<
    PhoneCallVerificationReportResponse>,
    [ReportPhoneCallVerificationByIdRequestData]> = jest.fn();
  /**
   * Fixture associated to function reportCalloutById
   */
  public reportCalloutById: jest.Mock<Promise<
    CalloutVerificationReportResponse>,
    [ReportCalloutVerificationByIdRequestData]> = jest.fn();
  /**
   * Fixture associated to function reportSmsByIdentity
   */
  public reportSmsByIdentity:
    jest.Mock<Promise<
      SmsVerificationReportResponse>,
      [ReportSmsVerificationByIdentityRequestData]> = jest.fn();
  /**
   * Fixture associated to function reportFlashCallByIdentity
   */
  public reportFlashCallByIdentity:
    jest.Mock<Promise<
      FlashCallVerificationReportResponse>,
      [ReportFlashCallVerificationByIdentityRequestData]> = jest.fn();
  /**
   * Fixture associated to function reportPhoneCallByIdentity
   */
  public reportPhoneCallByIdentity:
    jest.Mock<Promise<
      PhoneCallVerificationReportResponse>,
      [ReportPhoneCallVerificationByIdentityRequestData]> = jest.fn();
  /**
   * Fixture associated to function reportCalloutByIdentity
   */
  public reportCalloutByIdentity:
    jest.Mock<Promise<
      CalloutVerificationReportResponse>,
      [ReportCalloutVerificationByIdentityRequestData]> = jest.fn();
  /**
   * Fixture associated to function startSms
   */
  public startSms: jest.Mock<Promise<
    StartSmsVerificationResponse>,
    [StartSmsVerificationRequestData]> = jest.fn();
  /**
   * Fixture associated to function startFlashCall
   */
  public startFlashCall: jest.Mock<
    Promise<StartFlashCallVerificationResponse>,
    [StartFlashCallVerificationRequestData]> = jest.fn();
  /**
   * Fixture associated to function startPhoneCall
   */
  public startPhoneCall: jest.Mock<Promise<
    StartPhoneCallVerificationResponse>,
    [StartPhoneCallVerificationRequestData]> = jest.fn();
  /**
   * Fixture associated to function startData
   */
  public startData: jest.Mock<
    Promise<StartDataVerificationResponse>,
    [StartDataVerificationRequestData]> = jest.fn();
  /**
   * Fixture associated to function startCallout
   */
  public startCallout: jest.Mock<Promise<
    StartCalloutVerificationResponse>,
    [StartCalloutVerificationRequestData]> = jest.fn();
  /**
   * Fixture associated to function startSeamless
   */
  public startSeamless: jest.Mock<
    Promise<StartSeamlessVerificationResponse>,
    [StartSeamlessVerificationRequestData]> = jest.fn();
}
