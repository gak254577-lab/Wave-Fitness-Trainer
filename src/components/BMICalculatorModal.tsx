import React, { useState } from 'react';
import { useTrainer } from '../context/TrainerContext';
import { X, Calculator, ArrowRight, Flame, Activity, Sparkles } from 'lucide-react';

export const BMICalculatorModal: React.FC = () => {
  const { isBMICalculatorOpen, closeBMICalculator, openTrialModal, profile, currentThemeConfig } = useTrainer();

  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [activity, setActivity] = useState<'sedentary' | 'light' | 'moderate' | 'very'>('moderate');

  if (!isBMICalculatorOpen) return null;

  // Conversions and calculations
  const actualWeightKg = unit === 'metric' ? weightKg : weightLbs * 0.453592;
  const actualHeightM = unit === 'metric' ? heightCm / 100 : (heightFt * 12 + heightIn) * 0.0254;

  const bmi = actualHeightM > 0 ? Number((actualWeightKg / (actualHeightM * actualHeightM)).toFixed(1)) : 0;

  // BMR via Mifflin-St Jeor Equation
  let bmr = 10 * actualWeightKg + 6.25 * (actualHeightM * 100) - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
  };

  const maintenanceCalories = Math.round(bmr * activityMultipliers[activity]);
  const fatLossCalories = Math.round(maintenanceCalories * 0.8);
  const muscleGainCalories = Math.round(maintenanceCalories * 1.15);

  const getBMICategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-400', desc: 'Focus on muscle mass & structured surplus nutrition.' };
    if (val < 25) return { label: 'Normal / Healthy Range', color: 'text-emerald-400', desc: 'Ideal baseline! Focus on body recomposition & progressive strength.' };
    if (val < 30) return { label: 'Overweight Range', color: currentThemeConfig.textClass, desc: 'Targeted caloric deficit + resistance training recommended.' };
    return { label: 'Obese Range', color: 'text-red-400', desc: 'Structured coaching for sustainable fat loss & joint protection.' };
  };

  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-stone-900 border border-stone-800 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden my-0 sm:my-8 text-left animate-in fade-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
        
        {/* Mobile Pull Handle */}
        <div className="w-12 h-1 bg-stone-700 rounded-full mx-auto mt-2.5 mb-1 sm:hidden"></div>

        {/* Header */}
        <div className="p-4 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-2 sm:p-2.5 rounded-xl border"
              style={{
                backgroundColor: `${currentThemeConfig.primaryHex}15`,
                borderColor: `${currentThemeConfig.primaryHex}35`,
                color: currentThemeConfig.primaryHex
              }}
            >
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-stone-100 leading-tight">BMI & Daily Calorie Calc</h3>
              <p className="text-[11px] sm:text-xs text-stone-400">Discover baseline metrics & training roadmap</p>
            </div>
          </div>
          <button
            onClick={closeBMICalculator}
            className="p-2 rounded-lg bg-stone-900 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[82vh] overflow-y-auto">

          {/* Unit & Gender Switcher */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1.5">Measurement Units</label>
              <div className="grid grid-cols-2 gap-1 p-1 bg-stone-950 rounded-lg border border-stone-800">
                <button
                  type="button"
                  onClick={() => setUnit('metric')}
                  className={`py-1.5 text-xs rounded transition-all ${
                    unit === 'metric'
                      ? 'font-black text-stone-950'
                      : 'text-stone-400 font-medium'
                  }`}
                  style={{
                    backgroundColor: unit === 'metric' ? currentThemeConfig.primaryHex : 'transparent'
                  }}
                >
                  Metric (kg/cm)
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('imperial')}
                  className={`py-1.5 text-xs rounded transition-all ${
                    unit === 'imperial'
                      ? 'font-black text-stone-950'
                      : 'text-stone-400 font-medium'
                  }`}
                  style={{
                    backgroundColor: unit === 'imperial' ? currentThemeConfig.primaryHex : 'transparent'
                  }}
                >
                  Imperial (lbs/ft)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1.5">Gender</label>
              <div className="grid grid-cols-2 gap-1 p-1 bg-stone-950 rounded-lg border border-stone-800">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-1.5 text-xs rounded transition-all ${
                    gender === 'male'
                      ? 'font-black text-stone-950'
                      : 'text-stone-400 font-medium'
                  }`}
                  style={{
                    backgroundColor: gender === 'male' ? currentThemeConfig.primaryHex : 'transparent'
                  }}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-1.5 text-xs rounded transition-all ${
                    gender === 'female'
                      ? 'font-black text-stone-950'
                      : 'text-stone-400 font-medium'
                  }`}
                  style={{
                    backgroundColor: gender === 'female' ? currentThemeConfig.primaryHex : 'transparent'
                  }}
                >
                  Female
                </button>
              </div>
            </div>
          </div>

          {/* Age & Body Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1.5">Age (Years)</label>
              <input
                type="number"
                min="14"
                max="90"
                value={age}
                onChange={(e) => setAge(Math.max(14, Number(e.target.value)))}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
              />
            </div>

            {unit === 'metric' ? (
              <>
                <div>
                  <label className="text-xs font-semibold text-stone-400 block mb-1.5">Weight (kg)</label>
                  <input
                    type="number"
                    min="30"
                    max="250"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-400 block mb-1.5">Height (cm)</label>
                  <input
                    type="number"
                    min="100"
                    max="240"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-xs font-semibold text-stone-400 block mb-1.5">Weight (lbs)</label>
                  <input
                    type="number"
                    min="60"
                    max="500"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-400 block mb-1.5">Height (ft & in)</label>
                  <div className="grid grid-cols-2 gap-1">
                    <input
                      type="number"
                      min="3"
                      max="7"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-2 py-2 text-stone-100 text-sm text-center"
                      placeholder="ft"
                    />
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-2 py-2 text-stone-100 text-sm text-center"
                      placeholder="in"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Activity Level */}
          <div>
            <label className="text-xs font-semibold text-stone-400 block mb-1.5">Daily Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as any)}
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
            >
              <option value="sedentary">Sedentary (Desk job, minimal exercise)</option>
              <option value="light">Light Activity (1-2 light workouts/walks per week)</option>
              <option value="moderate">Moderate Activity (3-4 workouts per week)</option>
              <option value="very">Very Active (5+ intense workouts or active job)</option>
            </select>
          </div>

          {/* Results Card */}
          <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-xs text-stone-400 block">Your Calculated BMI</span>
                <span className="text-3xl font-black" style={{ color: currentThemeConfig.primaryHex }}>
                  {bmi}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400 block">Category</span>
                <span className={`text-sm font-bold ${bmiCategory.color}`}>{bmiCategory.label}</span>
              </div>
            </div>

            <p className="text-xs text-stone-300 italic">{bmiCategory.desc}</p>

            {/* Calories Breakdown */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-[11px] text-stone-400 block">Fat Loss</span>
                <span className={`text-sm font-bold ${currentThemeConfig.textClass}`}>{fatLossCalories}</span>
                <span className="text-[10px] text-stone-500 block">kcal / day</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-[11px] text-stone-400 block">Maintenance</span>
                <span className="text-sm font-bold text-stone-200">{maintenanceCalories}</span>
                <span className="text-[10px] text-stone-500 block">kcal / day</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                <span className="text-[11px] text-stone-400 block">Muscle Gain</span>
                <span className="text-sm font-bold text-emerald-400">{muscleGainCalories}</span>
                <span className="text-[10px] text-stone-500 block">kcal / day</span>
              </div>
            </div>
          </div>

          {/* Consultation CTA */}
          <div className="pt-2">
            <button
              onClick={() => {
                closeBMICalculator();
                openTrialModal();
              }}
              className={`w-full py-3.5 font-black rounded-xl flex items-center justify-center gap-2 shadow-xl text-sm transition-all ${currentThemeConfig.buttonClass}`}
            >
              <span>Get Full Custom Plan with {profile.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
