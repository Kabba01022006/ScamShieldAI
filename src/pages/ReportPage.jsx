import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  UploadCloud, 
  X, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  Radio 
} from 'lucide-react';
import { useScams } from '../context/ScamContext';
import { useAuth } from '../context/AuthContext';
import { useSafetyStore } from '../store/useSafetyStore';
import { useForm } from '../hooks/useForm';
import { FormField } from '../components/form/FormField';
import { TextInput } from '../components/form/TextInput';
import { SelectInput } from '../components/form/SelectInput';
import { TextArea } from '../components/form/TextArea';
import { 
  required, 
  minLength, 
  dateNotInFuture, 
  composeValidators 
} from '../utils/validators';

export const ReportPage = () => {
  const navigate = useNavigate();
  const { addReport } = useScams();
  const { currentUser } = useAuth();
  const recordReport = useSafetyStore((state) => state.recordReport);

  const [proofFile, setProofFile] = useState(null);
  const [proofPreviewUrl, setProofPreviewUrl] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const scamTypes = [
    'Website',
    'Email',
    'Phone Call',
    'SMS',
    'Social Media',
    'Other'
  ];

  const threatLevels = [
    { value: 'Critical', label: 'Critical (Financial Drain / Account Takeover)' },
    { value: 'High', label: 'High (Phishing Link / Credential Harvesting)' },
    { value: 'Medium', label: 'Medium (Unsolicited Pitch / Suspicious Message)' },
  ];

  const reportValidators = {
    scamType: required('Please select a scam type'),
    identifier: required('The reported website, phone, or email is required'),
    title: required('A short summary/title is required'),
    incidentDate: composeValidators(
      required('Date of incident is required'),
      dateNotInFuture('Incident date cannot be in the future')
    ),
    description: composeValidators(
      required('Please provide details of what happened'),
      minLength(20, 'Please write at least 20 characters explaining the scam')
    ),
  };

  const handleFormSubmit = (formValues) => {
    addReport({
      scamType: formValues.scamType,
      identifier: formValues.identifier.trim(),
      secondaryIdentifier: formValues.secondaryIdentifier.trim(),
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      incidentDate: formValues.incidentDate,
      threatLevel: formValues.threatLevel,
      reportedBy: currentUser ? currentUser.name : 'Verified Citizen Sentinel',
      proofImage: proofPreviewUrl || "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60",
      proofFileName: proofFile ? proofFile.name : null
    });

    // Record report in Zustand store
    recordReport();

    setSuccessMessage('Scam threat signature published! Incident logged to database. Redirecting...');

    setTimeout(() => {
      navigate('/database');
    }, 1500);
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues: {
      scamType: 'Website',
      threatLevel: 'High',
      identifier: '',
      secondaryIdentifier: '',
      title: '',
      description: '',
      incidentDate: new Date().toISOString().split('T')[0],
    },
    validators: reportValidators,
    onSubmit: handleFormSubmit,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofFile(file);
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        setProofPreviewUrl(preview);
      } else {
        setProofPreviewUrl(null);
      }
    }
  };

  const removeFile = () => {
    setProofFile(null);
    if (proofPreviewUrl) {
      URL.revokeObjectURL(proofPreviewUrl);
      setProofPreviewUrl(null);
    }
  };

  const handleAutofillTemplate = () => {
    setValues({
      scamType: 'SMS',
      identifier: '+91 98452 11094',
      secondaryIdentifier: 'DiscomBill.apk / Urgent Cutoff',
      title: 'Electricity Power Disconnection Imminent Threat SMS',
      description: 'Received SMS stating: "Dear Consumer, power will be disconnected tonight at 9:30 PM due to unpaid bill. Immediately contact Power Officer or download DiscomBill.apk". APK asks for device administrator privileges and tries to steal SMS OTPs.',
      incidentDate: new Date().toISOString().split('T')[0],
      threatLevel: 'Critical',
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs font-bold">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Broadcast Incident Advisory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Submit Fraud Incident Report
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
          Document deceptive contact points, fraudulent phone numbers, or spoofed URLs to immunize the community against repeat attacks.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-white dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Success Alert Banner */}
        {successMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/15 dark:border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-800 dark:text-emerald-400 text-sm font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Template Helper Button */}
        <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            Need a structured sample format?
          </span>
          <button
            type="button"
            onClick={handleAutofillTemplate}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-teal-700 dark:text-teal-300 font-bold border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
          >
            ⚡ Load Threat Template
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          
          {/* Row 1: Scam Type + Threat Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Attack Vector / Scam Type"
              name="scamType"
              required
              error={errors.scamType}
            >
              <SelectInput
                name="scamType"
                value={values.scamType}
                onChange={handleChange}
                onBlur={handleBlur}
                options={scamTypes}
              />
            </FormField>

            <FormField
              label="Calculated Threat Severity"
              name="threatLevel"
            >
              <SelectInput
                name="threatLevel"
                value={values.threatLevel}
                onChange={handleChange}
                onBlur={handleBlur}
                options={threatLevels}
              />
            </FormField>
          </div>

          {/* Row 2: Primary Fraudulent Identifier */}
          <FormField
            label="Primary Fraudulent Identifier (Link, Phone, or UPI ID)"
            name="identifier"
            required
            hint="This exact identifier will be indexed for instant community search matches."
            error={errors.identifier}
          >
            <TextInput
              name="identifier"
              value={values.identifier}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. +91 98452-11094, sbi-kyc-verify-portal.xyz, scammer@okaxis"
              className="font-mono"
            />
          </FormField>

          {/* Optional Secondary Identifier */}
          <FormField
            label="Impersonated Brand / Secondary Contact Point (Optional)"
            name="secondaryIdentifier"
            hint="e.g. Impersonating Tata Power, Skype: CBI_CyberCrime_HQ"
          >
            <TextInput
              name="secondaryIdentifier"
              value={values.secondaryIdentifier}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. DiscomBill.apk / Telegram: @TaskCoordinator"
            />
          </FormField>

          {/* Row 3: Title & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <FormField
                label="Incident Title / Summary Headline"
                name="title"
                required
                error={errors.title}
              >
                <TextInput
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Fake electricity power cutoff SMS demanding APK install"
                />
              </FormField>
            </div>

            <FormField
              label="Date Encountered"
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

          {/* Description Textarea */}
          <FormField
            label="Detailed Attack Methodology"
            name="description"
            required
            hint="Describe the tactics: How did they contact you? What payment or credentials were demanded? (Min 20 characters)"
            error={errors.description}
          >
            <TextArea
              name="description"
              rows={4}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Describe the tactics: How did they contact you? What payment or information was demanded? What fake threats were made?..."
            />
          </FormField>

          {/* File Upload for Proof / Screenshot */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              Screenshot Evidence / Threat Artifacts (Optional)
            </label>

            {!proofFile ? (
              <label className="border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-teal-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/60 dark:hover:bg-slate-950">
                <UploadCloud className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-2" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Select screenshot, email header, or message capture
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  PNG, JPG, or WEBP up to 10MB (Stored securely in local session)
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 truncate">
                  {proofPreviewUrl ? (
                    <img
                      src={proofPreviewUrl}
                      alt="Proof Preview"
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400">
                      <FileText className="w-6 h-6" />
                    </div>
                  )}
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {proofFile.name}
                    </p>
                    <p className="text-[11px] text-teal-700 dark:text-teal-400 font-mono font-semibold">
                      {(proofFile.size / 1024).toFixed(1)} KB • Verified Local Evidence
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Privacy Note */}
          <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 font-medium">
            <HelpCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <span>
              <strong>PII Redaction:</strong> Never include personal banking credentials, credit card numbers, or government IDs. Redact private information prior to submission.
            </span>
          </div>

          {/* Submit CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/database')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-600/25 active:scale-[0.98] disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>{isSubmitting ? 'Publishing Threat Signature...' : 'Publish Scam Warning'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default ReportPage;
