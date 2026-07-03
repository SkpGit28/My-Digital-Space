"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './TravelReceipt.module.css';

interface TravelReceiptProps {
  id?: string;
  role?: string;
  roleSub?: string;
  timeline?: string;
  timelineSub?: string;
  method?: string;
  methodSub?: string;
  outcome?: string;
  outcomeSub?: string;
  note?: string;
}

const TravelReceipt: React.FC<TravelReceiptProps> = ({
  id = "CS2-BEH-882",
  role = "Behavioral Designer",
  roleSub = "Solo Project",
  timeline = "2 Weeks",
  timelineSub = "Concept Phase",
  method = "Research & Audit",
  methodSub = "500+ Reviews Scraped",
  outcome = "Qualitative Proof",
  outcomeSub = "9 Users Tested",
  note = "Note: This is a concept project. Based on my personal experience, 500+ 1-star reviews on Google Play, and 9 participants including active users. No code was shipped. All validation was qualitative."
}) => {
  return (
    <section className={styles.receiptSection}>
      <motion.div
        initial={{ scaleX: 0.95, opacity: 0, y: 30 }}
        whileInView={{ scaleX: 1, opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={styles.receiptContainer}
      >
        {/* Scalloped Left Edge Pattern */}
        <div className={styles.scallopedLeft}>
          <div className={styles.verticalAccentLine} />
        </div>

        {/* Receipt Main Body */}
        <div className={styles.receiptBody}>
          
          {/* Header Block */}
          <div className={styles.headerBlock}>
            <div className={styles.statusBadge}>
              <span className={styles.statusText}>Concept</span>
            </div>
            <h3 className={styles.receiptTitle}>TRAVEL<br />METRICS</h3>
            <p className={styles.receiptRef}>REF: {id}</p>
          </div>

          {/* Data Grid */}
          <div className={styles.dataGrid}>
            
            {/* Role Cell */}
            <div className={styles.gridCell}>
              <span className={styles.cellLabel}>Role</span>
              <span className={styles.cellValue}>{role}</span>
              <span className={styles.cellSub}>{roleSub}</span>
            </div>

            {/* Timeline Cell */}
            <div className={styles.gridCell}>
              <span className={styles.cellLabel}>Timeline</span>
              <span className={styles.cellValue}>{timeline}</span>
              <span className={styles.cellSub}>{timelineSub}</span>
            </div>

            {/* Method Cell */}
            <div className={styles.gridCell}>
              <span className={styles.cellLabel}>Methods</span>
              <span className={styles.cellValue}>{method}</span>
              <span className={styles.cellSub}>{methodSub}</span>
            </div>

            {/* Outcome Cell */}
            <div className={styles.gridCell}>
              <span className={styles.cellLabel}>Validation</span>
              <span className={styles.cellValue}>{outcome}</span>
              <span className={styles.cellSub}>{outcomeSub}</span>
            </div>

          </div>
        </div>

        {/* Right Edge Decoration */}
        <div className={styles.scallopedRight} />
      </motion.div>

      {/* Note Block */}
      {note && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.receiptNote}
        >
          {note}
        </motion.p>
      )}
    </section>
  );
};

export default TravelReceipt;
