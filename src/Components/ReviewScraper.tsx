"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ReviewScraper.module.css';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  category: 'cancellation' | 'coordination' | 'pricing' | 'trust';
  categoryLabel: string;
}

const mockReviews: Review[] = [
  {
    id: "rev-1",
    author: "Marc L.",
    rating: 1,
    date: "2 hours ago",
    text: "Driver cancelled just 15 minutes before pickup! I was left stranded at the train station with two heavy suitcases. The app offers zero protection for riders when this happens.",
    category: "cancellation",
    categoryLabel: "Last-Minute Cancellation"
  },
  {
    id: "rev-2",
    author: "Sophie T.",
    rating: 1,
    date: "1 day ago",
    text: "The trip was marked as 'instant book', but then the driver texted me via WhatsApp asking for an extra €15 cash for 'fuel cost coverage'. If the price isn't viable, don't list it!",
    category: "pricing",
    categoryLabel: "Economic Viability"
  },
  {
    id: "rev-3",
    author: "Thomas D.",
    rating: 1,
    date: "3 days ago",
    text: "Spent almost an hour playing text-message tag with the host trying to agree on where to meet. The app's chat is slow and there is no map pin coordination. Extremely frustrating.",
    category: "coordination",
    categoryLabel: "Coordination Burden"
  },
  {
    id: "rev-4",
    author: "Elena R.",
    rating: 1,
    date: "4 days ago",
    text: "Booked a ride 3 days in advance. The driver accepted but never responded to any of my messages. On the morning of the trip, I had to cancel because I couldn't risk him not showing up.",
    category: "trust",
    categoryLabel: "Hidden Uncertainty"
  },
  {
    id: "rev-5",
    author: "Antoine M.",
    rating: 1,
    date: "1 week ago",
    text: "Host cancelled because he 'didn't get enough passengers' to make the drive worth his fuel costs. The platform should not let drivers cancel just because their car isn't full!",
    category: "pricing",
    categoryLabel: "Economic Viability"
  },
  {
    id: "rev-6",
    author: "Clara B.",
    rating: 1,
    date: "1 week ago",
    text: "The coordination burden is too high. I had to call the driver 4 times to find him in a crowded terminal. The app needs live location sharing or a unified pickup point.",
    category: "coordination",
    categoryLabel: "Coordination Burden"
  }
];

const ReviewScraper: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScraping, setIsScraping] = useState<boolean>(false);

  const triggerScrapeAnimation = () => {
    setIsScraping(true);
    setTimeout(() => {
      setIsScraping(false);
    }, 1000);
  };

  const filteredReviews = mockReviews.filter(review => {
    const matchesFilter = activeFilter === 'all' || review.category === activeFilter;
    const matchesSearch = review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          review.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={styles.scraperWidget}>
      {/* Scraper Control Panel */}
      <div className={styles.controlPanel}>
        <div className={styles.panelHeader}>
          <div className={styles.statusIndicator}>
            <span className={styles.pulseDot} />
            <span className={styles.statusText}>PLAY STORE SCRAPER ACTIVE</span>
          </div>
          <button 
            className={`${styles.scrapeButton} ${isScraping ? styles.scraping : ''}`}
            onClick={triggerScrapeAnimation}
            disabled={isScraping}
          >
            {isScraping ? "SCRAPING..." : "RE-RUN AUDIT"}
          </button>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filterButtons}>
            {['all', 'cancellation', 'pricing', 'coordination', 'trust'].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  triggerScrapeAnimation();
                }}
                className={`${styles.filterTab} ${activeFilter === filter ? styles.activeTab : ''}`}
              >
                {filter === 'all' ? 'Show All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scraped Cards Feed */}
      <div className={styles.reviewsFeed}>
        <AnimatePresence mode="popLayout">
          {filteredReviews.map((review, index) => (
            <motion.div
              layout
              key={review.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={styles.reviewCard}
            >
              <div className={styles.cardHeader}>
                <div className={styles.authorMeta}>
                  <span className={styles.authorName}>{review.author}</span>
                  <span className={styles.reviewDate}>{review.date}</span>
                </div>
                <div className={styles.ratingStars}>
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
              
              <p className={styles.reviewText}>"{review.text}"</p>
              
              <div className={styles.cardFooter}>
                <span className={`${styles.categoryTag} ${styles[review.category]}`}>
                  {review.categoryLabel}
                </span>
                <span className={styles.sourceText}>Google Play Store · 1★ Review</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredReviews.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.emptyState}
          >
            <p>No complaints match your search query.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReviewScraper;
