/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Building2,
  HardHat,
  CheckCircle2,
  Users,
  Briefcase,
  Award,
  Star,
  Phone,
  MessageCircle,
  Facebook,
  MapPin,
  Mail,
  Menu,
  X,
  Quote
} from 'lucide-react';

// --- Types ---
interface NavLink {
  name: string;
  href: string;
}

interface Service {
  title: string;
  desc: string;
  icon: React.ElementType;
}

interface Feature {
  title: string;
  desc: string;
}

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

// --- Constants & Data ---
const NAV_LINKS: NavLink[] = [
  { name: 'الرئيسية', href: '#home' },
  { name: 'من نحن', href: '#about' },
  { name: 'خدماتنا', href: '#services' },
  { name: 'آراء العملاء', href: '#testimonials' },
  { name: 'اتصل بنا', href: '#contact' },
];

const SERVICES: Service[] = [
  {
    title: 'التطوير العقاري',
    desc: 'نطور مجتمعات سكنية وتجارية متكاملة في أكثر المواقع تميزاً بمدينة بدر، مع التركيز على التصميم المعماري الفريد.',
    icon: Building2,
  },
  {
    title: 'المقاولات العامة',
    desc: 'تنفيذ كافة أعمال الإنشاءات والمقاولات بأعلى معايير الجودة وبإشراف هندسي متكامل من التأسيس حتى التسليم.',
    icon: HardHat,
  },
  {
    title: 'الاستشارات الهندسية',
    desc: 'نقدم حلولاً هندسية مبتكرة ودراسات جدوى للمشاريع لضمان تحقيق أقصى استفادة من الاستثمارات العقارية.',
    icon: Briefcase,
  },
];

const FEATURES: Feature[] = [
  {
    title: 'مواقع استراتيجية',
    desc: 'نختار مواقعنا بعناية في قلب مدينة بدر والقاهرة.',
  },
  {
    title: 'جودة لا تضاهى',
    desc: 'نستخدم أفضل الخامات الإنشائية ونطبق معايير صارمة.',
  },
  {
    title: 'مصداقية الموعد',
    desc: 'نحن نلتزم بجداولنا الزمنية ونؤمن بأن كسب ثقة العميل هو الغاية.',
  },
  {
    title: 'إشراف هندسي',
    desc: 'فريق هندسي متخصص يتابع كل تفاصيل التنفيذ بدقة.',
  }
];

const STATS: Stat[] = [
  { label: 'عميل سعيد', value: 200, icon: Users },
  { label: 'سنة خبرة', value: 5, icon: Award },
  { label: 'مشروع منجز', value: 50, icon: CheckCircle2 },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'أحمد محمود',
    role: 'مالك وحدة سكنية',
    text: 'تعامل راقي جداً واحترافية في التنفيذ. استلمت وحدتي في مدينة بدر قبل الموعد المحدد وبجودة فاقت توقعاتي كثيراً.',
    rating: 5,
  },
  {
    name: 'سارة إبراهيم',
    role: 'مستثمرة عقارية',
    text: 'شركة عزام هي شريكي الأول في الاستثمار. الصدق والأمانة هما عنوان التعامل معهم.',
    rating: 5,
  },
  {
    name: 'محمد حسن',
    role: 'مهندس استشاري',
    text: 'كمتخصص، أقدر جداً معايير الجودة التي تتبعها شركة عزام في مواقع المقاولات.',
    rating: 5,
  },
];

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// --- Components ---

