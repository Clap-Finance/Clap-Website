
export interface WaitlistPayload {
  full_name: string;
  email: string;

  terms: boolean;

  device_type: string;
  country: string;

  referral_source: string;
  campaign_source: string;

  time_on_page: number;
}
