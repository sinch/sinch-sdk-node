import { SinchClientParameters } from '@sinch/sdk-client';
import { EmailsApi, EmailsApiFixture } from '../../../../src';
import {
  sendEmailRequestWithHtml,
  sendMimeEmailRequest,
} from '../../../models/v1/emails/request';
import {
  genericResponse,
  getEmailResponse,
  sendEmailResponse,
  sendingQueuesStatusResponse,
} from '../../../models/v1/emails/response';

describe('EmailsApi', () => {
  let emailsApi: EmailsApi;
  let fixture: EmailsApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new EmailsApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
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

  describe('getEmail', () => {
    it('should make a GET request to retrieve an email', async () => {
      // Given
      const domainName: string = 'domainName';
      const storageKey: string = 'storageKey';

      // When
      fixture.getEmail.mockResolvedValue(getEmailResponse);
      emailsApi.getEmail = fixture.getEmail;
      const response = await emailsApi.getEmail(domainName, storageKey);

      // Then
      expect(response).toEqual(getEmailResponse);
      expect(fixture.getEmail).toHaveBeenCalledWith(domainName, storageKey);
    });
  });

  describe('purgeDomainQueues', () => {
    it('should make a DELETE request to purge the domain queues', async () => {
      // Given
      const domainName: string = 'domainName';

      // When
      fixture.purgeDomainQueues.mockResolvedValue(genericResponse);
      emailsApi.purgeDomainQueues = fixture.purgeDomainQueues;
      const response = await emailsApi.purgeDomainQueues(domainName);

      // Then
      expect(response).toEqual(genericResponse);
      expect(fixture.purgeDomainQueues).toHaveBeenCalledWith(domainName);
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
