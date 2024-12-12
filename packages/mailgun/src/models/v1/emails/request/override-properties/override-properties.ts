import { YesNoEnum, YesNoHtmlonlyEnum } from '../enum';
import FormData = require('form-data');

export interface OverrideProperties {
  /** Tag string.  See **Tagging** for more information */
  tag?: string;
  /** Toggles Send Time Optimization (STO) on a per-message basis.  String should be set to the number of hours in `[0-9]+h` format, with the minimum being `24h` and the maximum being `72h`.  This value defines the time window in which Mailgun will run the optimization algorithm based on prior engagement data of a given recipient.  See **Sending a Message with STO** for details.  *Please note that STO is only available on certain plans. See www.mailgun.com/pricing for more info* */
  deliveryTimeOptimizePeriod?: number;
  /** Enables/disables DKIM signatures on a per-message basis.  Pass `yes` or `no`, `true` or `false` */
  enableDkimSignature?: YesNoEnum;
  /** Specify a second domain key to sign the email with. The value is formatted as `signing_domain/selector`, e.g. `example.com/s1`. This tells Mailgun to sign the message with the signing domain `example.com` using the selector `s1`. Note: the domain key specified must have been previously created and activated. */
  secondaryDkim?: string;
  /** Specify an alias of the domain key specified in `o:secondary-dkim`. Also formatted as `public_signing_domain/selector`. `o:secondary-dkim` option must also be provided. Mailgun will sign the message with the provided key of the secondary DKIM, but use the public secondary DKIM name and selector. Note: We will perform a DNS check prior to signing the message to ensure the public keys matches the secondary DKIM. */
  secondaryDkimPublic?: string;
  /** Specifies the scheduled delivery time in RFC-2822 format (https://mailgun-docs.redoc.ly/docs/mailgun/api-reference/intro/#date-format). Depending on your plan, you can schedule messages up to 3 or 7 days in advance. If your domain has a custom message_ttl (time-to-live) setting, this value determines the maximum scheduling duration. */
  deliveryTime?: string;
  /** Toggles Timezone Optimization (TZO) on a per message basis. String should be set to preferred delivery time in `HH:mm` or `hh:mmaa` format, where `HH:mm` is used for 24 hour format without AM/PM and hh:mmaa is used for 12 hour format with AM/PM. See **Sending a Message with TZO** for details.  *Please note that TZO is only available on certain plans. See www.mailgun.com/pricing for more info* */
  timeZoneLocalize?: string;
  /** Toggles click tracking on a per-message basis.  Has higher priority than domain-level setting.  Pass `yes` or `no`, `true` or `false`, or `htmlonly` if you only want links rewritten in the HTML part of the message */
  trackingClicks?: YesNoHtmlonlyEnum;
  /** Toggles both click and open tracking on a per-message basis, see **Tracking Messages** for details.  Pass `yes` or `no`, `true` or `false`, or `htmlonly` if you only want links rewritten in the HTML part of the message */
  tracking?: YesNoHtmlonlyEnum;
  /** Toggles opens tracking on a per-message basis.  Has higher priority than domain-level setting.  Pass `yes` or `no`, `true` or `false` */
  trackingOpens?: YesNoEnum;
  /** If you send long emails that experience truncation or other rendering issues at the recipient, you can ensure opens are being tracked accurately with placement of the tracking pixel at the top of your emails */
  trackingPixelLocationTop?: YesNoEnum;
  /** Used to specify an IP Address to send an email that is owned by your account */
  sendingIp?: string;
  /** If an IP Pool ID is provided, the email will be delivered with an IP that belongs in that pool */
  sendingIpPool?: string;
  /** If set to `true` or `yes` this requires the message only be sent over a TLS connection.  If a TLS connection can not be established, Mailgun will not deliver the message.  If set to `false` or `no`, Mailgun will still try and upgrade the connection, but if Mailgun cannot, the message will be delivered over a plaintext SMTP connection.  The default is `false` */
  requireTls?: YesNoEnum;
  /** If set to `true` or `yes`, the certificate and hostname of the resolved MX Host will not be verified when trying to establish a TLS connection. If set to `false` or `no`, Mailgun will verify the certificate and hostname. If either one can not be verified, a TLS connection will not be established. The default is `false` */
  skipVerification?: YesNoEnum;
  /** Enables sending in test mode. Pass `yes` if needed.  See **Sending in Test Mode** */
  isTestMode?: YesNoEnum;
}

export const appendOverridePropertiesToFormData = (overrideProperties: OverrideProperties, formData: FormData) => {
  if (overrideProperties['tag'] != null) {
    formData.append('o:tag', overrideProperties['tag']);
  }
  if (overrideProperties['deliveryTimeOptimizePeriod'] != null) {
    formData.append('o:deliverytime-optimize-period', `${overrideProperties['deliveryTimeOptimizePeriod']}h`);
  }
  if (overrideProperties['enableDkimSignature'] != null) {
    formData.append('o:dkim', String(overrideProperties['enableDkimSignature']));
  }
  if (overrideProperties['secondaryDkim'] != null) {
    formData.append('o:secondary-dkim', overrideProperties['secondaryDkim']);
  }
  if (overrideProperties['secondaryDkimPublic'] != null) {
    formData.append('o:secondary-dkim-public', overrideProperties['secondaryDkimPublic']);
  }
  if (overrideProperties['deliveryTime'] != null) {
    formData.append('o:deliverytime', overrideProperties['deliveryTime']);
  }
  if (overrideProperties['timeZoneLocalize'] != null) {
    formData.append('o:time-zone-localize', overrideProperties['timeZoneLocalize']);
  }
  if (overrideProperties['tracking'] != null) {
    formData.append('o:tracking', String(overrideProperties['tracking']));
  }
  if (overrideProperties['trackingClicks'] != null) {
    formData.append('o:tracking-clicks', String(overrideProperties['trackingClicks']));
  }
  if (overrideProperties['trackingOpens'] != null) {
    formData.append('o:tracking-opens', String(overrideProperties['trackingOpens']));
  }
  if (overrideProperties['trackingPixelLocationTop'] != null) {
    formData.append('o:tracking-pixel-location-top', String(overrideProperties['trackingPixelLocationTop']));
  }
  if (overrideProperties['sendingIp'] != null) {
    formData.append('o:sending-ip', overrideProperties['sendingIp']);
  }
  if (overrideProperties['sendingIpPool'] != null) {
    formData.append('o:sending-ip-pool', overrideProperties['sendingIpPool']);
  }
  if (overrideProperties['requireTls'] != null) {
    formData.append('o:require-tls', String(overrideProperties['requireTls']));
  }
  if (overrideProperties['skipVerification'] != null) {
    formData.append('o:skip-verification', String(overrideProperties['skipVerification']));
  }
  if (overrideProperties['isTestMode'] != null) {
    formData.append('o:testmode', String(overrideProperties['isTestMode']));
  }
};
