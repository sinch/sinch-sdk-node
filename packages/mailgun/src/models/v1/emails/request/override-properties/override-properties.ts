import { YesNoEnum } from '../yes-no-enum';
import { YesNoHtmlonlyEnum } from '../yes-no-htmlonly-enum';

export interface OverrideProperties {
  /** Tag string.  See [Tagging](https://documentation.mailgun.com/docs/mailgun/user-manual/tracking-messages/#tagging) for more information */
  tag?: string | string[];
  /** Toggles Send Time Optimization (STO) on a per-message basis.  String should be set to the number of hours in `[0-9]+h` format, with the minimum being `24h` and the maximum being `72h`.  This value defines the time window in which Mailgun will run the optimization algorithm based on prior engagement data of a given recipient.  See **Sending a Message with STO** for details.  *Please note that STO is only available on certain plans. See www.mailgun.com/pricing for more info* */
  deliveryTimeOptimizePeriod?: number;
  /** Enables/disables DKIM signatures on a per-message basis */
  enableDkimSignature?: boolean;
  /** Specify a second domain key to sign the email with. The value is formatted as `signing_domain/selector`, e.g. `example.com/s1`. This tells Mailgun to sign the message with the signing domain `example.com` using the selector `s1`. Note: the domain key specified must have been previously created and activated. */
  secondaryDkim?: string;
  /** Specify an alias of the domain key specified in `o:secondary-dkim`. Also formatted as `public_signing_domain/selector`. `o:secondary-dkim` option must also be provided. Mailgun will sign the message with the provided key of the secondary DKIM, but use the public secondary DKIM name and selector. Note: We will perform a DNS check prior to signing the message to ensure the public keys matches the secondary DKIM. */
  secondaryDkimPublic?: string;
  /** Specifies the scheduled delivery time in RFC-2822 format (https://documentation.mailgun.com/docs/mailgun/user-manual/get-started/#date-format). Depending on your plan, you can schedule messages up to 3 or 7 days in advance. If your domain has a custom message_ttl (time-to-live) setting, this value determines the maximum scheduling duration. */
  deliveryTime?: Date | string;
  /** Toggles Timezone Optimization (TZO) on a per message basis. String should be set to preferred delivery time in `HH:mm` or `hh:mmaa` format, where `HH:mm` is used for 24 hour format without AM/PM and hh:mmaa is used for 12 hour format with AM/PM. See **Sending a Message with TZO** for details.  *Please note that TZO is only available on certain plans. See www.mailgun.com/pricing for more info* */
  timeZoneLocalize?: string;
  /** Toggles click tracking on a per-message basis, see [Tracking Clicks](https://documentation.mailgun.com/docs/mailgun/user-manual/tracking-messages/#tracking-clicks).  Has higher priority than domain-level setting. */
  trackingClicks?: YesNoHtmlonlyEnum;
  /** Toggles both click and open tracking on a per-message basis, see [Tracking Messages](https://documentation.mailgun.com/docs/mailgun/user-manual/tracking-messages) for details. */
  tracking?: YesNoHtmlonlyEnum;
  /** Toggles opens tracking on a per-message basis, see [Tracking Opens](https://documentation.mailgun.com/docs/mailgun/user-manual/tracking-messages/#tracking-opens).  Has higher priority than domain-level setting. */
  trackingOpens?: YesNoEnum;
  /** If you send long emails that experience truncation or other rendering issues at the recipient, you can ensure opens are being tracked accurately with placement of the tracking pixel at the top of your emails */
  trackingPixelLocationTop?: YesNoHtmlonlyEnum;
  /** Used to specify an IP Address to send an email that is owned by your account */
  sendingIp?: string;
  /** If an IP Pool ID is provided, the email will be delivered with an IP that belongs in that pool */
  sendingIpPool?: string;
  /** Requires the message only be sent over a TLS connection, see [TLS Sending Connection Settings](https://documentation.mailgun.com/docs/mailgun/user-manual/tls-sending/).  If a TLS connection can not be established, Mailgun will not deliver the message.  If set to `false` or `no`, Mailgun will still try and upgrade the connection, but if Mailgun cannot, the message will be delivered over a plaintext SMTP connection.  The default is `false` */
  requireTls?: boolean;
  /** If `true`, the certificate and hostname of the resolved MX Host will not be verified when trying to establish a TLS connection. If `false`, Mailgun will verify the certificate and hostname. If either one can not be verified, a TLS connection will not be established. The default is `false` */
  skipVerification?: boolean;
  /** Enables sending in test mode. See [Sending in Test Mode](https://documentation.mailgun.com/docs/mailgun/user-manual/sending-messages/#sending-in-test-mode) */
  isTestMode?: boolean;
}
