import React, { useState } from 'react';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeFrom: '19:00', // Default 7 PM
    timeTo: '21:00',   // Default 9 PM
    guests: 2,
    seat: 'Table',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const minuteOptions = ['00', '15', '30', '45'];
  const ampmOptions = ['AM', 'PM'];

  const guestOptions = [1, 2, 3, 4, 5, 6];
  const seatOptions = [
    { id: 'Table', label: 'Standard Table' },
    { id: 'Booth', label: 'Cozy Booth' },
    { id: 'Window', label: 'Window Seat' },
    { id: 'Bar', label: 'Bar Seating' },
    { id: 'Private', label: 'Private Area' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (type, unit, value) => {
    const currentTime = formData[type] || '12:00';
    let [h24, mins] = currentTime.split(':');
    let h = parseInt(h24, 10);
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;

    if (unit === 'hour') h = parseInt(value, 10);
    if (unit === 'minute') mins = value;
    if (unit === 'ampm') ampm = value;

    // Convert back to 24h
    let newH24 = h;
    if (ampm === 'PM' && h < 12) newH24 += 12;
    if (ampm === 'AM' && h === 12) newH24 = 0;

    const timeString = `${newH24.toString().padStart(2, '0')}:${mins}`;
    setFormData({ ...formData, [type]: timeString });
  };

  const getTimeParts = (time24) => {
    if (!time24) return { hour: '12', minute: '00', ampm: 'PM' };
    const [h24, mins] = time24.split(':');
    let h = parseInt(h24, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return { hour: h.toString(), minute: mins, ampm };
  };

  const formatTime12h = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle localStorage storage
    const bookings = JSON.parse(localStorage.getItem('restaurant_bookings') || '[]');

    // Validation: Check for overlapping bookings
    const hasOverlap = bookings.some(booking => {
      if (booking.date === formData.date && booking.seat === formData.seat) {
        // Time overlap logic: (StartA < EndB) && (EndA > StartB)
        return (formData.timeFrom < booking.timeTo) && (formData.timeTo > booking.timeFrom);
      }
      return false;
    });

    if (hasOverlap) {
      alert(`Sorry, this seat is already booked for the selected time range (${formatTime12h(formData.timeFrom)} - ${formatTime12h(formData.timeTo)}). Please choose another time or seat.`);
      return;
    }

    const newBooking = {
      ...formData,
      id: Date.now(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem('restaurant_bookings', JSON.stringify(bookings));

    setIsSubmitted(true);
    setFormData({ name: '', phone: '', email: '', date: '', timeFrom: '19:00', timeTo: '21:00', guests: 2, seat: 'Table', message: '' });
  };

  return (
    <section id="reservations" className="section-padding">
      <div className="container">
        <div className="reservation-content glass text-center">
          <h3 className="section-subtitle">Book a Table</h3>
          <h2 className="section-title">Make a <span className="heading-gold">Reservation</span></h2>

          {isSubmitted ? (
            <div className="success-message-container fade-in">
              <div className="success-icon">✓</div>
              <h3 className="heading-gold">Booking Request Sent</h3>
              <p>Thank you for choosing us! Your reservation for <strong>{getTimeParts(formData.date).hour}</strong> is now <strong>PENDING</strong>. We will confirm your seat shortly via email or phone.</p>
              <button onClick={() => setIsSubmitted(false)} className="btn-primary" style={{ marginTop: '20px' }}>
                Make Another Booking
              </button>
            </div>
          ) : (
            <form className="reservation-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group time-selector-group">
                  <label className="selector-label">From</label>
                  <div className="time-picker-custom">
                    <select
                      value={getTimeParts(formData.timeFrom).hour}
                      onChange={(e) => handleTimeChange('timeFrom', 'hour', e.target.value)}
                      className="time-select"
                    >
                      {hourOptions.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                    <select
                      value={getTimeParts(formData.timeFrom).minute}
                      onChange={(e) => handleTimeChange('timeFrom', 'minute', e.target.value)}
                      className="time-select"
                    >
                      {minuteOptions.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select
                      value={getTimeParts(formData.timeFrom).ampm}
                      onChange={(e) => handleTimeChange('timeFrom', 'ampm', e.target.value)}
                      className="time-select ampm"
                    >
                      {ampmOptions.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group time-selector-group">
                  <label className="selector-label">To</label>
                  <div className="time-picker-custom">
                    <select
                      value={getTimeParts(formData.timeTo).hour}
                      onChange={(e) => handleTimeChange('timeTo', 'hour', e.target.value)}
                      className="time-select"
                    >
                      {hourOptions.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                    <select
                      value={getTimeParts(formData.timeTo).minute}
                      onChange={(e) => handleTimeChange('timeTo', 'minute', e.target.value)}
                      className="time-select"
                    >
                      {minuteOptions.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select
                      value={getTimeParts(formData.timeTo).ampm}
                      onChange={(e) => handleTimeChange('timeTo', 'ampm', e.target.value)}
                      className="time-select ampm"
                    >
                      {ampmOptions.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <div className="selector-label">Number of Guests</div>
                  <div className="guest-selector">
                    {guestOptions.map(num => (
                      <button
                        key={num}
                        type="button"
                        className={`guest-chip ${formData.guests === num ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, guests: num })}
                      >
                        {num}{num === 6 ? '+' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <div className="selector-label">Select Seating</div>
                  <div className="seat-selector">
                    {seatOptions.map(option => (
                      <button
                        key={option.id}
                        type="button"
                        className={`seat-chip ${formData.seat === option.id ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, seat: option.id })}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Special Requests (Optional)"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  style={{ resize: 'none' }}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '20px', width: '100%' }}>
                Confirm Booking
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .reservation-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 50px;
          border-radius: 8px;
        }

        .reservation-form {
          margin-top: 30px;
        }

        .form-group {
          margin-bottom: 20px;
          flex: 1;
        }

        .form-row {
          display: flex;
          gap: 20px;
        }

        .form-control {
          width: 100%;
          padding: 15px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: var(--text-color);
          font-family: var(--font-body);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          outline: none;
          border-color: var(--primary-color);
          background: rgba(212, 175, 55, 0.05);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
        }

        .time-picker-custom {
          display: flex;
          gap: 5px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          padding: 5px;
        }

        .time-select {
          background: transparent;
          border: none;
          color: var(--text-color);
          padding: 10px 5px;
          font-family: var(--font-body);
          cursor: pointer;
          outline: none;
          flex: 1;
          text-align: center;
          font-size: 0.95rem;
        }

        .time-select option {
          background: #111;
          color: #fff;
        }

        .time-select.ampm {
          color: var(--primary-color);
          font-weight: bold;
        }

        .success-message-container {
          padding: 40px;
          animation: scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: var(--primary-color);
          color: #000;
          font-size: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin: 0 auto 20px;
          box-shadow: 0 10px 30px rgba(224, 179, 34, 0.4);
        }

        @keyframes scaleUp {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .selector-label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 12px;
          text-align: left;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .guest-selector, .seat-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .guest-chip, .seat-chip {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-color);
          padding: 10px 18px;
          border-radius: 30px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: var(--font-body);
        }

        .guest-chip {
          width: 45px;
          height: 45px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .guest-chip.active, .seat-chip.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: #000;
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(224, 179, 34, 0.3);
          transform: translateY(-2px);
        }

        .guest-chip:hover:not(.active), .seat-chip:hover:not(.active) {
          border-color: var(--primary-color);
          background: rgba(212, 175, 55, 0.05);
        }

        /* Custom style for calendar icon color in Chrome */
        ::-webkit-calendar-picker-indicator {
          filter: invert(1) sepia(100%) saturate(500%) hue-rotate(10deg);
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .reservation-content {
            padding: 30px;
          }
          .form-row {
            flex-direction: column;
            gap: 10px;
          }
          .guest-selector {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Reservation;
