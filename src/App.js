import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import './App.css';

// Login Component
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = () => {
    if (password.toLowerCase() === "ssale") {
      onLogin();
    } else {
      setError("Incorrect password. Try again.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="login-screen">
      <div className={`login-dialog ${isShaking ? "shake" : ""}`}>
        <div className="login-dialog__icon-container">
          <svg className="login-dialog__icon" viewBox="0 0 20 20" fill="currentColor" aria-label="Lock icon">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="login-dialog__title">TYPE PASSWORD</h2>
        <div className="login-dialog__password-dots">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`login-dialog__dot ${password[index] ? "filled" : ""}`}
            >
              {password[index] ? "●" : ""}
            </div>
          ))}
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value.slice(0, 5));
            setError("");
          }}
          onKeyPress={handleKeyPress}
          className="login-dialog__input"
          placeholder="Enter 5-digit password"
          maxLength="5"
          autoFocus
          aria-label="5-digit password input"
        />
        <p className="login-dialog__hint">Hint: SSALE</p>
        {error && (
          <p className="login-dialog__error">{error}</p>
        )}
        <button
          onClick={handleSubmit}
          className="login-dialog__button"
          aria-label="Submit password"
        >
          ENTER
        </button>
      </div>
    </div>
  );
};

// Final Popup Component
const FinalPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-dialog">
        <h2 className="popup-dialog__title">🎉 Your Favorite SALE is Here!</h2>
        <div className="popup-dialog__sale-banner">
          <p className="popup-dialog__sale-text">MEGA SALE</p>
          <p className="popup-dialog__sale-discount">UP TO 70% OFF</p>
        </div>
        <p className="popup-dialog__subtext">Explore the Latest Collection</p>
        <div className="popup-dialog__actions">
          <button
            onClick={() => window.open("https://www.shoppersstop.com", "_blank")}
            className="popup-dialog__button primary"
            aria-label="Visit sale page"
          >
            VISIT NOW
          </button>
          <button
            onClick={onClose}
            className="popup-dialog__button secondary"
            aria-label="Close popup"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Page Components
const PageCover = React.forwardRef(({ title, subtitle, className = '', backgroundImage }, ref) => (
  <div
    className={`page page-cover ${className}`}
    ref={ref}
    data-density="hard"
    style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
  >
    <div className="page-content page-cover__content">
      {/* Optionally add title/subtitle here */}
    </div>
  </div>
));

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        {props.image ? (
          <img
            src={props.image}
            alt={`Page ${props.number + 1}`}
            className="page__image"
            draggable="false"
          />
        ) : (
          <div className="page__text-content">
            <h3 className="page__title">Page {props.number + 1}</h3>
            <p className="page__text">{props.children}</p>
          </div>
        )}
        <div className="page__number">{props.number + 1}</div>
      </div>
    </div>
  );
});

