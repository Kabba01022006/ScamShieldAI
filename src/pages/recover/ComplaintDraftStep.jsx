import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Edit3, 
  Info, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useForm } from '../../hooks/useForm';
import { FormField } from '../../components/form/FormField';
import { TextInput } from '../../components/form/TextInput';
import { SelectInput } from '../../components/form/SelectInput';
import { TextArea } from '../../components/form/TextArea';
import { 
  required, 
  minLength, 
  positiveAmount, 
  dateNotInFuture, 
  indianPhone, 
  composeValidators 
} from '../../utils/validators';

// Complaint categories aligned with cybercrime.gov.in and RBI Ombudsman reporting formats
const SCAM_CATEGORIES = [
  'Digital Arrest / Police Impersonation Video Call',
  'Urgent Electricity / Utility Cutoff SMS',
  'Marketplace P2P Reverse UPI QR Fraud (OLX/Quikr)',
  'Phishing SMS & Fake Bank PAN/KYC Update',
  'Telegram / WhatsApp Part-Time YouTube Job',
  'WhatsApp Institutional Stock Trading / Pre-IPO App',
  'Lottery / Counterfeit Cashier Cheque / Prize Overpayment',
  'Other Cyber Crime Vector',
];

export const ComplaintDraftStep = () => {
  const [generatedDraft, setGeneratedDraft] = useState(null);
  const [copied, setCopied] = useState(false);

  const validators = {
    scamType: required('Please select the incident category'),
    incidentDate: composeValidators(
      required('Date of incident is required'),
      dateNotInFuture('Incident date cannot be in the future')
    ),
    amountLost: composeValidators(
      required('Loss amount is required (enter 0 if no financial loss)'),
      positiveAmount('Amount must be positive')
    ),
    utrNumber: required('UTR or transaction reference number is required (or enter "N/A" if attempted)'),
    scammerIdentifier: required('Scammer\'s phone, UPI ID, or URL is required'),
    bankName: required('Your bank name and card/account ending 4 digits are required'),
    description: composeValidators(
      required('Chronological description of the incident is required'),
      minLength(20, 'Please write at least 20 characters explaining the sequence of events')
    ),
    complainantName: required('Full legal name is required'),
    complainantPhone: composeValidators(
      required('Primary contact mobile number is required'),
      indianPhone('Please enter a valid 10-digit Indian phone number')
    ),
  };

  const handleGenerateDraft = (formValues) => {
    const formattedLoss = Number(formValues.amountLost).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });

    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const draftText = `================================================================================
FORMAL CYBER FRAUD INCIDENT REPORT - COMPLAINT DRAFTING AID
Prepared via ScamShield AI (For submission to cybercrime.gov.in / 1930 / Bank Desk)
Date of Generation: ${currentDate}
================================================================================

1. COMPLAINANT PARTICULARS:
--------------------------------------------------------------------------------
Full Legal Name       : ${formValues.complainantName}
Primary Mobile Number : ${formValues.complainantPhone}
Victim's Bank Account : ${formValues.bankName}

2. INCIDENT SUMMARY & FINANCIAL LOSS:
--------------------------------------------------------------------------------
Scam Category / Vector : ${formValues.scamType}
Incident Encounter Date: ${formValues.incidentDate}
Total Disputed Amount  : ${formattedLoss} (INR)
Transaction/UTR Number : ${formValues.utrNumber}

3. SUSPECT ATTACKER DETAILS:
--------------------------------------------------------------------------------
Reported Identifier    : ${formValues.scammerIdentifier}
Contact Channel        : Phone Call / SMS / WhatsApp / Telegram / Web

4. CHRONOLOGICAL STATEMENT OF FACTS:
--------------------------------------------------------------------------------
${formValues.description}

5. IMMEDIATE MITIGATION ACTIONS TAKEN BY VICTIM:
--------------------------------------------------------------------------------
[X] Initiated Emergency Golden Hour protocol
[X] Dialed 1930 National Cyber Crime Helpline
[X] Contacted Issuer Bank to place fraud dispute / hold on transaction
[X] Preserved original SMS, call logs, and WhatsApp transcripts
[X] Blocked compromised cards, mobile banking access, and device credentials

6. ATTACHED EVIDENCE CHECKLIST FOR INVESTIGATING OFFICER:
--------------------------------------------------------------------------------
- Bank Account Statement showing fraudulent debit entry with UTR
- Screenshot of scammer's UPI ID / QR code / Phone conversation
- Copy of phishing SMS / Website URL / Skype handle
- Screenshot of SMS debit notification from bank

================================================================================
IMPORTANT LEGAL NOTICE & DISCLAIMER:
This document is an automated drafting aid. It DOES NOT file anything automatically.
You MUST officially submit this complaint at:
1. Online: https://cybercrime.gov.in (National Cyber Crime Reporting Portal)
2. By Phone: Dial 1930 (National Cyber Helpline)
3. Offline: Nearest Cyber Crime Police Station / Branch Bank Dispute Desk
================================================================================`;

    setGeneratedDraft(draftText);
    setCopied(false);
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues: {
      scamType: SCAM_CATEGORIES[0],
      incidentDate: new Date().toISOString().split('T')[0],
      amountLost: '',
      utrNumber: '',
      scammerIdentifier: '',
      bankName: '',
      description: '',
      complainantName: '',
      complainantPhone: '',
    },
    validators,
    onSubmit: handleGenerateDraft,
  });

  const handleCopy = () => {
    if (!generatedDraft) return;
    navigator.clipboard.writeText(generatedDraft).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleDownload = () => {
    if (!generatedDraft) return;
    const blob = new Blob([generatedDraft], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cyber_Crime_Complaint_Draft_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFillDemoSample = () => {
    setValues({
      scamType: 'Marketplace P2P Reverse UPI QR Fraud (OLX/Quikr)',
      incidentDate: new Date().toISOString().split('T')[0],
      amountLost: '14000',
      utrNumber: 'UTR481920194821',
      scammerIdentifier: 'fake.officer.deposit@okhdfcbank / +91 98214-50192',
      bankName: 'HDFC Bank A/c ending in 4812',
      description: 'Listed furniture on OLX. A buyer claiming to be an army officer agreed to purchase without bargaining and sent a PhonePe QR code claiming it would deposit ₹14,000 into my account. When I scanned the QR code and entered my UPI PIN, ₹14,000 was debited instead of credited. The scammer immediately switched off their mobile number.',
      complainantName: 'Aarav Sharma',
      complainantPhone: '9821450192',
    });
  };

  return (
    <div className="space-y-8 pt-6">
      
      {/* Notice Banner */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Drafting Aid Notice:</strong> This is an interactive drafting aid. It does not file anything officially. Use this tool to structure all required identifiers, transaction reference IDs, and incident timelines, then submit the generated draft at <strong>cybercrime.gov.in</strong> or call <strong>1930</strong>.
        </p>
      </div>

      {!generatedDraft ? (
        /* Form View */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
                Step 2: Cyber Crime Complaint Form
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                All fields are formatted according to official Indian National Cyber Crime Reporting Portal guidelines.
              </p>
            </div>

            <button
              type="button"
              onClick={handleFillDemoSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-teal-700 dark:text-teal-300 text-xs font-bold transition-colors shadow-sm self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Sample Scenario</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            
            {/* Section 1: Victim Profile */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                1. Complainant Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                <FormField
                  label="Complainant Legal Name"
                  name="complainantName"
                  required
                  error={errors.complainantName}
                >
                  <TextInput
                    name="complainantName"
                    value={values.complainantName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Aarav Sharma"
                  />
                </FormField>

                <FormField
                  label="Contact Mobile Number"
                  name="complainantPhone"
                  required
                  error={errors.complainantPhone}
                >
                  <TextInput
                    type="tel"
                    name="complainantPhone"
                    value={values.complainantPhone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. 9821450192 (10 digits)"
                  />
                </FormField>
              </div>
            </div>

            {/* Section 2: Incident Financials */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                2. Financial & Incident Particulars
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <FormField
                    label="Scam Type / Incident Vector"
                    name="scamType"
                    required
                    error={errors.scamType}
                  >
                    <SelectInput
                      name="scamType"
                      value={values.scamType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={SCAM_CATEGORIES}
                    />
                  </FormField>
                </div>

                <FormField
                  label="Incident Date"
                  name="incidentDate"
                  required
                  error={errors.incidentDate}
                >
                  <TextInput
                    type="date"
                    name="incidentDate"
                    value={values.incidentDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <FormField
                  label="Amount Lost (₹)"
                  name="amountLost"
                  required
                  hint="Enter 0 if blocked in time"
                  error={errors.amountLost}
                >
                  <TextInput
                    type="number"
                    name="amountLost"
                    value={values.amountLost}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. 14000"
                  />
                </FormField>

                <div className="sm:col-span-2">
                  <FormField
                    label="Transaction Reference / UTR Number"
                    name="utrNumber"
                    required
                    hint="12-digit UTR from your bank SMS / UPI statement"
                    error={errors.utrNumber}
                  >
                    <TextInput
                      name="utrNumber"
                      value={values.utrNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. UTR481920194821 or 4028192841"
                      className="font-mono"
                    />
                  </FormField>
                </div>
              </div>
            </div>

            {/* Section 3: Suspect & Narrative */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                3. Attacker Coordinates & Narrative
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                <FormField
                  label="Scammer's Phone / UPI ID / URL"
                  name="scammerIdentifier"
                  required
                  hint="Handle or number that lured you"
                  error={errors.scammerIdentifier}
                >
                  <TextInput
                    name="scammerIdentifier"
                    value={values.scammerIdentifier}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. fake.officer@okhdfcbank or 9845211094"
                    className="font-mono"
                  />
                </FormField>

                <FormField
                  label="Your Bank & Account / Card Ending"
                  name="bankName"
                  required
                  hint="e.g. SBI NetBanking or HDFC Debit ending in 4812"
                  error={errors.bankName}
                >
                  <TextInput
                    name="bankName"
                    value={values.bankName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. ICICI Bank A/c ending in 3921"
                  />
                </FormField>
              </div>

              <FormField
                label="Chronological Description of Incident"
                name="description"
                required
                hint="Detail the sequence: Initial contact, promises made, instructions given, and transfer details (min 20 characters)"
                error={errors.description}
              >
                <TextArea
                  name="description"
                  rows={4}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="State clearly what happened step by step..."
                />
              </FormField>
            </div>

            {/* Generate Action */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Formatted Complaint Draft</span>
              </button>
            </div>

          </form>

        </div>
      ) : (
        /* Generated Draft View */
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="p-6 bg-white dark:bg-slate-900 border-2 border-emerald-500/40 rounded-3xl space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-950 dark:text-white">
                    Formal Complaint Draft Prepared
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Ready to copy or download and submit at cybercrime.gov.in.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Plaintext'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .txt</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGeneratedDraft(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  title="Edit details"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Formatted Plain Text Output Area */}
            <div className="relative">
              <pre className="p-5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap select-all border border-slate-800 max-h-[500px]">
                {generatedDraft}
              </pre>
            </div>

            {/* Official Submission Guidance */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Next Official Actions:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400 leading-relaxed pl-1">
                <li>Visit <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 underline font-bold">cybercrime.gov.in</a> and click "Report Financial Fraud".</li>
                <li>Paste this structured draft into the incident narrative box.</li>
                <li>Call <strong>1930</strong> to reference your acknowledgment number with the police cell.</li>
                <li>Provide a copy of this text file to your home bank branch manager.</li>
              </ol>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default ComplaintDraftStep;
