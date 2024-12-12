import { MailgunCredentials, MailgunStorageHostname } from '@sinch/sdk-client';
import { EmailsApi, EmailsApiFixture } from '../../../../src';
import {
  sendEmailRequestWithHtml,
  sendMimeEmailRequest,
} from '../../../models/v1/emails/request';
import {
  getStoredEmailResponse,
  sendEmailResponse,
  sendingQueuesStatusResponse,
} from '../../../models/v1/emails/response';

describe('EmailsApi', () => {
  let emailsApi: EmailsApi;
  let fixture: EmailsApiFixture;
  let credentials: MailgunCredentials;

  beforeEach(() => {
    fixture = new EmailsApiFixture();
    credentials = {
      mailgunApiKey: 'API_KEY',
    };
    emailsApi = new EmailsApi(credentials);
  });

  describe('sendEmail', () => {
    it('should make a POST request to send an email', async () => {
      // Given
      const domainName: string = 'domainName';

      // When
      fixture.sendEmail.mockResolvedValue(sendEmailResponse);
      emailsApi.sendEmail = fixture.sendEmail;
      const response = await emailsApi.sendEmail(domainName, sendEmailRequestWithHtml);

      // Then
      expect(response).toEqual(sendEmailResponse);
      expect(fixture.sendEmail).toHaveBeenCalledWith(domainName, sendEmailRequestWithHtml);
    });
  });

  describe('sendMimeEmail', () => {
    it('should make a POST request to send a MIME email', async () => {
      // Given
      const domainName: string = 'domainName';

      // When
      fixture.sendMimeEmail.mockResolvedValue(sendEmailResponse);
      emailsApi.sendMimeEmail = fixture.sendMimeEmail;
      const response = await emailsApi.sendMimeEmail(domainName, sendMimeEmailRequest);

      // Then
      expect(response).toEqual(sendEmailResponse);
      expect(fixture.sendMimeEmail).toHaveBeenCalledWith(domainName, sendMimeEmailRequest);
    });
  });

  describe('getStoredEmail', () => {
    it('should make a GET request to retrieve an email', async () => {
      // Given
      const domainName: string = 'domainName';
      const storageKey: string = 'storageKey';

      // When
      fixture.getStoredEmail.mockResolvedValue(getStoredEmailResponse);
      emailsApi.getStoredEmail = fixture.getStoredEmail;
      const response = await emailsApi.getStoredEmail(domainName, storageKey);

      // Then
      expect(response).toEqual(getStoredEmailResponse);
      expect(fixture.getStoredEmail).toHaveBeenCalledWith(domainName, storageKey);
    });
  });

  describe('purgeSendingQueue', () => {
    it('should make a DELETE request to purge a sending queue', async () => {
      // Given
      const domainName: string = 'domainName';
      const storageHostname: MailgunStorageHostname = 'storageHostname';
      const expectedResponse: Record<string, never> = {};

      // When
      fixture.purgeSendingQueue.mockResolvedValue(expectedResponse);
      emailsApi.purgeSendingQueue = fixture.purgeSendingQueue;
      const response = await emailsApi.purgeSendingQueue(domainName, storageHostname);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.purgeSendingQueue).toHaveBeenCalledWith(domainName, storageHostname);
    });
  });

  describe('getSendingQueuesStatus', () => {
    it('should make a GET request to fetch the sending queues status', async () => {
      // Given
      const name: string = 'name';

      // When
      fixture.getSendingQueuesStatus.mockResolvedValue(sendingQueuesStatusResponse);
      emailsApi.getSendingQueuesStatus = fixture.getSendingQueuesStatus;
      const response = await emailsApi.getSendingQueuesStatus(name);

      // Then
      expect(response).toEqual(sendingQueuesStatusResponse);
      expect(fixture.getSendingQueuesStatus).toHaveBeenCalledWith(name);
    });
  });
});
