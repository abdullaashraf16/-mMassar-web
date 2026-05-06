import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, MonitorPlay, Phone, Download, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import { siteData } from './data';
import './App.css';

function App() {
  const data = siteData.salonify;
  
  // داتا سلايدر الصور
  const screenshots = ["/s1.png", "/s2.png", "/s3.png", "/s4.png", "/s5.png"];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // داتا الأسئلة والناف بار
  const [activeTab, setActiveTab] = useState('hero');
  const [openFaq, setOpenFaq] = useState(null);
  // دالة تحويل العميل للواتساب برسالة جاهزة حسب الباقة
  const handleBuy = (planTitle) => {
    const message = encodeURIComponent(`السلام عليكم، أرغب في شراء ${planTitle} من salonify.`);
    // بنشوف لو لينك الواتساب فيه علامة ؟ بنحط &، لو مفيهوش بنحط ؟
    const separator = data.contact.whatsapp.includes('?') ? '&' : '?';
    window.open(`${data.contact.whatsapp}${separator}text=${message}`, '_blank');
  };

  // السكربت ده بيعرف إنت بتعمل سكرول فين عشان ينور الزرار الصح فوق
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'features', 'faq', 'contact'];
      let current = 'hero';
      for (let section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveTab(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // دوال تقليب الصور
  const nextSlide = () => setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));

  // إعدادات الأنيميشن
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="dark-theme" dir="rtl">
      <div className="glow-bg"></div>

      {/* --- شريط التنقل الفضائي (Sci-Fi Navbar) --- */}
      <div className="nav-wrapper">
        <nav className="floating-nav sci-fi-nav">
          <a href="#hero" className={`nav-item ${activeTab === 'hero' ? 'active' : ''}`}>الرئيسية</a>
          <a href="#about" className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}>عن Massar </a>
          <a href="#features" className={`nav-item ${activeTab === 'features' ? 'active' : ''}`}>المميزات</a>
          <a href="#faq" className={`nav-item ${activeTab === 'faq' ? 'active' : ''}`}>الأسئلة</a>
          <a href="#contact" className={`nav-item ${activeTab === 'contact' ? 'active' : ''}`}>التواصل</a>
        </nav>
      </div>

      <div className="container">
        
        {/* الهيدر واللوجو */}
        <header className="header" id="hero">
          <motion.img 
            src="/logo.png" 
            alt="مسار" 
            className="logo" 
            initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </header>

        {/* 1. قسم الواجهة الرئيسي */}
        <motion.section initial="hidden" animate="visible" variants={fadeUp} className="hero">
          <h1 className="title">
            <span className="brand-highlight">{data.productName}</span> <br/>
            {data.hook}
          </h1>
          <p className="subtitle">{data.description}</p>
          <a href={data.downloadLink} className="btn-primary glow-btn">
            <Download size={20} /> حمل نسختك الآن
          </a>
        </motion.section>

        {/* --- القسم الجديد: عن شركة مسار --- */}
        <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="section about-section">
          <h2 className="section-title">مين هي شركة Massar؟</h2>
          <div className="about-box">
            <p>مسار تك هي شركة برمجيات متخصصة في تصميم أنظمة ذكية بتفهم سوق العمل المصري. هدفنا مش مجرد نبيعلك برنامج، هدفنا نطورلك "مسار" شغلك بسيستم قوي، أوفلاين، ومستقر يحميك من أي تلاعب ويسهل عليك إدارة شغلك .</p>
          </div>
        </motion.section>

        {/* 2. قسم المميزات */}
        <motion.section id="features" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="section">
          <h2 className="section-title">ليه تختار Salonify؟</h2>
          <div className="grid-features">
            {data.features.map((feat, i) => (
              <div className="feature-card" key={i}>
                <CheckCircle className="icon-orange" size={28} />
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 3. سلايدر الصور 3D */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="section">
          <h2 className="section-title">نظرة من جوه السيستم 💻</h2>
          <div className="carousel-container">
            <button className="nav-btn right-btn" onClick={prevSlide}><ChevronRight size={35} /></button>
            <div className="carousel-track">
              {screenshots.map((img, index) => {
                let position = "hidden-slide"; 
                if (index === currentIndex) position = "active-slide"; 
                else if (index === currentIndex - 1 || (currentIndex === 0 && index === screenshots.length - 1)) position = "prev-slide"; 
                else if (index === currentIndex + 1 || (currentIndex === screenshots.length - 1 && index === 0)) position = "next-slide"; 
                return (
                  <img key={index} src={img} alt={`شاشة ${index + 1}`} className={`slider-img ${position}`} onClick={() => setCurrentIndex(index)} />
                );
              })}
            </div>
            <button className="nav-btn left-btn" onClick={nextSlide}><ChevronLeft size={35} /></button>
          </div>
        </motion.section>

        {/* --- قسم الفيديو --- */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="section">
          <h2 className="section-title">شوف السيستم وهو شغال 🎥</h2>
          <div className="video-container">
            {/* استبدل كلمة VIDEO_ID بالـ ID بتاع فيديو اليوتيوب بتاعك */}
            <iframe 
              src="https://www.youtube.com/embed/HeY2apzDoak" 
              title="شرح Salonify" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="promo-video"
            ></iframe>
          </div>
        </motion.section>

        {/* 4. قسم الأسعار */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="section">
          <h2 className="section-title">استثمر في صالونك</h2>
          <div className="grid-pricing">
            {data.pricing.map((plan, i) => (
              <div 
                className={`pricing-card ${plan.title.includes('اللقطة') || plan.title.includes('VIP') ? 'highlight-card' : ''}`} 
                key={i}
                onClick={() => handleBuy(plan.title)}
              >
                {plan.title.includes('اللقطة') && <div className="badge">الأكثر طلباً 🔥</div>}
                <h3>{plan.title}</h3>
                <div className="price">{plan.price}</div>
                <ul>
                  {plan.features.map((f, index) => (
                    <li key={index}><CheckCircle size={16} className="icon-green" /> {f}</li>
                  ))}
                </ul>
                {/* السطر ده بيظهر للعميل عشان يشجعه يدوس */}
                <div className="buy-hint">اضغط للاشتراك عبر واتساب 💬</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* --- القسم الجديد: الأسئلة الشائعة (FAQ) --- */}
        <motion.section id="faq" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="section">
          <h2 className="section-title">الأسئلة الشائعة ❓</h2>
          <div className="faq-container">
            {data.faqs.map((faq, i) => (
              <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-question">
                  <h3>{faq.q}</h3>
                  <ChevronDown className={`faq-icon ${openFaq === i ? 'rotate' : ''}`} />
                </div>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="faq-answer">
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 5. الفوتر الفضائي وأيقونات السوشيال ميديا */}
        <div className="footer-wrapper">
          <footer id="contact" className="footer">
            <h2>جاهز تنقل صالونك لمستوى تاني؟</h2>
            <div className="contact-links">
              
              {/* واتساب */}
              <a href={data.contact.whatsapp} target="_blank" rel="noreferrer" className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                تواصل واتساب
              </a>
              
              {/* تليفون */}
              <a href={`tel:${data.contact.phone}`} className="contact-item">
                <Phone size={22} /> {data.contact.phone}
              </a>

              {/* فيسبوك */}
              <a href={data.contact.facebook} target="_blank" rel="noreferrer" className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                فيسبوك
              </a>

            </div>
          </footer>
        </div>

      </div>
    </div>
  );
}

export default App;