const StatCounter: React.FC<{ stat: Stat }> = ({ stat }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <div ref={ref} className="bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-sm">
      <div className="text-3xl md:text-4xl font-bold text-[#e1c37a] mb-1">
        +{count}
      </div>
      <div className="text-[10px] md:text-xs text-[#c3cacf] uppercase tracking-widest leading-tight">
        {stat.label}
      </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#454542] selection:bg-[#c8a55f] selection:text-[#152e4d]" dir="rtl">
      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800&display=swap');
        
        :root {
          --gold: #c8a55f;
          --navy: #152e4d;
          --light-gold: #e1c37a;
          --slate: #c3cacf;
        }

        body {
          font-family: 'Cairo', sans-serif;
          scroll-behavior: smooth;
        }

        .bg-mesh {
          background-color: var(--navy);
          background-image: 
            radial-gradient(at 0% 0%, rgba(200, 165, 95, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(225, 195, 122, 0.1) 0px, transparent 50%);
        }

        .geometric-shape {
          position: absolute;
          border: 1px solid rgba(200, 165, 95, 0.2);
          z-index: 0;
          pointer-events: none;
        }

        .section-curve {
          clip-path: ellipse(110% 100% at 50% 0%);
        }
      `}</style>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#152e4d]/90 backdrop-blur-md py-3 border-white/10 shadow-xl' : 'bg-transparent py-6 border-transparent'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="logo" width={50} height={50} />
            <span className="text-xl font-bold tracking-tight text-[#e1c37a]">عزام للإستثمار العقارى</span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-[#c8a55f] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:block px-6 py-2.5 bg-[#c8a55f] text-[#152e4d] font-bold rounded-full text-sm hover:bg-[#e1c37a] transition-all shadow-lg shadow-[#c8a55f]/20"
            >
              تواصل معنا الآن
            </a>
            <button className="lg:hidden text-[#e1c37a]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-[#152e4d] lg:hidden flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-6 right-6 text-[#e1c37a]" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-bold text-white hover:text-[#c8a55f] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="bg-[#c8a55f] text-[#152e4d] px-8 py-3 rounded-full font-bold text-xl"
            >
              تواصل معنا
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen bg-mesh flex items-center pt-24 pb-20 overflow-hidden">
        <div className="geometric-shape w-64 h-64 rotate-45 -top-32 -right-32"></div>
        <div className="geometric-shape w-96 h-96 -bottom-48 -left-48 rounded-full"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:w-3/5 text-right font-cairo"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-block px-4 py-1.5 rounded-full border border-[#c8a55f]/40 text-[#c8a55f] text-xs font-bold mb-6 tracking-widest bg-[#c8a55f]/5"
              >
                تطوير عقاري • مقاولات • مدينة بدر
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-extrabold text-white leading-[1.1] mb-8"
              >
                نصنع مـسـتـقـبـلك <br />
                <span className="text-[#c8a55f]">بإتقان وهندسة</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-[#c3cacf]/90 leading-relaxed max-w-xl mb-10"
              >
                شركة عزام توفر حلولاً متكاملة في التطوير العقاري والمقاولات، مع التزام تام بالجودة والمصداقية في أكثر المواقع تميزاً داخل مدينة بدر.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center gap-4 mb-12"
              >
                <a href="#services" className="px-10 py-4 bg-[#c8a55f] text-[#152e4d] font-bold rounded-xl shadow-lg shadow-[#c8a55f]/20 hover:scale-105 transition-all">
                  استكشف مشاريعنا
                </a>
                <a href="#about" className="px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                  لماذا نحن؟
                </a>
              </motion.div>

              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {STATS.map((stat, idx) => (
                  <StatCounter key={idx} stat={stat} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="lg:w-2/5 flex flex-col gap-6"
            >
              <div className="bg-white/3 border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden backdrop-blur-sm shadow-2xl">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Building2 className="w-24 h-24 text-[#c8a55f]" />
                </div>
                <h3 className="text-[#e1c37a] text-xl font-bold mb-8">خدماتنا المتميزة</h3>

                <div className="space-y-4">
                  {SERVICES.map((s, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02, x: -5 }}
                      className={`flex items-start gap-4 p-4 rounded-xl transition-all ${i === 1 ? 'bg-[#c8a55f]/10 border border-[#c8a55f]/30' : 'hover:bg-white/5 border border-transparent'}`}
                    >
                      <div className={`w-12 h-12 shrink-0 rounded-lg flex items-center justify-center ${i === 1 ? 'bg-[#c8a55f] text-[#152e4d]' : 'bg-[#c8a55f]/20 text-[#c8a55f]'}`}>
                        <s.icon size={24} />
                      </div>
                      <div>
                        <h4 className={`font-bold mb-1 ${i === 1 ? 'text-[#e1c37a]' : 'text-white'}`}>{s.title}</h4>
                        <p className={`text-[10px] leading-tight ${i === 1 ? 'text-[#c3cacf]' : 'text-white/40'}`}>{s.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#e1c37a] p-6 rounded-3xl flex items-center gap-4 text-[#152e4d] shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-[#152e4d]/10 flex items-center justify-center font-bold text-xl shrink-0">أ</div>
                <div>
                  <p className="text-sm italic font-medium">"تعاملت معهم في مدينة بدر، المصداقية والالتزام بالوقت كان مبهراً."</p>
                  <p className="text-[10px] font-bold mt-1 opacity-60">أحمد محمود - مستثمر</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#c8a55f] font-bold text-lg mb-4 block uppercase tracking-widest">من نحن؟</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#152e4d] mb-8 leading-[1.1]">
                نحن شركاؤك في بناء <br /> <span className="text-[#c8a55f]">قصة نجاحك العقارية</span>
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 italic">
                شركة عزام للاستثمار العقاري والمقاولات توفر حلولاً هندسية متكاملة بمدينة بدر، نعتمد على المصداقية والالتزام بالجودة كعناصر أساسية في كل مشروع نقوم بتنفيذه.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {FEATURES.map((f, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-[#c8a55f]/10 text-[#c8a55f] rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div className="text-[#152e4d] font-bold">{f.title}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#152e4d] relative section-curve overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">خدماتنا العقارية المتكاملة</h2>
            <div className="w-24 h-1.5 bg-[#c8a55f] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] group hover:bg-[#c8a55f] transition-all duration-500"
              >
                <div className="w-16 h-16 bg-[#c8a55f] text-[#152e4d] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#152e4d] group-hover:text-[#c8a55f] transition-colors">
                  <s.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-[#152e4d] mb-4">{s.title}</h3>
                <p className="text-[#c3cacf] group-hover:text-[#152e4d]/80 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#152e4d] mb-6 tracking-tight">قالوا عنا</h2>
            <p className="text-gray-500 font-medium italic">ثقة عملائنا هي سر نجاحنا المستمر في مدينة بدر.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 relative"
              >
                <Quote className="text-[#c8a55f] opacity-10 absolute top-8 left-8" size={48} />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-[#c8a55f] text-[#c8a55f]" />)}
                </div>
                <p className="text-gray-600 italic mb-8 leading-relaxed font-medium">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#152e4d] rounded-full flex items-center justify-center text-[#e1c37a] font-bold text-xl">{t.name[0]}</div>
                  <div>
                    <h4 className="font-bold text-[#152e4d]">{t.name}</h4>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#152e4d] rounded-[3.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl relative">
            <div className="lg:w-2/5 bg-[#c8a55f] p-12 lg:p-16 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-extrabold text-[#152e4d] mb-6 tracking-tight">تواصل معنا</h2>
                <p className="text-[#152e4d]/70 text-lg font-medium mb-10 leading-relaxed italic">نحن متواجدون في مدينة بدر لتقديم أفضل العروض العقارية الهندسية.</p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-[#152e4d] font-bold text-xl" >
                    <Phone size={24} />
                    <span dir='ltr'>010 01395046</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#152e4d] font-bold text-xl">
                    <MapPin size={24} />
                    <span>مدينة بدر، القاهرة</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#152e4d] font-bold text-xl">
                    <Mail size={24} />
                    <span>info@azzam.com</span>
                  </div>
                </div>
              </div>
              <div className="pt-12 border-t border-[#152e4d]/10 flex gap-4 mt-12">
                <a href="https://www.facebook.com/people/%D8%B9%D8%B2%D8%A7%D9%85-%D9%84%D9%84%D8%A5%D8%B3%D8%AA%D8%AB%D9%85%D8%A7%D8%B1-%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D9%89-%D9%88%D8%A7%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA/100064137571129/?rdid=Rg0BCLyxZqiowiiG&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1E8ikEQhgY%2F" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#152e4d] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"><Facebook /></a>
              </div>
            </div>

            <div className="lg:w-3/5 p-12 lg:p-20">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#c8a55f] transition-all placeholder:text-white/20" placeholder="الاسم الكامل" />
                  <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#c8a55f] transition-all placeholder:text-white/20" placeholder="رقم الهاتف" />
                </div>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#c8a55f] transition-all min-h-[150px] placeholder:text-white/20" placeholder="كيف يمكننا مساعدتك؟" />
                <button className="w-full py-5 bg-[#c8a55f] text-[#152e4d] font-black text-xl rounded-2xl shadow-xl hover:bg-[#e1c37a] transition-all transform active:scale-95 shadow-[#c8a55f]/20">إرسال الطلب</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#152e4d] border-t border-white/10 px-12 py-10 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#c3cacf] uppercase tracking-[0.25em]">
        <div className="text-center md:text-right">© {new Date().getFullYear()} عزام للإستثمار العقارى والمقاولات. جميع الحقوق محفوظة</div>
        <div className="flex items-center gap-10 mt-6 md:mt-0 font-bold">
          <a href="https://www.facebook.com/people/%D8%B9%D8%B2%D8%A7%D9%85-%D9%84%D9%84%D8%A5%D8%B3%D8%AA%D8%AB%D9%85%D8%A7%D8%B1-%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D9%89-%D9%88%D8%A7%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA/100064137571129/?rdid=Rg0BCLyxZqiowiiG&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1E8ikEQhgY%2F" target="_blank" rel="noopener noreferrer" className="hover:text-[#c8a55f] transition-colors">فيسبوك</a>
          <a href="https://wa.me/201001395046" target="_blank" rel="noopener noreferrer" className="hover:text-[#c8a55f] transition-colors">واتساب</a>
          <a href="#" className="hover:text-[#c8a55f] transition-colors">عن الشركة</a>
        </div>
      </footer>
    </div>
  );
}
