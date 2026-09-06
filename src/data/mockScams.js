export const initialScams = [
  {
    id: "scam-in-01",
    title: "CBI & Mumbai Police Skype 'Digital Arrest' Extortion Call",
    scamType: "Phone Call",
    identifier: "+91 98214-50192",
    secondaryIdentifier: "Skype: CBI_CyberCrime_HQ / Fake Notice",
    threatLevel: "Critical",
    incidentDate: "2025-02-24",
    reportedBy: "Sunil S. (Gurugram)",
    meTooCount: 142,
    summary: "Video call from imposter in police uniform alleging illegal drug parcel seized in Mumbai, holding victim under fake 'Digital Arrest' for ₹5,00,000.",
    description: "Received an automated IVR call claiming my mobile number was being disconnected by TRAI. It redirected to a caller claiming to be from the Crime Branch in Mumbai. The scammer demanded I join a Skype video call, where a man wearing a police uniform sat in front of a mock police station backdrop with official seals. He accused me of money laundering and sending 16 MDMA passports to Thailand. He placed me under 'Digital Arrest' for 48 hours, forbidding me to disconnect, and instructed me to transfer all savings into an 'RBI Verified Security Vault Account' to verify innocence.",
    redFlags: [
      "Caller demanding you join a Skype/WhatsApp video call for official police interrogation",
      "Police officer on video forbidding you from leaving your room or talking to family",
      "Claims of 'Digital Arrest' which has zero legal basis in Indian law",
      "Instructions to transfer money into 'temporary government audit accounts'"
    ],
    preventionTip: "There is NO legal concept of 'Digital Arrest' under Indian law. Genuine police or CBI officers NEVER question suspects or issue bail over Skype or WhatsApp video calls. Dial 1930 immediately.",
  },
  {
    id: "scam-in-02",
    title: "Bengaluru Telegram YouTube Like & Subscribe Job Scam",
    scamType: "SMS",
    identifier: "+91 91082-37194",
    secondaryIdentifier: "Telegram: @Global_Task_Coordinator",
    threatLevel: "High",
    incidentDate: "2025-02-12",
    reportedBy: "Pooja K. (Bengaluru)",
    meTooCount: 84,
    summary: "WhatsApp offer of ₹3,000/day for liking YouTube videos; paid small trial amount before tricking victim into ₹1,20,000 'prepaid merchant tasks'.",
    description: "Received an unsolicited message on WhatsApp from a supposed digital marketing HR agent offering part-time work: like 3 YouTube videos and get ₹150 instantly. I did it and they actually credited ₹150 to my UPI! Then they moved me to a Telegram group with 40 other people showing screenshots of ₹20,000 daily profits. The admin introduced 'prepaid crypto rating tasks' where I had to deposit ₹10,000 to earn ₹14,000. When I wanted to withdraw my money, they demanded ₹50,000 more for 'system tax clearance' and locked the group.",
    redFlags: [
      "Unsolicited job offer on WhatsApp offering high daily earnings for effortless tasks",
      "Early bait payout of ₹100–₹200 to build trust and eliminate suspicion",
      "Migration to private Telegram groups with simulated members posting fake earnings",
      "Requiring workers to deposit their own money into unknown accounts to 'unlock' earnings"
    ],
    preventionTip: "Legitimate companies will never recruit via unsolicited WhatsApp texts or ask you to pay money to receive wages for liking videos or posting reviews.",
   
  },
  {
    id: "scam-in-03",
    title: "Mumbai WhatsApp Institutional Stock Trading & IPO Scam",
    scamType: "Website",
    identifier: "+91 98201-84729",
    secondaryIdentifier: "Elite Institutional Wealth Club (WhatsApp)",
    threatLevel: "Critical",
    incidentDate: "2025-02-08",
    reportedBy: "Rajesh N. (Mumbai)",
    meTooCount: 110,
    summary: "WhatsApp investment group promising 400% returns and guaranteed pre-IPO allotment via custom APK app; victim lost ₹8,50,000.",
    description: "Added to a WhatsApp group called 'VIP Institutional Investors Club' purportedly managed by a SEBI registered portfolio manager. Group admins shared daily stock tips that appeared to surge on the market. They offered members access to an exclusive 'Institutional Upper-Circuit Trading App' not on the Play Store. The app showed my balance multiplying to ₹24 Lakhs within two weeks. When I clicked withdraw, the admin demanded a 20% 'capital gains tax' transfer to a private individual account. After sending ₹1,70,000, I was ejected from the group.",
    redFlags: [
      "Added to an investment WhatsApp group without your prior consent",
      "Promises of guaranteed 200%–500% returns or guaranteed allotment in oversubscribed IPOs",
      "App distributed via direct link or APK download instead of Google Play Store or Apple App Store",
      "Funds transferred to individual mule savings accounts rather than registered broker clearing accounts"
    ],
    preventionTip: "Only invest through brokers registered with SEBI. Verify broker registration numbers on the official SEBI portal (sebi.gov.in) before depositing any money.",
   
  },
  {
    id: "scam-101",
    title: "Fake USPS Delivery Failure Text Link",
    scamType: "SMS",
    identifier: "+1 (833) 492-0194",
    secondaryIdentifier: "usps-redelivery-tracking-portal.com",
    threatLevel: "High",
    incidentDate: "2025-02-18",
    reportedBy: "Marcus T.",
    meTooCount: 42,
    summary: "SMS claiming package address missing with link asking for credit card to pay $0.35 redelivery fee.",
    description: "Received an urgent SMS claiming my parcel could not be delivered due to incomplete street address info. The message urged me to click 'usps-redelivery-tracking-portal.com' within 12 hours or package would be returned to sender. The website looked identical to the official USPS portal, but asked for full credit card details and SSN to pay a small '$0.35 redelivery fee'. The real USPS never sends unsolicited texts demanding credit card payment for address updates.",
    redFlags: [
      "Unofficial domain (not usps.com)",
      "Urgent countdown timer to induce panic",
      "Requesting full payment credentials for trivial 35-cent fee",
      "Sent from a random toll-free VOIP number"
    ],
    preventionTip: "Never click package tracking links in unsolicited SMS. Always go directly to USPS.com or your carrier's official app to track packages.",
   
  },
  {
    id: "scam-102",
    title: "Counterfeit Chase Bank Security Alert Call",
    scamType: "Phone Call",
    identifier: "+1 (800) 935-9935",
    secondaryIdentifier: "Spoofed Chase Fraud Department",
    threatLevel: "Critical",
    incidentDate: "2025-02-14",
    reportedBy: "Elena R.",
    meTooCount: 78,
    summary: "Spoofed bank number calling about fraudulent Wire transfer, demanding One-Time Passcode (OTP).",
    description: "Caller ID showed the exact official Chase customer support phone number (+1 800-935-9935). The automated voice and subsequent agent claimed a suspicious wire transfer of $2,450 to an overseas crypto exchange was pending. To 'cancel' the transaction, they demanded I read back the 6-digit verification code sent to my phone. In reality, that code was authorization for them to log into my account and initiate the actual transfer.",
    redFlags: [
      "Caller ID spoofing legitimate corporate bank numbers",
      "Creating extreme panic regarding imminent financial loss",
      "Demanding multi-factor authentication (OTP) codes over the phone",
      "Insisting you must not hang up or call back directly"
    ],
    preventionTip: "Banks will NEVER call and ask for your two-factor authentication code or password. Hang up immediately and dial the number printed on the back of your debit/credit card.",
    
  },
  {
    id: "scam-103",
    title: "Phishing Amazon Prime Auto-Renewal Invoice",
    scamType: "Email",
    identifier: "billing-support@prime-service-renewals.co",
    secondaryIdentifier: "+1 (888) 604-1293",
    threatLevel: "High",
    incidentDate: "2025-02-11",
    reportedBy: "David K.",
    meTooCount: 31,
    summary: "PDF invoice claiming $499 annual Amazon Prime auto-charge with toll-free refund number.",
    description: "An email arrived containing an attached PDF titled 'INVOICE_AMZ_88291.pdf'. It stated that an annual subscription of $499.00 had successfully billed to my card, and provided a toll-free number (+1 888-604-1293) to cancel within 24 hours. Calling the number connects to a call center attempting to convince victims to download AnyDesk or TeamViewer to 'process a refund through your online banking'.",
    redFlags: [
      "Sender email domain is @prime-service-renewals.co instead of @amazon.com",
      "Toll-free customer support number embedded inside PDF attachment",
      "Prompts to install remote desktop software (TeamViewer, AnyDesk)",
      "Invoice for services never requested or purchased"
    ],
    preventionTip: "Check your official account orders page on Amazon.com directly. Legitimate companies never instruct you to install remote desktop software to issue a refund.",
  
  },
  {
    id: "scam-104",
    title: "Cloned 'CryptoApex' High-Yield Staking Platform",
    scamType: "Website",
    identifier: "https://cryptoapex-vault-earn.org",
    secondaryIdentifier: "Telegram: @CryptoApexVIPAdmin",
    threatLevel: "Critical",
    incidentDate: "2025-02-05",
    reportedBy: "Siddharth N.",
    meTooCount: 56,
    summary: "Fake decentralized finance investment portal offering guaranteed 18% daily staking returns.",
    description: "Advertised through sponsored Twitter / X ads and Reddit finance threads. The site looks like a sleek modern Web3 dashboard. Users deposit USDT or ETH into smart contracts that display simulated profits. However, when attempting to withdraw, the platform demands a 25% 'liquidity unlock fee' and freezes all funds. The contract address drains the user's connected wallet permissions.",
    redFlags: [
      "Unrealistic returns (18% daily guaranteed)",
      "Anonymous team with no verified corporate entity",
      "Demands additional deposit/fee to withdraw existing funds",
      "Smart contract requires unlimited token spending approval"
    ],
    preventionTip: "Guaranteed high returns in cryptocurrency are always scams. Use tool like revoke.cash to inspect approvals and never invest in unknown Web3 domains.",
   
  },
  {
    id: "scam-105",
    title: "Instagram Brand Ambassador Clothing Scheme",
    scamType: "Social Media",
    identifier: "@luxe_aura_apparel_official",
    secondaryIdentifier: "DM via Instagram / TikTok",
    threatLevel: "Medium",
    incidentDate: "2025-01-29",
    reportedBy: "Chloe M.",
    meTooCount: 27,
    summary: "Direct messages offering paid brand sponsorship, but requires victim to pay hefty 'shipping fees'.",
    description: "Account with 40k bot followers sends direct message to small content creators: 'We love your aesthetic! We want to send you 4 free luxury outfits and pay you $500 per post.' When you accept, they send a link to an unbranded Shopify store and give a 100% discount code. However, the international shipping checkout costs $48. The clothes either never arrive or are $2 dollar junk from drop-shipping warehouses.",
    redFlags: [
      "Cold DMs from accounts with high follower count but low engagement/comments",
      "Offering sponsorships to personal accounts without formal contracts",
      "Requiring the influencer to pay any out-of-pocket 'handling' or 'shipping' fee"
    ],
    preventionTip: "Legitimate brand ambassadors are never asked to pay for product shipping. If you have to pay money to get 'free' items, you are the customer, not the ambassador.",
    
  },
  {
    id: "scam-106",
    title: "Sticker QR Code Scam on Public Parking Meters",
    scamType: "Other",
    identifier: "pay-quick-parking-mobile.net",
    secondaryIdentifier: "Physical QR Stickers on City Meters",
    threatLevel: "High",
    incidentDate: "2025-01-22",
    reportedBy: "Jason L.",
    meTooCount: 63,
    summary: "Fraudulent QR code stickers pasted over authentic city parking payment instructions.",
    description: "Criminals pasted vinyl adhesive QR codes directly over the official PayByPhone / ParkMobile barcodes on city parking meters downtown. Scanning the QR code opens 'pay-quick-parking-mobile.net' mimicking city municipal branding, charging $15 for parking while stealing the credit card details. Drivers still received parking citations because the municipal system was never paid.",
    redFlags: [
      "QR code is a sticker physically layered over the original metal plate",
      "URL directs to a generic .net domain instead of official city portal or app",
      "Asks for repetitive personal information not normally needed for parking"
    ],
    preventionTip: "Feel the surface of the parking meter — if the QR code is a sticker pasted over the sign, do not scan it. Download and use the official city parking app from the App Store.",
   
  },
  {
    id: "scam-107",
    title: "E-Pass Toll Services Unpaid Highway Fee SMS",
    scamType: "SMS",
    identifier: "+1 (415) 880-3199",
    secondaryIdentifier: "toll-services-express-pay.org",
    threatLevel: "High",
    incidentDate: "2025-01-19",
    reportedBy: "Anthony B.",
    meTooCount: 89,
    summary: "SMS alleging an unpaid $11.50 toll with late penalty warning unless paid via malicious portal.",
    description: "Received an urgent text: 'SunPass/E-ZPass notice: You have an outstanding balance of $11.50 from your recent commute. Avoid a $50.00 late fee by resolving balance immediately at toll-services-express-pay.org.' The victim was driving out of state that weekend so assumed it was genuine. The site captured credit card numbers and CVVs for fraudulent charges.",
    redFlags: [
      "Generic sender number with no state agency affiliation",
      "Unspecified license plate or vehicle description in the message",
      "Shortened or unverified web domain not ending in .gov"
    ],
    preventionTip: "Toll authorities do not send text messages with payment links without prior opt-in account registration. Check your state toll account directly on the verified state website.",
   
  },
  {
    id: "scam-108",
    title: "Fake Remote Job Offer with Counterfeit Equipment Check",
    scamType: "Email",
    identifier: "hr-talent@apexglobal-careers.com",
    secondaryIdentifier: "Apex Global Solutions Inc.",
    threatLevel: "Critical",
    incidentDate: "2025-01-15",
    reportedBy: "Sarah W.",
    meTooCount: 44,
    summary: "Remote data analyst job interview conducted solely via Telegram; sent fake $3,200 check for home office gear.",
    description: "Applied on LinkedIn for a remote position. Received an email invitation from a legitimate-sounding recruiter. The interview was conducted entirely over Telegram chat messages. They sent a digital cashier's check for $3,200 to purchase equipment (MacBook, monitor) through their 'approved vendor' via Zelle. A few days later, the bank rejected the fake check, leaving the applicant on the hook for the $3,200 transferred to the scammer.",
    redFlags: [
      "Job offer without a video interview or phone conversation",
      "Company sends check before work starts and asks you to forward funds to an 'approved vendor'",
      "Interviews conducted on messaging apps like Telegram, WhatsApp, or Signal"
    ],
    preventionTip: "Legitimate employers never send checks to employees to buy gear from specific wire/Zelle vendors. They ship company-managed hardware directly to your address.",
   
  },
  {
    id: "scam-109",
    title: "IRS Legal Action Arrest Threat Robocall",
    scamType: "Phone Call",
    identifier: "+1 (202) 555-0143",
    secondaryIdentifier: "Automated Federal Warrant Message",
    threatLevel: "High",
    incidentDate: "2025-01-08",
    reportedBy: "Robert P.",
    meTooCount: 52,
    summary: "Threatening robocall claiming local sheriff will execute arrest warrant for tax fraud unless settled.",
    description: "Automated voice stated: 'This is Officer Davis from the Internal Revenue Service. A formal indictment and arrest warrant have been filed against your Social Security number for unpaid back taxes of $4,820. Press 1 to speak with an investigator.' When pressed, the agent demands immediate payment via Target gift cards or crypto Bitcoin ATMs to avoid police dispatch.",
    redFlags: [
      "Government agency demanding payment via retail gift cards, prepaid cards, or Bitcoin ATM",
      "Threatening immediate arrest or deportation",
      "Refusing to mail formal written documentation",
      "Aggressive and coercive verbal tactics"
    ],
    preventionTip: "The IRS always initiates contact by regular mail delivered by the USPS. The IRS never threatens immediate arrest or demands gift cards/cryptocurrency.",
    
  },
  {
    id: "scam-110",
    title: "Facebook Marketplace Zelle 'Business Account' Upgrade",
    scamType: "Social Media",
    identifier: "buyer_mark_9921",
    secondaryIdentifier: "service@zelle-payment-protection.info",
    threatLevel: "Medium",
    incidentDate: "2024-12-28",
    reportedBy: "Samantha G.",
    meTooCount: 39,
    summary: "Buyer on Marketplace claims payment failed because seller needs to pay $300 to upgrade Zelle to business.",
    description: "Listed a couch for $200 on FB Marketplace. Buyer quickly agreed to buy without negotiation and claimed to send payment via Zelle. Moments later, received a fake email from 'service@zelle-payment-protection.info' stating the transaction could not clear because the seller has a personal account. The email claimed the buyer sent an extra $300 to upgrade the account, and the seller must refund $300 to activate funds.",
    redFlags: [
      "Buyer refuses in-person cash payment upon pickup",
      "Email from non-bank domain claiming account must be upgraded",
      "Claims buyer paid extra money that you must immediately refund",
      "No transaction record appears inside your official banking app"
    ],
    preventionTip: "Zelle does not require sellers to pay to 'upgrade' their personal account to receive payments. Always verify transactions in your real bank app, not by checking incoming emails.",
  
  },
  {
    id: "scam-111",
    title: "Fake Netflix Account Suspension Billing Website",
    scamType: "Website",
    identifier: "https://netflix-account-verification-center.net",
    secondaryIdentifier: "update-billing@netflix-member-notify.com",
    threatLevel: "High",
    incidentDate: "2024-12-19",
    reportedBy: "Kevin H.",
    meTooCount: 48,
    summary: "Phishing replica of Netflix login page claiming monthly membership billing failed.",
    description: "An email with high-quality Netflix branding claimed 'We were unable to process your payment for the next billing cycle. Please update your details to continue streaming.' Clicking the button opens a pixel-perfect replica of the Netflix login screen, followed by a form requesting full debit card details, billing address, and security code.",
    redFlags: [
      "Domain is netflix-account-verification-center.net instead of netflix.com",
      "Clicking logo or footer links on the fake site does nothing or redirects to home",
      "Asks for credit card details without requiring you to authenticate with 2FA first"
    ],
    preventionTip: "Never click billing links from streaming emails. Open your browser, type netflix.com directly, and check your Account settings.",
 
  },
  {
    id: "scam-112",
    title: "Puppy Adoption Transport Escrow Scam",
    scamType: "Other",
    identifier: "golden-retriever-home-pups.com",
    secondaryIdentifier: "Wire Transfer / Western Union",
    threatLevel: "High",
    incidentDate: "2024-12-05",
    reportedBy: "Rachel T.",
    meTooCount: 22,
    summary: "Fraudulent pet breeder website charging $600 deposit followed by fake $1,200 temperature crate fee.",
    description: "Found an adorable Golden Retriever puppy listed for $600 with 'free nationwide shipping'. After paying via Zelle, a supposed pet delivery service emailed stating the puppy was stuck at an airport layover and needed a specialized temperature-regulated electronic crate costing an additional $1,200 refundable insurance deposit. The puppy never existed.",
    redFlags: [
      "Breeder refuses live FaceTime or in-person visits to see the puppies",
      "Puppy price is significantly lower than average certified breeders",
      "Unforeseen airport shipping/crate insurance charges demanded after initial payment"
    ],
    preventionTip: "Never buy pets online without seeing them in person or via live video call with the breeder. Use reputable adoption agencies or local rescue shelters.",
  
  },
  {
    id: "scam-113",
    title: "PayPal Fake Overpayment Mystery Shopper Cheque",
    scamType: "Email",
    identifier: "surveys-coordinator@mystery-shoppers-network.org",
    secondaryIdentifier: "+1 (800) 241-9988",
    threatLevel: "Medium",
    incidentDate: "2024-11-28",
    reportedBy: "Tyler S.",
    meTooCount: 19,
    summary: "Received $2,100 check in mail to evaluate Western Union customer service by wiring back $1,800.",
    description: "Received an official looking packet in the mail recruiting me as a 'Certified Secret Shopper'. It included a cashier's check for $2,100. Instructions stated to deposit the check, keep $300 as compensation, and test local Western Union money transfer speed by wiring the remaining $1,800 to an assigned regional manager. Two weeks later, the original check bounced as a counterfeit.",
    redFlags: [
      "Unsolicited employment materials received via postal mail",
      "Task involves wiring real money via Western Union, MoneyGram, or gift cards",
      "Check amount is far higher than any reasonable mystery shopping compensation"
    ],
    preventionTip: "Cashier's checks can take weeks to fully clear even if your bank makes funds temporarily available. Any job asking you to wire funds is fraudulent.",
    
  },
  {
    id: "scam-114",
    title: "WhatsApp 'Hi Mom' Emergency Phone Replacement",
    scamType: "SMS",
    identifier: "+44 7911 123456",
    secondaryIdentifier: "WhatsApp Message",
    threatLevel: "Critical",
    incidentDate: "2024-11-14",
    reportedBy: "Margaret D.",
    meTooCount: 95,
    summary: "WhatsApp message claiming daughter dropped phone in toilet and urgently needs money for rent.",
    description: "Message from unknown international number: 'Hi Mum, I dropped my phone in the sink so it's broken. This is my temporary number. I have an urgent bill due today and my mobile banking is locked out on this handset. Can you please pay £950 to this account for me? I will pay you back tomorrow.' The victim almost paid before calling her daughter's work number and finding her safe.",
    redFlags: [
      "Unrecognized phone number claiming to be a close family member",
      "Excuses for why they cannot speak over phone or take a voice call",
      "High urgency and immediate demand for bank transfer or peer-to-peer cash"
    ],
    preventionTip: "Always contact the family member on their original number or reach out to friends/relatives to verify identity before transferring any funds.",
  
  }
];
