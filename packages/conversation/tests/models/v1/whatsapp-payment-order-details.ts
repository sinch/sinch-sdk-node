import {
  Boleto,
  DynamicPix,
  PaymentLink,
} from '../../../src/models';

export const orderDetailsPaymentSettingsDynamicPix = {
  type: 'pix_dynamic_code',
  // eslint-disable-next-line max-len
  code: '00020101021226890014BR.GOV.BCB.PIX2553qrcodes-pix.bcb.gov.br/qr/v2/1234567890123456789020300000000045204000053039865405123.455802BR5912ACME LTDA6014SAO PAULO62070503***6304B14F',
  merchant_name: 'MERCHANT NAME',
  key: '+552199999999',
  key_type: 'PHONE',
} satisfies DynamicPix;

export const orderDetailsPaymentSettingsPaymentLink = {
  type: 'payment_link',
  uri: 'https://payment.link/abc123',
} satisfies PaymentLink;

export const orderDetailsPaymentSettingsBoleto = {
  type: 'boleto',
  digitable_line: '00190.00009 01234.567890 12345.678901 7 89010000012345',
} satisfies Boleto;
