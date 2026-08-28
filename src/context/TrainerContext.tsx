import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TrainerProfile,
  Certification,
  PhilosophyPillar,
  ServiceOffering,
  PricingPlan,
  Testimonial,
  GalleryItem,
  FAQItem,
  TrialPass,
  ThemeId,
  ThemeConfig,
  TransformationComparison,
  WorkoutSplit,
} from '../types';
import {
  DEFAULT_TRAINER_PROFILE,
  DEFAULT_CERTIFICATIONS,
  DEFAULT_PHILOSOPHY_PILLARS,
  DEFAULT_SERVICES,
  DEFAULT_PRICING_PLANS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_GALLERY,
  DEFAULT_FAQS,
  DEFAULT_THEMES,
  DEFAULT_TRANSFORMATIONS,
  DEFAULT_WORKOUT_SPLITS,
} from '../data/defaultTrainer';

export type CurrencyType = 'INR' | 'USD' | 'EUR' | 'GBP';

interface TrainerContextType {
  profile: TrainerProfile;
  certifications: Certification[];
  pillars: PhilosophyPillar[];
  services: ServiceOffering[];
  pricingPlans: PricingPlan[];
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Testimonial) => void;
  gallery: GalleryItem[];
  faqs: FAQItem[];
  transformations: TransformationComparison[];
  workoutSplits: Record<string, WorkoutSplit[]>;
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  currentThemeConfig: ThemeConfig;
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  formatPrice: (priceINR: number, priceUSD: number) => string;
  isTrialModalOpen: boolean;
  selectedPlanForTrial: string | null;
  openTrialModal: (planId?: string) => void;
  closeTrialModal: () => void;
  isConfigModalOpen: boolean;
  openConfigModal: () => void;
  closeConfigModal: () => void;
  isBMICalculatorOpen: boolean;
  openBMICalculator: () => void;
  closeBMICalculator: () => void;
  activePass: TrialPass | null;
  setActivePass: (pass: TrialPass | null) => void;
  savedPasses: TrialPass[];
  saveTrialPass: (pass: TrialPass) => void;
  updateProfile: (updated: Partial<TrainerProfile>) => void;
  resetAllDefaults: () => void;
}

const TrainerContext = createContext<TrainerContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'apex_gym_trainer_profile_v5';
const LOCAL_STORAGE_PASSES_KEY = 'apex_gym_trainer_passes_v5';
const LOCAL_STORAGE_CURRENCY_KEY = 'apex_gym_currency_v5';
const LOCAL_STORAGE_THEME_KEY = 'apex_gym_theme_yellow_v5';
const LOCAL_STORAGE_TESTIMONIALS_KEY = 'apex_gym_testimonials_v5';

