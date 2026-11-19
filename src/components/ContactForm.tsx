import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { BUSINESS_INFO, SERVICE_OPTIONS, ServiceOption } from '../data/siteData';

interface ContactFormProps {
  selectedService: ServiceOption;
  onServiceChange: (service: ServiceOption) => void;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  service: ServiceOption;
  details: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  selectedService,
  onServiceChange,
}) => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    service: selectedService,
    details: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<FormState | null>(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, service: selectedService }));
  }, [selectedService]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (formData.phone.trim()) {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 7) {
        nextErrors.phone = 'Please enter a valid phone number or leave this field blank.';
      }
    }
    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    // Demo submission handler — replace with live POST /api/inquiries backend endpoint in production
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRecord({ ...formData });
    }, 550);
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      service: selectedService,
      details: '',
    });
    setErrors({});
  };

  const buildDirectEmailHref = (record: FormState) => {
    const subject = encodeURIComponent(`Project Inquiry: ${record.service} — ${record.fullName}`);
    const body = encodeURIComponent(
      `Name: ${record.fullName}\nEmail: ${record.email}\nPhone: ${record.phone || 'Not provided'}\nService: ${record.service}\n\nProject Details:\n${record.details || 'Not provided'}`
    );
    return `${BUSINESS_INFO.emailHref}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-white py-20 sm:py-28 lg:py-36 text-[#202526]"
    >
      <div className="mx-auto w-[92%] max-w-[1440px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="font-sans text-xs font-bold tracking-[0.24em] uppercase text-[#005B63]">
              GET IN TOUCH
            </p>
            <h2
              id="contact-heading"
              className="mt-4 font-display font-extrabold uppercase tracking-[-0.03em] leading-[1.0] text-[#151A1B] text-[clamp(2.15rem,4vw,3.7rem)]"
            >
              LET&apos;S BUILD
              <br />
              <span className="text-[#005B63]">SOMETHING OUTDOORS.</span>
            </h2>

            <div className="mt-7 h-[2px] w-16 bg-[#005B63]" />

            <p className="mt-7 max-w-[44ch] font-sans text-base leading-[1.7] text-[#727D7F]">
              Have a landscape project in mind? Connect with Crew Landscapes to discuss your
              vision.
            </p>

            {/* Verified Contact Block */}
            <dl className="mt-10 divide-y divide-[#202526]/12 border-t border-b border-[#202526]/12">
              <div className="flex items-start gap-4 py-5">
                <Phone className="mt-1 h-4 w-4 text-[#005B63] shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#727D7F]">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="font-display text-lg font-bold text-[#151A1B] hover:text-[#005B63] transition-colors"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4 py-5">
                <Mail className="mt-1 h-4 w-4 text-[#005B63] shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#727D7F]">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={BUSINESS_INFO.emailHref}
                      className="font-display text-lg font-bold text-[#151A1B] hover:text-[#005B63] transition-colors break-all"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4 py-5">
                <MapPin className="mt-1 h-4 w-4 text-[#005B63] shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#727D7F]">
                    Service Area
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold text-[#151A1B]">
                    {BUSINESS_INFO.location}
                  </dd>
                </div>
              </div>
            </dl>
          </motion.div>

          {/* Right Column: Clean Project Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#F7F8F7] border border-[#202526]/10 p-7 sm:p-10 lg:p-12"
          >
            {submittedRecord ? (
              <div role="status" aria-live="polite" className="space-y-6 py-4">
                <div className="flex items-center gap-3 text-[#005B63]">
                  <CheckCircle2 className="h-7 w-7 shrink-0" aria-hidden="true" />
                  <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase">
                    Demo Inquiry Validated
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-[-0.02em] text-[#151A1B]">
                  THANK YOU, {submittedRecord.fullName}.
                </h3>

                <p className="font-sans text-sm sm:text-base leading-[1.7] text-[#202526]/85">
                  This redesign preview validates and previews your inquiry for{' '}
                  <strong className="font-semibold text-[#151A1B]">{submittedRecord.service}</strong>{' '}
                  locally without a connected live mail server. In production, this form connects to
                  your backend endpoint (<code className="text-xs font-mono text-[#005B63]">POST /api/inquiries</code>)
                  to route messages directly to {BUSINESS_INFO.email}.
                </p>

                <div className="border-t border-b border-[#202526]/12 py-4 text-sm text-[#727D7F] space-y-1.5">
                  <p>
                    <span className="font-semibold text-[#202526]">Email:</span> {submittedRecord.email}
                  </p>
                  {submittedRecord.phone && (
                    <p>
                      <span className="font-semibold text-[#202526]">Phone:</span> {submittedRecord.phone}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold text-[#202526]">Service:</span> {submittedRecord.service}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={buildDirectEmailHref(submittedRecord)}
                    className="inline-flex items-center gap-2.5 bg-[#005B63] px-6 py-3.5 font-display text-xs font-bold tracking-[0.14em] uppercase text-white transition-colors hover:bg-[#00464D] whitespace-nowrap"
                  >
                    <span>OPEN IN EMAIL CLIENT</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="border border-[#202526]/25 px-6 py-3.5 font-display text-xs font-bold tracking-[0.14em] uppercase text-[#202526] transition-colors hover:border-[#005B63] hover:text-[#005B63] cursor-pointer whitespace-nowrap"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* 1. Full Name (required) */}
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block font-sans text-xs font-bold tracking-[0.16em] uppercase text-[#202526]"
                    >
                      Full Name <span className="text-[#005B63]">*</span>
                    </label>
                    <input
                      id="inquiry-name"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'inquiry-name-error' : undefined}
                      placeholder="Your name"
                      className={`mt-2 w-full border bg-white px-4 py-3.5 font-sans text-sm text-[#151A1B] placeholder:text-[#727D7F]/70 transition-colors focus:border-[#005B63] focus:outline-none ${
                        errors.fullName ? 'border-red-600' : 'border-[#202526]/18'
                      }`}
                    />
                    {errors.fullName && (
                      <p
                        id="inquiry-name-error"
                        role="alert"
                        className="mt-1.5 font-sans text-xs font-medium text-red-700"
                      >
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* 2. Email Address (required) */}
                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block font-sans text-xs font-bold tracking-[0.16em] uppercase text-[#202526]"
                    >
                      Email Address <span className="text-[#005B63]">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
                      placeholder="you@example.com"
                      className={`mt-2 w-full border bg-white px-4 py-3.5 font-sans text-sm text-[#151A1B] placeholder:text-[#727D7F]/70 transition-colors focus:border-[#005B63] focus:outline-none ${
                        errors.email ? 'border-red-600' : 'border-[#202526]/18'
                      }`}
                    />
                    {errors.email && (
                      <p
                        id="inquiry-email-error"
                        role="alert"
                        className="mt-1.5 font-sans text-xs font-medium text-red-700"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* 3. Phone Number (optional) */}
                  <div>
                    <label
                      htmlFor="inquiry-phone"
                      className="block font-sans text-xs font-bold tracking-[0.16em] uppercase text-[#202526]"
                    >
                      Phone Number <span className="font-normal text-[#727D7F]">(Optional)</span>
                    </label>
                    <input
                      id="inquiry-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, phone: e.target.value }));
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'inquiry-phone-error' : undefined}
                      placeholder="(773) 555-0199"
                      className={`mt-2 w-full border bg-white px-4 py-3.5 font-sans text-sm text-[#151A1B] placeholder:text-[#727D7F]/70 transition-colors focus:border-[#005B63] focus:outline-none ${
                        errors.phone ? 'border-red-600' : 'border-[#202526]/18'
                      }`}
                    />
                    {errors.phone && (
                      <p
                        id="inquiry-phone-error"
                        role="alert"
                        className="mt-1.5 font-sans text-xs font-medium text-red-700"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* 4. Service Interested In */}
                  <div>
                    <label
                      htmlFor="inquiry-service"
                      className="block font-sans text-xs font-bold tracking-[0.16em] uppercase text-[#202526]"
                    >
                      Service Interested In
                    </label>
                    <select
                      id="inquiry-service"
                      name="service"
                      value={formData.service}
                      onChange={(e) => {
                        const value = e.target.value as ServiceOption;
                        setFormData((prev) => ({ ...prev, service: value }));
                        onServiceChange(value);
                      }}
                      className="mt-2 w-full border border-[#202526]/18 bg-white px-4 py-3.5 font-sans text-sm text-[#151A1B] transition-colors focus:border-[#005B63] focus:outline-none cursor-pointer"
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Project Details (optional) */}
                <div>
                  <label
                    htmlFor="inquiry-details"
                    className="block font-sans text-xs font-bold tracking-[0.16em] uppercase text-[#202526]"
                  >
                    Project Details <span className="font-normal text-[#727D7F]">(Optional)</span>
                  </label>
                  <textarea
                    id="inquiry-details"
                    name="details"
                    rows={4}
                    value={formData.details}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, details: e.target.value }))
                    }
                    placeholder="Share a brief note about your outdoor space or goals..."
                    className="mt-2 w-full border border-[#202526]/18 bg-white px-4 py-3.5 font-sans text-sm text-[#151A1B] placeholder:text-[#727D7F]/70 transition-colors focus:border-[#005B63] focus:outline-none resize-y"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center justify-center gap-3 bg-[#005B63] px-8 py-4 font-display text-xs font-extrabold tracking-[0.15em] uppercase text-white transition-colors duration-200 hover:bg-[#00464D] disabled:opacity-60 cursor-pointer whitespace-nowrap"
                  >
                    <span>{isSubmitting ? 'VALIDATING INQUIRY...' : 'SEND PROJECT INQUIRY'}</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </button>

                  <p className="font-sans text-xs text-[#727D7F]">
                    Quick inquiry — no measurements or scheduling required upfront.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
