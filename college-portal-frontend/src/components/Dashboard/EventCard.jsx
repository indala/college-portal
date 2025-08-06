import React from 'react';
import { CalendarEvent, Paperclip } from 'react-bootstrap-icons';

const EventCard = ({ title, date, description, attachment }) => {
  const handleAttachmentClick = (e) => {
    e.stopPropagation();
    window.open(attachment, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="event-card card text-white">
      <div className="event-header">
        <CalendarEvent className="event-icon" size={40} />
        <h5 className="mb-0 mt-3">{title}</h5>
      </div>

      <div className="event-date fw-bold text-info mt-1">{date}</div>

      <div className="event-description">
        {description}
      </div>

      {attachment && (
        <div
          className="event-attachment text-decoration-underline mt-2"
          role="button"
          onClick={handleAttachmentClick}
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
        >
          <Paperclip className="me-1" />
          View Attachment
        </div>
      )}
    </div>
  );
};

export default EventCard;
