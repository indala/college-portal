import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'react-bootstrap-icons';
import './ScrollToTopButton.css';

const ScrollToTopButton = ({ containerRef }) => {
  const [visible, setVisible] = useState(false);
  const isUsingContainer = !!containerRef?.current;

  useEffect(() => {
    const scrollContainer = containerRef?.current || window;

    const getScrollTop = () =>
      containerRef?.current ? containerRef.current.scrollTop : window.pageYOffset;

    const toggleVisibility = () => {
      setVisible(getScrollTop() > 300);
    };

    scrollContainer.addEventListener('scroll', toggleVisibility);
    return () => {
      scrollContainer.removeEventListener('scroll', toggleVisibility);
    };
  }, [containerRef]);

  const scrollToTop = () => {
  const start = containerRef?.current
    ? containerRef.current.scrollTop
    : window.pageYOffset;

  const duration = 600;
  const startTime = performance.now();

  const easeOutCubic = (t) => (--t) * t * t + 1;

  const scroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeOutCubic(progress);

    if (containerRef?.current) {
      containerRef.current.scrollTop = start * (1 - ease);
    } else {
      window.scrollTo(0, start * (1 - ease));
    }

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
};


  return (
    <button
      className={`scroll-to-top ${visible ? 'visible' : ''} ${isUsingContainer ? 'absolute' : 'fixed'}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp size={22} />
    </button>
  );
};

export default ScrollToTopButton;
