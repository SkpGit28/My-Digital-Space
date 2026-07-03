"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ViabilityMeter.module.css';

type TripState = 'justListed' | 'fillingUp' | 'lockedIn';

export const ViabilityMeter: React.FC = () => {
  // State for the number of filled seats (1 to 4)
  const [filledSeatsCount, setFilledSeatsCount] = useState<number>(1);

  // Derive current trip state based on filled seats
  // 1 seat -> justListed
  // 2 seats -> fillingUp
  // 3 or 4 seats -> lockedIn
  const getTripState = (count: number): TripState => {
    if (count <= 1) return 'justListed';
    if (count === 2) return 'fillingUp';
    return 'lockedIn';
  };

  const currentState = getTripState(filledSeatsCount);

  // Data for the 3 interactive state cards
  const stateCardsData = [
    {
      id: 'justListed' as TripState,
      title: 'Just listed',
      subtitle: 'New trip, no seats yet.',
      seatsCount: 1,
    },
    {
      id: 'fillingUp' as TripState,
      title: 'Filling up',
      subtitle: 'One more seat and it locks.',
      seatsCount: 2,
    },
    {
      id: 'lockedIn' as TripState,
      title: 'Locked in',
      subtitle: 'Set to go, a seat still open.',
      seatsCount: 3,
    },
  ];

  // Calculations based on filled seats
  const totalTripCost = 90;
  const pricePerSeat = totalTripCost / filledSeatsCount;
  const discountPercent = Math.round(((totalTripCost - pricePerSeat) / totalTripCost) * 100);

  // Get status text for the viability meter footer
  const getMeterFooterText = (count: number) => {
    switch (count) {
      case 1:
        return 'A few co-travelers and this trip is set.';
      case 2:
        return '1 more seat locks this trip.';
      case 3:
        return '1 seat still open.';
      case 4:
        return 'Trip is fully booked!';
      default:
        return '';
    }
  };

  // Get status label
  const getStatusLabel = (count: number) => {
    switch (count) {
      case 1:
        return 'Just listed';
      case 2:
        return 'Filling up';
      case 3:
      case 4:
        return 'Locked in';
      default:
        return '';
    }
  };

  // Toggle seat state by clicking on the seat in the mockup
  const handleSeatClick = (index: number) => {
    // If we click an empty seat, fill up to that seat
    // If we click a filled seat, empty down to that seat (minimum 1 seat)
    const targetCount = index + 1;
    setFilledSeatsCount(targetCount);
  };

  return (
    <div className={styles.container}>
      {/* Left Column: Headings & State Cards */}
      <div className={styles.leftColumn}>
        <div className={styles.headerGroup}>
          <div className={styles.preHeading}>
            <span className={styles.pillText}>SOLUTION 1/4</span>
            <span className={styles.dot} />
            <span className={styles.pillText}>TRIP VIABILITY METER</span>
          </div>
          <h2 className={`cs2-t-h2 ${styles.title}`}>
            Seeing when a ride is worth the drive.
          </h2>
        </div>

        <p className={`cs2-t-body-lg ${styles.description}`}>
          A live viability meter, seat fill, lock point, and all, so riders read a trip's odds at a glance and choose with confidence.
        </p>

        <div className={styles.stateCards}>
          {stateCardsData.map((card) => {
            const isActive = 
              (card.id === 'justListed' && filledSeatsCount === 1) ||
              (card.id === 'fillingUp' && filledSeatsCount === 2) ||
              (card.id === 'lockedIn' && filledSeatsCount >= 3);

            return (
              <button
                key={card.id}
                onClick={() => setFilledSeatsCount(card.seatsCount)}
                className={`${styles.stateCard} ${isActive ? styles.active : ''} ${
                  isActive ? styles[card.id] : ''
                }`}
              >
                <div className={styles.cardIndicatorDot} />
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>{card.title}</h4>
                  <span className={styles.cardSubtitle}>{card.subtitle}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Skeuomorphic Phone Mockup */}
      <div className={styles.rightColumn}>
        <div className={styles.phoneMockup}>
          <div className={styles.phoneNotch} />
          
          <div className={styles.phoneScreen}>
            {/* Phone Header */}
            <div className={styles.phoneHeader}>
              <span className={styles.backButton}>←</span>
              <span className={styles.screenTitle}>Ride Details</span>
              <span className={styles.infoIcon}>ⓘ</span>
            </div>

            {/* Trip Overview Card */}
            <div className={styles.tripCard}>
              <div className={styles.driverInfo}>
                <div className={styles.driverAvatar}>M</div>
                <div className={styles.driverMeta}>
                  <span className={styles.driverName}>Marc</span>
                  <span className={styles.driverRating}>Ambassador · 4.9 ★</span>
                </div>
              </div>

              <div className={styles.routeInfo}>
                <div className={styles.routeRow}>
                  <div className={styles.routeDot} />
                  <span className={styles.routeTime}>08:00</span>
                  <span className={styles.routeCity}>Paris, Gare de Lyon</span>
                </div>
                <div className={styles.routeRow}>
                  <div className={styles.routeDot} />
                  <span className={styles.routeTime}>13:30</span>
                  <span className={styles.routeCity}>Munich, Central Station</span>
                </div>
              </div>

              {/* Interactive Seats */}
              <div className={styles.seatsHeader}>
                <span className={styles.seatsTitle}>Select Passenger Count</span>
                <span className={styles.seatsInstruction}>Click to toggle seats</span>
              </div>

              <div className={styles.seatSelectorGrid}>
                {[0, 1, 2, 3].map((index) => {
                  const isFilled = index < filledSeatsCount;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSeatClick(index)}
                      className={`${styles.interactiveSeat} ${isFilled ? styles.filled : ''} ${
                        isFilled ? styles[currentState] : ''
                      }`}
                    >
                      <svg
                        className={styles.seatIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={isFilled ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span className={styles.seatLabel}>Seat {index + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Viability Meter Widget */}
            <div className={`${styles.meterWidget} ${styles[currentState]}`}>
              <div className={styles.meterHeader}>
                <span className={styles.meterHeading}>Trip Viability Meter</span>
                <span className={`${styles.statusPill} ${styles[currentState]}`}>
                  {getStatusLabel(filledSeatsCount)}
                </span>
              </div>

              {/* Progress bar container */}
              <div className={styles.progressContainer}>
                <div className={styles.progressTrack}>
                  <div 
                    className={`${styles.progressFill} ${styles[currentState]}`} 
                    style={{ width: `${(filledSeatsCount / 4) * 100}%` }}
                  />
                </div>
                
                {/* Lock point vertical line */}
                <div className={`${styles.lockLine} ${styles[currentState]}`} />
                <span className={`${styles.lockLabel} ${filledSeatsCount >= 3 ? styles.active : ''}`}>
                  Locks at 3
                </span>

                {/* Slider Thumb representing the current seat count */}
                <div 
                  className={`${styles.sliderThumb} ${styles[currentState]}`}
                  style={{ left: `${(filledSeatsCount / 4) * 100}%` }}
                />
              </div>

              <p className={`${styles.meterFooter} ${styles[currentState]}`}>
                {getMeterFooterText(filledSeatsCount)}
              </p>
            </div>

            {/* Live Financial Benefits / Stats Card */}
            <div className={styles.statsCard}>
              <span className={styles.statsHeader}>Trip Economics</span>
              
              <div className={styles.statsRow}>
                <span className={styles.statsLabel}>Driver Status</span>
                <span className={`${styles.statsValue} ${
                  filledSeatsCount >= 3 
                    ? styles.confirmed 
                    : `${styles.unconfirmed} ${filledSeatsCount === 2 ? styles.filling : ''}`
                }`}>
                  {filledSeatsCount >= 3 ? 'Confirmed' : 'Unconfirmed'}
                </span>
              </div>

              <div className={styles.statsRow}>
                <span className={styles.statsLabel}>Cost per Rider</span>
                <span className={styles.statsValue}>
                  ${pricePerSeat.toFixed(2)}
                </span>
              </div>

              <div className={styles.statsRow}>
                <span className={styles.statsLabel}>Rider Share Savings</span>
                <span className={`${styles.statsValue} ${styles.discount}`}>
                  {discountPercent}% Saved
                </span>
              </div>
            </div>

            {/* Book Now Button */}
            <button className={`${styles.actionButton} ${styles[currentState]}`}>
              {filledSeatsCount >= 3 ? 'Book Instantly (Confirmed)' : 'Request Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