// Move pages array outside the component
const PAGES = [
  "https://ik.imagekit.io/td5ykows9/flipbook/EOSS-Dossier-Flipbook%20-%20Page_2.jpg?updatedAt=1748805643144",
  "https://ik.imagekit.io/td5ykows9/flipbook/EOSS-Dossier-Flipbook%20-%20Page_3.jpg?updatedAt=1748805657984",
  "https://ik.imagekit.io/td5ykows9/flipbook/EOSS-Dossier-Flipbook%20-%20Page_4.jpg?updatedAt=1748805671083",
  "https://ik.imagekit.io/td5ykows9/flipbook/EOSS-Dossier-Flipbook%20-%20Page_5.jpg?updatedAt=1748805682498",
  "https://ik.imagekit.io/td5ykows9/flipbook/EOSS-Dossier-Flipbook%20-%20Page_6.jpg?updatedAt=1748805696285",
  "https://ik.imagekit.io/td5ykows9/flipbook/EOSS-Dossier-Flipbook%20-%20Page_7.jpg?updatedAt=1748805712737",
  "https://ik.imagekit.io/td5ykows9/flipbook/EOSS-Dossier-Flipbook%20-%20Page_8.jpg?updatedAt=1748805726903",
  "https://ik.imagekit.io/td5ykows9/flipbook/EOSS-Dossier-Flipbook%20-%20Page_9.jpg?updatedAt=1748805787753",
  "https://ik.imagekit.io/td5ykows9/flipbook/EOSS-Dossier-Flipbook%20-%20Page_10.jpg?updatedAt=1748805938947",
  "https://ik.imagekit.io/td5ykows9/flipbook/EOSS-Dossier-Flipbook%20-%20Page_11.jpg?updatedAt=1748805952057",
];

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const flipBookRef = useRef();

  useEffect(() => {
    const checkMobile = () => {
      const mobileState = window.innerWidth <= 768;
      if (isMobile !== mobileState) {
        console.log("DEBUG: Mobile state changed to:", mobileState);
        setIsMobile(mobileState);
      }
    };
    checkMobile();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isMobile]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = PAGES.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
        console.log('All images loaded successfully');
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    preloadImages();
  }, []); // Empty dependency array since PAGES is now stable

  const totalBookPages = PAGES.length + 1;
  console.log('Total book pages:', totalBookPages);

  const handleSuccessfulLogin = () => {
    console.log("DEBUG: Login successful. Setting book to initial closed state.");
    setIsLoggedIn(true);
    setIsBookOpen(false);
    setCurrentPage(0);
    setShowFinalPopup(false);

    if (flipBookRef.current && flipBookRef.current.pageFlip()) {
      setTimeout(() => {
        if (flipBookRef.current && flipBookRef.current.pageFlip().getPageCount() > 0) {
          console.log("DEBUG: Forcing flipbook to page 0 after login.");
          flipBookRef.current.pageFlip().turnToPage(0);
        }
      }, 100);
    }
  };

  const handleFlip = (e) => {
    const newPage = e.data;
    setCurrentPage(newPage);
  
    if (newPage > 0 && !isBookOpen) {
      setIsBookOpen(true);
    }

    // Show modal after back cover
   // Trigger modal when last visible page (back cover) is reached
  if (newPage >= totalBookPages - 2) {
    // Only show once
    if (!showFinalPopup) {
      console.log('Reached back cover, showing modal');
      setTimeout(() => setShowFinalPopup(true), 500); // Shorter delay for better UX
    }
  }
};

  const handleOpenBook = () => {
    if (!isBookOpen && flipBookRef.current && flipBookRef.current.pageFlip()) {
      const currentBookPageIdx = flipBookRef.current.pageFlip().getCurrentPageIndex();
      if (currentBookPageIdx === 0) {
        flipBookRef.current.pageFlip().flipNext();
        setIsBookOpen(true);
      }
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleSuccessfulLogin} />;
  }

  if (!imagesLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading your exclusive content...</p>
      </div>
    );
  }

  console.log(`DEBUG: App render. isMobile: ${isMobile}, isBookOpen: ${isBookOpen}, currentPage: ${currentPage}`);

  return (
    <div className="app-container">
      <div
        className={`flipbook-wrapper ${!isBookOpen ? 'closed-book-clickable' : ''}`}
        onClick={!isBookOpen ? handleOpenBook : undefined}
        role={!isBookOpen ? "button" : undefined}
        aria-label={!isBookOpen ? "Open secret dossier" : undefined}
        tabIndex={!isBookOpen ? 0 : undefined}
        onKeyPress={!isBookOpen ? (e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenBook(); } : undefined}
      >
        <HTMLFlipBook
          key={isMobile ? 'mobile-book' : 'desktop-book'}
          ref={flipBookRef}
          width={isMobile ? 350 : 550}
          height={isMobile ? 500 : 733}
          minWidth={isMobile ? 300 : 400}
          maxWidth={isMobile ? 400 : 1000}
          minHeight={isMobile ? 450 : 600}
          maxHeight={isMobile ? 600 : 1350}
          size="stretch"
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          onChangeOrientation={() => {
            setTimeout(() => {
              if (flipBookRef.current && flipBookRef.current.pageFlip()) {
                console.log("DEBUG: onChangeOrientation. Current lib orientation:", flipBookRef.current.pageFlip().getOrientation());
              }
            }, 100);
          }}
          className="flipbook-instance"
          swipeDistance={isMobile ? 20 : 50}
          usePortrait={isMobile}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          useMouseEvents={true}
          autoSize={false}
          showPageCorners={!isMobile}
          disableFlipByClick={false}
          clickEventForward={false}
          style={{
            touchAction: isMobile ? 'none' : 'auto'
          }}
        >
          <PageCover
            className="front-cover"
            backgroundImage="https://ik.imagekit.io/td5ykows9/EOSS-Dossier-Flipbook%20-%20Pages-01.jpg?updatedAt=1748688077556"
          />

          {PAGES.map((pageSrc, index) => (
            <Page key={`page-${index}`} number={index} image={pageSrc}>
              Exclusive content for Shopper's Stop members - Page {index + 1}
            </Page>
          ))}

          <PageCover
            className="back-cover"
            backgroundImage="https://ik.imagekit.io/td5ykows9/EOSS-Dossier-Flipbook%20-%20BACK-COVER.jpg?updatedAt=1748699999999"
          />
        </HTMLFlipBook>
      </div>

      <div className="navigation-controls">
        {!isMobile && (
          <button
            onClick={() => flipBookRef.current?.pageFlip().flipPrev()}
            className="nav-button prev-button"
            disabled={currentPage === 0}
            aria-label="Previous page"
          >
            &larr; Previous
          </button>
        )}
        <span className="page-indicator">
          Page {isMobile && currentPage > 0 && currentPage < totalBookPages - 1 ? currentPage : currentPage + 1} of {totalBookPages}
        </span>
        {!isMobile && (
          <button
            onClick={() => flipBookRef.current?.pageFlip().flipNext()}
            className="nav-button next-button"
            disabled={currentPage >= totalBookPages - 1}
            aria-label="Next page"
          >
            Next &rarr;
          </button>
        )}
      </div>

      {isMobile && !isBookOpen && (
        <div className="mobile-tap-to-open-hint">
          Tap the dossier to open.
        </div>
      )}

      {isMobile && isBookOpen && (
        <p className="mobile-tip">👆 Swipe left/right to flip pages</p>
      )}

      {showFinalPopup && <FinalPopup onClose={() => setShowFinalPopup(false)} />}
    </div>
  );
}