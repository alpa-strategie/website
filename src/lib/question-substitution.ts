import { VisitorProfile } from '@/types/visitor';
import translations from '@/app/translations';

type PlaceholderKey = 
  | 'role'
  | 'secteur'
  | 'type_entreprise'
  | 'projet_ou_defi'
  | 'domaine_intervention'
  | 'contexte_organisationnel'
  | 'mode_collaboration'
  | 'type_due_diligence'
  | 'profil_societe'
  | 'enjeu_strategique'
  | 'contexte_tech_ou_produit'
  | 'thematique';

export function substitutePlaceholders(
  template: string,
  profile: Partial<VisitorProfile>,
  language: 'fr' | 'en'
): string {
  const t = translations[language];
  const defaults = translations[language].placeholderDefaults;

  const values: Record<PlaceholderKey, string> = {
    role: profile.role || defaults.role,
    
    secteur: profile.industry 
      ? t.onboarding.industries[profile.industry]
      : defaults.secteur,
    
    type_entreprise: profile.companySize 
      ? t.onboarding.companySizes[profile.companySize]
      : defaults.type_entreprise,
    
    projet_ou_defi: profile.interests && profile.interests.length > 0
      ? profile.interests.map(i => t.onboarding.interests[i]).join(', ')
      : defaults.projet_ou_defi,
    
    domaine_intervention: profile.interests && profile.interests.length > 0
      ? t.onboarding.interests[profile.interests[0]]
      : defaults.domaine_intervention,
    
    contexte_organisationnel: profile.companySize
      ? t.onboarding.companySizes[profile.companySize]
      : defaults.contexte_organisationnel,
    
    mode_collaboration: defaults.mode_collaboration,
    
    type_due_diligence: defaults.type_due_diligence,
    
    profil_societe: profile.companySize
      ? t.onboarding.companySizes[profile.companySize]
      : defaults.profil_societe,
    
    enjeu_strategique: profile.interests && profile.interests.length > 0
      ? t.onboarding.interests[profile.interests[0]]
      : defaults.enjeu_strategique,
    
    contexte_tech_ou_produit: profile.interests && profile.interests.length > 0
      ? profile.interests.map(i => t.onboarding.interests[i]).join(' and ')
      : defaults.contexte_tech_ou_produit,
    
    thematique: profile.interests && profile.interests.length > 0
      ? t.onboarding.interests[profile.interests[0]]
      : defaults.thematique,
  };

  let result = template;
  
  Object.entries(values).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  });

  return result;
}

export function getDynamicQuestions(
  roleKey: string,
  profile: Partial<VisitorProfile>,
  language: 'fr' | 'en'
): string[] {
  const t = translations[language];
  const dynamicQuestions = t.onboarding.dynamicQuestions;
  
  const templates = dynamicQuestions[roleKey as keyof typeof dynamicQuestions] 
    || dynamicQuestions.other
    || [];

  return templates.map(template => 
    substitutePlaceholders(template, profile, language)
  );
}