export const TrainerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<TrainerProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_TRAINER_PROFILE, ...JSON.parse(saved) };
      }
    } catch {
      // fallback to default
    }
    return DEFAULT_TRAINER_PROFILE;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_TESTIMONIALS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to default
    }
    return DEFAULT_TESTIMONIALS;
  });

  const [theme, setThemeState] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as ThemeId;
      if (saved && DEFAULT_THEMES[saved]) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'yellow'; // Electric Cyber Yellow & Pure Black athletic theme
  });

  const [currency, setCurrencyState] = useState<CurrencyType>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CURRENCY_KEY) as CurrencyType;
      if (saved && ['INR', 'USD', 'EUR', 'GBP'].includes(saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'INR';
  });

  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedPlanForTrial, setSelectedPlanForTrial] = useState<string | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isBMICalculatorOpen, setIsBMICalculatorOpen] = useState(false);
  const [activePass, setActivePass] = useState<TrialPass | null>(null);

  const [savedPasses, setSavedPasses] = useState<TrialPass[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PASSES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to persist trainer profile', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    } catch (e) {
      console.error('Failed to persist theme', e);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CURRENCY_KEY, currency);
    } catch (e) {
      console.error('Failed to persist currency', e);
    }
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PASSES_KEY, JSON.stringify(savedPasses));
    } catch (e) {
      console.error('Failed to persist passes', e);
    }
  }, [savedPasses]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_TESTIMONIALS_KEY, JSON.stringify(testimonials));
    } catch (e) {
      console.error('Failed to persist testimonials', e);
    }
  }, [testimonials]);

  const addTestimonial = (testimonial: Testimonial) => {
    setTestimonials((prev) => [testimonial, ...prev]);
    // Also bump review count on profile
    setProfile((prev) => ({
      ...prev,
      reviewCount: (prev.reviewCount || 0) + 1,
    }));
  };

  const setTheme = (t: ThemeId) => {
    setThemeState(t);
  };

  const setCurrency = (c: CurrencyType) => {
    setCurrencyState(c);
  };

  const currentThemeConfig = DEFAULT_THEMES[theme] || DEFAULT_THEMES.volt;

  const formatPrice = (priceINR: number, priceUSD: number): string => {
    switch (currency) {
      case 'INR':
        return `₹${priceINR.toLocaleString('en-IN')}`;
      case 'USD':
        return `$${priceUSD.toLocaleString('en-US')}`;
      case 'EUR':
        return `€${Math.round(priceUSD * 0.92).toLocaleString('en-EU')}`;
      case 'GBP':
        return `£${Math.round(priceUSD * 0.79).toLocaleString('en-GB')}`;
      default:
        return `₹${priceINR.toLocaleString('en-IN')}`;
    }
  };

  const openTrialModal = (planId?: string) => {
    setSelectedPlanForTrial(planId || null);
    setIsTrialModalOpen(true);
  };

  const closeTrialModal = () => {
    setIsTrialModalOpen(false);
    setSelectedPlanForTrial(null);
  };

  const openConfigModal = () => setIsConfigModalOpen(true);
  const closeConfigModal = () => setIsConfigModalOpen(false);

  const openBMICalculator = () => setIsBMICalculatorOpen(true);
  const closeBMICalculator = () => setIsBMICalculatorOpen(false);

  const saveTrialPass = (pass: TrialPass) => {
    setSavedPasses((prev) => [pass, ...prev]);
    setActivePass(pass);
  };

  const updateProfile = (updated: Partial<TrainerProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const resetAllDefaults = () => {
    setProfile(DEFAULT_TRAINER_PROFILE);
    setTestimonials(DEFAULT_TESTIMONIALS);
    setThemeState('yellow');
    setCurrencyState('INR');
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_CURRENCY_KEY);
    localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
    localStorage.removeItem(LOCAL_STORAGE_TESTIMONIALS_KEY);
  };

  return (
    <TrainerContext.Provider
      value={{
        profile,
        certifications: DEFAULT_CERTIFICATIONS,
        pillars: DEFAULT_PHILOSOPHY_PILLARS,
        services: DEFAULT_SERVICES,
        pricingPlans: DEFAULT_PRICING_PLANS,
        testimonials,
        addTestimonial,
        gallery: DEFAULT_GALLERY,
        faqs: DEFAULT_FAQS,
        transformations: DEFAULT_TRANSFORMATIONS,
        workoutSplits: DEFAULT_WORKOUT_SPLITS,
        theme,
        setTheme,
        currentThemeConfig,
        currency,
        setCurrency,
        formatPrice,
        isTrialModalOpen,
        selectedPlanForTrial,
        openTrialModal,
        closeTrialModal,
        isConfigModalOpen,
        openConfigModal,
        closeConfigModal,
        isBMICalculatorOpen,
        openBMICalculator,
        closeBMICalculator,
        activePass,
        setActivePass,
        savedPasses,
        saveTrialPass,
        updateProfile,
        resetAllDefaults,
      }}
    >
      {children}
    </TrainerContext.Provider>
  );
};

export const useTrainer = () => {
  const context = useContext(TrainerContext);
  if (!context) {
    throw new Error('useTrainer must be used within a TrainerProvider');
  }
  return context;
};
