import "./CalendarApp.css";
import { useState, useEffect } from "react";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

import { motion } from "framer-motion";

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [notes, setNotes] = useState("");

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  useEffect(() => {
    const saved = localStorage.getItem("calendar-notes");
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("calendar-notes", notes);
  }, [notes]);

  const handleDateClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else {
      if (day < startDate) {
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  const isInRange = (day) => {
    return startDate && endDate && day >= startDate && day <= endDate;
  };

  return (
    <div className="app-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="calendar-card"
      >
        {/* HERO IMAGE */}
        <div className="hero">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            alt="calendar visual"
          />
          <div className="hero-overlay"></div>
        </div>

        {/* HEADER */}
        <div className="header">
          <button
            className="nav-btn"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            ◀
          </button>

          <h2 className="month-title">
            {format(currentDate, "MMMM yyyy")}
          </h2>

          <button
            className="nav-btn"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            ▶
          </button>
        </div>

        {/* MAIN */}
        <div className="main">
          {/* CALENDAR */}
          <div className="calendar-grid">
            {days.map((day, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleDateClick(day)}
                className={`day 
                  ${isSameDay(day, startDate) ? "start" : ""}
                  ${isSameDay(day, endDate) ? "end" : ""}
                  ${isInRange(day) ? "range" : ""}
                `}
              >
                {format(day, "d")}
              </motion.div>
            ))}
          </div>

          {/* NOTES */}
          <div className="notes">
            <div className="notes-box">
              <h3>Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write something..."
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}