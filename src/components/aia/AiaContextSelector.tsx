'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import translations from '@/app/translations';
import { VisitorProfile, VisitorRole, VisitorIndustry, VisitorInterest, CompanySize, ROLE_KEY_MAP } from '@/types/visitor';

interface AiaContextSelectorProps {
  onComplete: (profile: VisitorProfile) => void;
}

export default function AiaContextSelector({ onComplete }: AiaContextSelectorProps) {
  const { language } = useLanguage();
  const t = translations[language].onboarding;

  const [formData, setFormData] = useState<{
    role: VisitorRole | '';
    industry: VisitorIndustry | '';
    interests: VisitorInterest[];
    companySize?: CompanySize;
  }>({
    role: '',
    industry: '',
    interests: [],
    companySize: undefined,
  });

  const [errors, setErrors] = useState<{
    role?: string;
    industry?: string;
    interests?: string;
  }>({});

  const handleRoleChange = (role: VisitorRole) => {
    setFormData({ ...formData, role });
    if (errors.role) {
      setErrors({ ...errors, role: undefined });
    }
  };

  const handleIndustryChange = (industry: VisitorIndustry) => {
    setFormData({ ...formData, industry });
    if (errors.industry) {
      setErrors({ ...errors, industry: undefined });
    }
  };

  const handleInterestToggle = (interest: VisitorInterest) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: newInterests });
    if (errors.interests) {
      setErrors({ ...errors, interests: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.role) {
      newErrors.role = t.requiredField;
    }
    if (!formData.industry) {
      newErrors.industry = t.requiredField;
    }
    if (formData.interests.length === 0) {
      newErrors.interests = t.selectAtLeastOne;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const visitorRole = formData.role as VisitorRole;
      const roleKey = ROLE_KEY_MAP[visitorRole];
      const roleLabel = t.roles[visitorRole];
      
      const profile: VisitorProfile = {
        roleKey,
        role: roleLabel,
        visitorRole,
        industry: formData.industry as VisitorIndustry,
        interests: formData.interests,
        companySize: formData.companySize,
        timestamp: Date.now(),
      };
      onComplete(profile);
    }
  };

  const roles: VisitorRole[] = ['recruiter-headhunter', 'potential-client', 'consulting-partner', 'investor-advisor', 'curious', 'other'];
  const industries: VisitorIndustry[] = ['technology-saas', 'finance-banking', 'insurance', 'manufacturing', 'healthcare-medical', 'events-conference', 'education-edtech', 'environmental-agritech', 'aviation-aerospace', 'ngo-social', 'hospitality-etourism', 'ecommerce-retail', 'government-public', 'other'];
  const interests: VisitorInterest[] = ['it-strategy', 'cto-cpto-advisory', 'pmo', 'digital-factory', 'saas-development', 'software-architecture', 'offshoring-outsourcing', 'business-intelligence', 'ux-ui-product', 'interim-roles', 'digital-transformation', 'other'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {t.roleLabel} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleRoleChange(role)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 text-left text-sm ${
                formData.role === role
                  ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t.roles[role]}
            </button>
          ))}
        </div>
        {errors.role && <p className="text-red-500 text-sm mt-2">{errors.role}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {t.industryLabel} <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.industry}
          onChange={(e) => handleIndustryChange(e.target.value as VisitorIndustry)}
          className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
            formData.industry
              ? 'border-blue-500 bg-blue-50 text-blue-900'
              : 'border-gray-200 text-gray-700'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="">{t.industryPlaceholder}</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {t.industries[industry]}
            </option>
          ))}
        </select>
        {errors.industry && <p className="text-red-500 text-sm mt-2">{errors.industry}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {t.interestsLabel} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {interests.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => handleInterestToggle(interest)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                formData.interests.includes(interest)
                  ? 'border-purple-500 bg-purple-50 text-purple-900 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{t.interests[interest]}</span>
                {formData.interests.includes(interest) && (
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
        {errors.interests && <p className="text-red-500 text-sm mt-2">{errors.interests}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        {t.submitButton}
      </button>
    </form>
  );
}
