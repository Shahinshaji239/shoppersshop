import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import './App.css'; // Make sure this is imported


// Login Component (from your code)
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = () => {
    if (password === "5212") { // Your password
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
          {[0, 1, 2, 3].map((index) => (
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
            setPassword(e.target.value.slice(0, 4));
            setError("");
          }}
          onKeyPress={handleKeyPress}
          className="login-dialog__input"
          placeholder="Enter 4-digit password"
          maxLength="4"
          autoFocus
          aria-label="4-digit password input"
        />
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

// Final Popup Component (from your code)
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

// Page Components (from your code)
const PageCover = React.forwardRef(({ title, subtitle, className = '' }, ref) => (
  <div className={`page page-cover ${className}`} ref={ref} data-density="hard">
    <div className="page-content page-cover__content">

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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false); // True if user has "opened" the book from cover
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
    let resizeTimeout; // Using your resize handler logic
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

  const pages = [
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
  const totalBookPages = pages.length + 1;

  const handleSuccessfulLogin = () => {
    console.log("DEBUG: Login successful. Setting book to initial closed state.");
    setIsLoggedIn(true);
    setIsBookOpen(false); // Mark book as "closed" (user hasn't initiated open action)
    setCurrentPage(0);    // Active page is cover
    setShowFinalPopup(false); // Ensure final popup is hidden

    if (flipBookRef.current && flipBookRef.current.pageFlip()) {
      setTimeout(() => {
        if (flipBookRef.current && flipBookRef.current.pageFlip().getPageCount() > 0) {
          console.log("DEBUG: Forcing flipbook to page 0 after login.");
          flipBookRef.current.pageFlip().turnToPage(0);
        }
      }, 0);
    }
  };

  const handleFlip = (e) => {
    console.log(`DEBUG: Page flipped. New page: ${e.data}. isMobile: ${isMobile}`);
    setCurrentPage(e.data);
    if (e.data > 0 && !isBookOpen) { // If flipped past cover page
      setIsBookOpen(true); // Mark book as "opened" by user interaction
      console.log("DEBUG: Book now considered open as it's past the cover.");
    }
    if (e.data >= totalBookPages - 1) {
      console.log("DEBUG: Reached last page, scheduling final popup.");
      setTimeout(() => setShowFinalPopup(true), 1000); // Your specified timeout
    }
  };

  const handleOpenBook = () => {
    if (!isBookOpen && flipBookRef.current && flipBookRef.current.pageFlip()) {
      const currentBookPageIdx = flipBookRef.current.pageFlip().getCurrentPageIndex();
      console.log(`DEBUG: handleOpenBook called. Current book page index: ${currentBookPageIdx}. isBookOpen: ${isBookOpen}`);
      if (currentBookPageIdx === 0) { // Only "open" if currently on the cover
        flipBookRef.current.pageFlip().flipNext();
        setIsBookOpen(true); // Mark that user has now initiated the "open" action
        console.log("DEBUG: Book explicitly opened via handleOpenBook. isBookOpen set to true.");
      }
    } else {
      console.log("DEBUG: handleOpenBook conditions not met (already open or ref issue).");
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleSuccessfulLogin} />;
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
          key={isMobile ? 'mobile-book' : 'desktop-book'} // CRITICAL for responsive re-init
          ref={flipBookRef}
          // Props from your latest code:
          width={550}
          height={733}
          minWidth={isMobile ? 280 : 400}
          maxWidth={1000}
          minHeight={isMobile ? 400 : 600}
          maxHeight={1350}
          size="stretch"
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true} // ESSENTIAL for mobile swipe
          onFlip={handleFlip}
          onChangeOrientation={() => { // From your code
            setTimeout(() => {
              if (flipBookRef.current && flipBookRef.current.pageFlip()) { // Added pageFlip() check
                console.log("DEBUG: onChangeOrientation. Current lib orientation:", flipBookRef.current.pageFlip().getOrientation());
              }
            }, 100);
          }}
          className="flipbook-instance"
          swipeDistance={isMobile ? 30 : 50} // Recommended: slightly larger for better detection
          usePortrait={isMobile} // KEY for single page view on mobile
          startPage={0} // Always start on cover
          drawShadow={true}
          flippingTime={800}
          useMouseEvents={!isMobile}
          autoSize={true}
          showPageCorners={!isMobile}
          // On mobile, disable click-to-turn page functionality.
          // Swiping is primary. Initial "open" tap is handled by `handleOpenBook` on wrapper.
          >
         <PageCover
  className="front-cover"

  backgroundImage="https://ik.imagekit.io/td5ykows9/EOSS-Dossier-Flipbook%20-%20Pages-01.jpg?updatedAt=1748688077556"
/>

{pages.map((pageSrc, index) => (
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

      <div className="navigation-controls"> {/* From your code */}
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
          Page {isMobile && currentPage > 0 && currentPage < totalBookPages -1 ? currentPage : currentPage + 1} of {totalBookPages}
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

      {/* Mobile specific hints */}
      {isMobile && !isBookOpen && (
        <div className="mobile-tap-to-open-hint"> {/* New specific class for styling this hint */}
         Tap the dossier to open.
        </div>
      )}
      {isMobile && isBookOpen && ( // Show swipe/tap hint only when book is open
         <p className="mobile-tip">👆 Tap or swipe to flip pages</p> // Using your existing mobile-tip class
      )}

      {showFinalPopup && <FinalPopup onClose={() => setShowFinalPopup(false)} />}
    </div>
  );
}