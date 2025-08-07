import React, { useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';

const TypingText = ({ 
  texts = ["Explore Premium Products", "Discover Amazing Deals", "Shop Latest Trends"], 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  pauseTime = 2000,
  className = ""
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const targetText = texts[currentTextIndex];
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }
      
      const deleteTimer = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1));
      }, deletingSpeed);
      
      return () => clearTimeout(deleteTimer);
    } else {
      if (currentText === targetText) {
        setIsPaused(true);
        return;
      }
      
      const typeTimer = setTimeout(() => {
        setCurrentText(targetText.slice(0, currentText.length + 1));
      }, typingSpeed);
      
      return () => clearTimeout(typeTimer);
    }
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse text-blue-400 ml-1">|</span>
    </span>
  );
};

const Home = () => {
  return (
    <>
      <MetaData title="Home - ECOMMERCE" />

      <div className="w-full h-screen relative text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/image.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 z-10"></div>

        <div className="absolute inset-0 overflow-hidden z-15">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-purple-500/20 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-500/20 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-yellow-500/20 rounded-full animate-bounce delay-700"></div>
        </div>
        
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 min-h-[80px] md:min-h-[120px] lg:min-h-[140px] flex items-center justify-center">
            <TypingText 
              texts={[
                "Explore Premium Products",
                "Discover Amazing Deals", 
                "Shop Latest Technology",
                "Find Your Perfect Match"
              ]}
              typingSpeed={100}
              deletingSpeed={50}
              pauseTime={2500}
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight"
            />
          </h1>
          
          <p className="text-lg md:text-2xl lg:text-3xl mb-8 animate-fade-in-up opacity-0 animation-delay-1000 text-gray-200 max-w-4xl leading-relaxed">
            Shop the latest trends & tech with exclusive deals
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up opacity-0 animation-delay-1500">
            <Link to="/cart">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              Shop Now
            </button>
            </Link>
            
            <Link to="/orders">
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              View Orders
            </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up opacity-0 animation-delay-2000 w-full max-w-4xl">
            <div className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-gray-200 text-lg">Happy Customers</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">5K+</div>
              <div className="text-gray-200 text-lg">Premium Products</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-200 text-lg">Customer Support</div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center opacity-80">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Discover our wide range of premium products designed to meet all your needs. 
            From the latest technology to everyday essentials, we have everything you're looking for.
          </p>
          <Link to="/products">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              Explore Products
            </button>
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        /* Ensure full viewport height */
        html, body {
          overflow-x: hidden;
        }
        
        /* Responsive text sizing */
        @media (max-width: 640px) {
          .text-4xl {
            font-size: 2rem;
            line-height: 2.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Home;