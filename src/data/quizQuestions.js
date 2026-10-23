/**
 * Spot the Scam Quiz Questions - Cybercrime Scenarios (India Context)
 * Topics:
 * 1. Digital Arrest Skype Call (Scam)
 * 2. Electricity Bill Disconnection SMS (Scam)
 * 3. OLX Reverse UPI QR Code Payment (Scam)
 * 4. Fake Bank KYC Expiry SMS with Link (Scam)
 * 5. Official Bank Debit Alert with Toll-Free Number (Safe)
 */

export const QUIZ_QUESTIONS = [
  {
    id: 'digital-arrest',
    category: 'Digital Arrest / Authority Impersonation',
    sender: 'Incoming Skype Video Call: "CBI_CyberCrime_HQ"',
    scenario:
      'A caller in a police uniform claims a parcel with 16 fake passports and narcotic drugs was seized under your Aadhaar at Mumbai Airport. He orders you to stay on video call in "Digital Arrest" and transfer ₹1,50,000 to an RBI verification escrow account to avoid immediate imprisonment.',
    isScam: true,
    redFlags: [
      'Indian Law Enforcement (Police, CBI, ED) never conducts interrogations or "Digital Arrests" via Skype, Zoom, or WhatsApp video calls.',
      'There is no legal concept called "Digital Arrest" in the Indian Criminal Procedure Code (CrPC/BNSS).',
      'No genuine government agency ever demands public funds to be transferred into personal or "verification" bank accounts.'
    ]
  },
  {
    id: 'electricity-cutoff',
    category: 'Urgent Utility Bill Disconnection',
    sender: 'SMS from +91 98452 11094',
    scenario:
      'SMS received at 7:45 PM: "Dear Consumer, your electricity power connection will be disconnected tonight at 9:30 PM due to last month unpaid bill. Immediately contact Power Officer Mr. R.K. Sharma at 9845211094 or download DiscomBill.apk to update payment."',
    isScam: true,
    redFlags: [
      'Legitimate power discoms (e.g. Tata Power, BSES, PSPCL, MSEB) only send official SMS from verified 6-character sender IDs (like VK-TATAPW), never from random 10-digit mobile numbers.',
      'Discoms never ask consumers to install third-party .apk files or call personal phone numbers.',
      'Creating artificial panic with an imminent cutoff deadline (e.g. "tonight at 9:30 PM") is a classic psychological trap.'
    ]
  },
  {
    id: 'olx-reverse-qr',
    category: 'Marketplace P2P Reverse QR Fraud',
    sender: 'WhatsApp Message from OLX Buyer',
    scenario:
      'You listed an old sofa on OLX for ₹14,000. A buyer claiming to be an Army Officer in a cantonment says: "I am transferring the full amount in advance. Open your PhonePe/GPay, scan this UPI QR code, and enter your 6-digit UPI PIN to immediately receive the ₹14,000 deposit."',
    isScam: true,
    redFlags: [
      'Scanning a QR code or entering your UPI PIN is STRICTLY used to DEBIT (send) money, NEVER to receive money.',
      'To receive money on UPI, you only share your UPI ID or mobile number—no PIN, OTP, or QR scan is ever required.',
      'Impersonating military or defence personnel is a rampant social engineering tactic on second-hand marketplaces.'
    ]
  },
  {
    id: 'fake-kyc-link',
    category: 'Phishing & Credential Harvesting',
    sender: 'SMS from +91 76098 44321',
    scenario:
      'SMS: "Dear SBI Customer, your YONO NetBanking service has been suspended today due to non-updated PAN KYC. Visit http://sbi-kyc-verify-portal.xyz/login within 24 hours to re-verify documents and unblock your netbanking immediately."',
    isScam: true,
    redFlags: [
      'Banks never send unverified generic domains (.xyz, .top, .work) or URL shorteners to collect sensitive credentials.',
      'Official bank portals always end in their official domain (e.g., https://onlinesbi.sbi or https://hdfcbank.com).',
      'Banking KYC is updated either in-branch or inside the authenticated official banking app, never through unverified SMS hyperlinks.'
    ]
  },
  {
    id: 'genuine-bank-alert',
    category: 'Official Transaction Notification',
    sender: 'SMS from "VM-HDFCBK"',
    scenario:
      'SMS: "INR 3,250.00 debited from HDFC Bank A/c ending **4812 at POS SHOPPERS STOP on 23-OCT-26 15:10:44. Avail Bal: INR 38,420.50. If not done by you, immediately SMS BLOCK to 5676712 or call toll-free 1800-202-6161."',
    isScam: false,
    redFlags: [
      'This is a GENUINE bank transaction advisory: it originates from a TRAI-registered official bank header (VM-HDFCBK).',
      'It contains NO hyperlinks, does not ask you to enter credentials, and masks your account number (**4812).',
      'It provides legitimate toll-free emergency dispute options (1800-202-6161) without urging you to install unknown software.'
    ]
  }
];
