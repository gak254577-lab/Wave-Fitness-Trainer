import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTrainer } from '../context/TrainerContext';
import {
  X,
  Star,
  CheckCircle2,
  Sparkles,
  User,
  Briefcase,
  Dumbbell,
  Trophy,
  MessageSquareQuote,
  Flame,
  Check
} from 'lucide-react';
import { Testimonial } from '../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROGRAM_OPTIONS = [
  'Fat Loss & Body Recomposition',
  'Strength & Hypertrophy',
  '3-Month Total Body Rebuild',
  '1-on-1 Personal Training',
  'Postural & Mobility Restoration',
  'Competition Prep & Peak Conditioning',
];

const RATING_LABELS: Record<number, string> = {
  1: 'Needs Improvement',
  2: 'Fair Experience',
  3: 'Good Coaching',
  4: 'Great Results & Experience',
  5: 'Exceptional & Life-Changing!',
};

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ isOpen, onClose }) => {
  const { addTestimonial, currentThemeConfig, profile } = useTrainer();

  const [clientName, setClientName] = useState('');
  const [profession, setProfession] = useState('');
  const [program, setProgram] = useState(PROGRAM_OPTIONS[0]);
  const [customProgram, setCustomProgram] = useState('');
  const [duration, setDuration] = useState('12 Weeks');
  const [achievement, setAchievement] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!clientName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!quote.trim() || quote.trim().length < 15) {
      setErrorMsg('Please provide at least a short sentence describing your coaching experience (minimum 15 characters).');
      return;
    }

    const finalProgram = program === 'Other' ? customProgram || 'Personal Coaching' : program;
    const finalAchievement = achievement.trim() || 'Achieved Target Physique & Peak Strength';

    const newTestimonial: Testimonial = {
      id: `member-review-${Date.now()}`,
      clientName: clientName.trim(),
      profession: profession.trim() || 'Gym Member',
      duration: duration.trim() || '12 Weeks',
      achievement: finalAchievement,
      quote: quote.trim(),
      avatar: '',
      rating,
      verified: true,
      program: finalProgram,
    };

    addTestimonial(newTestimonial);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      // Reset form fields
      setClientName('');
      setProfession('');
      setAchievement('');
      setQuote('');
      setRating(5);
      onClose();
    }, 1800);
  };

  const activeRating = hoverRating !== null ? hoverRating : rating;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${currentThemeConfig.primaryHex}15`,
                  borderColor: `${currentThemeConfig.primaryHex}40`,
                  color: currentThemeConfig.primaryHex,
                }}
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-100">Write a Member Review</h3>
                <p className="text-xs text-stone-400">
                  Share your transformation journey with {profile.name}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {isSubmitted ? (
            <div className="p-10 text-center space-y-4">
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center border text-emerald-400 bg-emerald-950/40 border-emerald-800/80"
              >
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-stone-100">Thank You for Your Review!</h4>
              <p className="text-stone-300 text-sm max-w-md mx-auto">
                Your transformation story has been verified and added to the testimonials wall.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5 max-h-[80vh] overflow-y-auto">
              {errorMsg && (
                <div className="p-3 bg-red-950/50 border border-red-800 rounded-xl text-red-300 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Star Rating selector */}
              <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 text-center space-y-2">
                <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                  Your Overall Rating
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setRating(star)}
                      className="p-1.5 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className="w-7 h-7 transition-colors"
                        style={{
                          color:
                            star <= activeRating
                              ? currentThemeConfig.primaryHex
                              : '#44403c',
                          fill:
                            star <= activeRating
                              ? currentThemeConfig.primaryHex
                              : 'transparent',
                        }}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs font-semibold" style={{ color: currentThemeConfig.primaryHex }}>
                  {RATING_LABELS[activeRating]}
                </p>
              </div>

              {/* Two columns: Name & Profession */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5 mb-1.5">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    Your Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-stone-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5 mb-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-stone-400" />
                    Profession / Lifestyle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer / Father of 2"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-stone-600 transition-colors"
                  />
                </div>
              </div>

              {/* Two columns: Program & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5 mb-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-stone-400" />
                    Program Trained Under
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-stone-600 transition-colors"
                  >
                    {PROGRAM_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                    <option value="Other">Other / Custom</option>
                  </select>
                  {program === 'Other' && (
                    <input
                      type="text"
                      placeholder="Specify program name"
                      value={customProgram}
                      onChange={(e) => setCustomProgram(e.target.value)}
                      className="w-full mt-2 px-3.5 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-xs focus:outline-none focus:border-stone-600"
                    />
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5 mb-1.5">
                    <Flame className="w-3.5 h-3.5 text-stone-400" />
                    Coaching Duration / Timeline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 12 Weeks, 6 Months"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-stone-600 transition-colors"
                  />
                </div>
              </div>

              {/* Key Achievement */}
              <div>
                <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5 mb-1.5">
                  <Trophy className="w-3.5 h-3.5 text-stone-400" />
                  Key Transformation / Milestone Highlight
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lost 11 kg Fat & Fixed Chronic Back Pain"
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-stone-600 transition-colors"
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5 mb-1.5">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-stone-400" />
                  Your Review / Story <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details about what changed for you, how the coaching helped your mindset and physique, or what you liked most..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-stone-600 transition-colors resize-none"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Tip: Mentioning specific results helps motivate others on their fitness journey.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-stone-800 text-stone-300 text-xs font-bold hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 ${currentThemeConfig.buttonClass}`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit My Review</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
