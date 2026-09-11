const cityData = [
    {
        name: 'Delhi NCR',
        state: 'Delhi • Gurugram • Noida',
        x: 165,
        y: 175,
        risk: 'Critical',
        cases: 642,
        method: 'Digital Arrest',
        loss: '₹4,80,000',
        threat: 'Digital Arrest & Fake Police Video Calls',
        description: 'Fraudsters pretend to be police or CBI officers on video calls and demand money.',
        safety: 'Real police never arrest people or ask for money over WhatsApp or Skype.',
        search: 'digital arrest'
    },

    {
        name: 'Ludhiana',
        state: 'Punjab',
        x: 130,
        y: 130,
        risk: 'Critical',
        cases: 538,
        method: 'Visa & Job Fraud',
        loss: '₹3,80,000',
        threat: 'Fake Canada / UK Visa & Work Permit Job Fraud',
        description: 'Fake agents promise Canada or UK jobs and visas and ask for large processing fees.',
        safety: 'Embassies never give visas through WhatsApp or ask for money in personal accounts.',
        search: 'visa'
    },

    {
        name: 'Mumbai & Pune',
        state: 'Maharashtra',
        x: 105,
        y: 325,
        risk: 'Critical',
        cases: 590,
        method: 'Investment Fraud',
        loss: '₹8,50,000',
        threat: 'WhatsApp Stock Trading & Fake Institutional IPOs',
        description: 'Fake WhatsApp groups promise huge stock returns and block withdrawals after deposits.',
        safety: 'Never buy investments through random WhatsApp groups. Verify brokers first.',
        search: 'stock'
    },

    {
        name: 'Bengaluru',
        state: 'Karnataka',
        x: 150,
        y: 415,
        risk: 'High',
        cases: 475,
        method: 'Task Job Scam',
        loss: '₹1,20,000',
        threat: 'YouTube Like & Telegram Work-from-Home Tasks',
        description: 'Small payments for simple tasks are used to gain trust before asking for larger deposits.',
        safety: 'Legitimate companies do not ask you to pay money to complete online tasks.',
        search: 'telegram'
    },

    {
        name: 'Hyderabad',
        state: 'Telangana',
        x: 175,
        y: 345,
        risk: 'High',
        cases: 398,
        method: 'Loan App Extortion',
        loss: '₹65,000',
        threat: 'Instant Loan App Blackmail & Contact Extortion',
        description: 'Illegal loan apps can steal contacts and photos and later use them for blackmail.',
        safety: 'Do not install loan APKs from social media. Use trusted lenders.',
        search: 'loan'
    },

    {
        name: 'Kolkata',
        state: 'West Bengal',
        x: 295,
        y: 265,
        risk: 'High',
        cases: 340,
        method: 'Tech Support Spoof',
        loss: '₹32,000',
        threat: 'Fake Microsoft / Windows Virus Pop-Up Alert',
        description: 'Fake virus warnings make victims call scammers who ask for money for fake support.',
        safety: 'Microsoft, Apple and Google do not put random support phone numbers in virus pop-ups.',
        search: 'microsoft'
    },

    {
        name: 'Ahmedabad & Surat',
        state: 'Gujarat',
        x: 90,
        y: 245,
        risk: 'Medium',
        cases: 275,
        method: 'Tax Phishing',
        loss: '₹75,000',
        threat: 'Fake Income Tax & GST Refund SMS Phishing',
        description: 'Fake refund messages send users to websites that steal banking details and OTPs.',
        safety: 'Do not open suspicious tax refund links or enter banking passwords from SMS links.',
        search: 'tax'
    }
];

export default cityData;
