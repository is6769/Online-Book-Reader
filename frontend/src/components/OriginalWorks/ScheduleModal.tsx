import React, { useState, useEffect } from 'react';
import './ScheduleModal.css';
import { Chapter } from './types';

interface ScheduleModalProps {
  chapter: Chapter | null;
  onClose: () => void;
  onSchedule: (chapterId: number, scheduledDate: string) => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ chapter, onClose, onSchedule }) => {
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (chapter?.scheduledFor) {
      const date = new Date(chapter.scheduledFor);
      setScheduledDate(date.toISOString().split('T')[0]);
      setScheduledTime(date.toTimeString().slice(0, 5));
    } else {
      const now = new Date();
      setScheduledDate(now.toISOString().split('T')[0]);
      setScheduledTime('12:00');
    }
  }, [chapter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    const now = new Date();

    if (scheduledDateTime <= now) {
      setError('Please select a future date and time');
      return;
    }

    if (chapter) {
      onSchedule(chapter.id, scheduledDateTime.toISOString());
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="schedule-modal">
        <div className="modal-header">
          <h3>Schedule Chapter Release</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <h4>{chapter?.title}</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Release Date</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => {
                  setScheduledDate(e.target.value);
                  setError('');
                }}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label>Release Time</label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => {
                  setScheduledTime(e.target.value);
                  setError('');
                }}
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="schedule-btn">
                Schedule Release
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
