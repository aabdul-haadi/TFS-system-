import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.testimonials-header');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = window.setInterval(() => {
      goToNext();
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-20 bg-blue-800"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 testimonials-header opacity-0 transition-opacity duration-1000">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            What People Say
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-blue-100">
            Hear from our community about their experiences at The Florence School.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-xl bg-white shadow-xl p-8 overflow-hidden">
            <div className="absolute top-4 right-4 text-blue-800 opacity-20">
              <Quote className="h-24 w-24" />
            </div>
            
            <div 
              className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-700 italic mb-4">
                    "{testimonials[currentIndex].content}"
                  </p>
                  <div>
                    <h4 className="text-xl font-bold text-blue-800">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-amber-500">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={goToPrevious}
              className="p-2 rounded-full bg-white text-blue-800 hover:bg-amber-400 transition-colors duration-300"
              aria-label="Previous testimonial"
              onMouseEnter={stopAutoSlide}
              onMouseLeave={startAutoSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAnimating(true);
                    setTimeout(() => setIsAnimating(false), 500);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-amber-400 w-6' : 'bg-white bg-opacity-50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  onMouseEnter={stopAutoSlide}
                  onMouseLeave={startAutoSlide}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={goToNext}
              className="p-2 rounded-full bg-white text-blue-800 hover:bg-amber-400 transition-colors duration-300"
              aria-label="Next testimonial"
              onMouseEnter={stopAutoSlide}
              onMouseLeave={startAutoSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;