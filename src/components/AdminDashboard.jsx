import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const storedBookings = JSON.parse(localStorage.getItem('restaurant_bookings') || '[]');
        setBookings(storedBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }, [navigate]);

    const formatTime12h = (time24) => {
        if (!time24) return '';
        const [hours, minutes] = time24.split(':');
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAdminAuthenticated');
        navigate('/login');
    };

    const deleteBooking = (id) => {
        const updatedBookings = bookings.filter(b => b.id !== id);
        setBookings(updatedBookings);
        localStorage.setItem('restaurant_bookings', JSON.stringify(updatedBookings));
    };

    const updateStatus = (id, status) => {
        const updatedBookings = bookings.map(b => b.id === id ? { ...b, status } : b);
        setBookings(updatedBookings);
        localStorage.setItem('restaurant_bookings', JSON.stringify(updatedBookings));
    };

    return (
        <section className="admin-dashboard section-padding">
            <div className="container">
                <div className="admin-header text-center" style={{ marginBottom: '50px', position: 'relative' }}>
                    <button onClick={handleLogout} className="btn-primary" style={{ position: 'absolute', right: 0, top: 0, padding: '8px 20px', fontSize: '0.8rem' }}>Logout</button>
                    <h2 className="section-title">Admin <span className="heading-gold">Dashboard</span></h2>
                    <p className="section-subtitle">Manage Guest Reservations</p>
                </div>

                <div className="bookings-container glass">
                    {bookings.length === 0 ? (
                        <div className="no-bookings text-center" style={{ padding: '40px' }}>
                            <p>No reservations found.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Guest</th>
                                        <th>Contact</th>
                                        <th>Details</th>
                                        <th>Seat</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>
                                                <div className="guest-info">
                                                    <strong>{booking.name}</strong>
                                                    <span>{booking.email}</span>
                                                </div>
                                            </td>
                                            <td>{booking.phone}</td>
                                            <td>
                                                <div className="booking-details">
                                                    <div>{booking.date}</div>
                                                    <div style={{ color: 'var(--primary-color)', fontSize: '0.85rem' }}>
                                                        {formatTime12h(booking.timeFrom)} - {formatTime12h(booking.timeTo)}
                                                    </div>
                                                    <div>{booking.guests} People</div>
                                                </div>
                                            </td>
                                            <td>{booking.seat}</td>
                                            <td>
                                                <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-btns">
                                                    {booking.status === 'Pending' && (
                                                        <button
                                                            onClick={() => updateStatus(booking.id, 'Confirmed')}
                                                            className="btn-action confirm"
                                                            title="Confirm Booking"
                                                        >
                                                            ✓
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteBooking(booking.id)}
                                                        className="btn-action delete"
                                                        title="Delete Booking"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .admin-dashboard {
                    min-height: 80vh;
                    background: var(--background-color);
                }

                .bookings-container {
                    padding: 20px;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .table-responsive {
                    overflow-x: auto;
                }

                .admin-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }

                .admin-table th {
                    padding: 15px;
                    border-bottom: 2px solid var(--glass-border);
                    color: var(--primary-color);
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    letter-spacing: 1px;
                }

                .admin-table td {
                    padding: 20px 15px;
                    border-bottom: 1px solid var(--glass-border);
                    vertical-align: middle;
                }

                .guest-info strong {
                    display: block;
                    color: var(--text-color);
                }

                .guest-info span {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                }

                .status-badge {
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    font-weight: bold;
                }

                .status-badge.pending {
                    background: rgba(212, 175, 55, 0.1);
                    color: var(--primary-color);
                    border: 1px solid var(--primary-color);
                }

                .status-badge.confirmed {
                    background: rgba(46, 204, 113, 0.1);
                    color: #2ecc71;
                    border: 1px solid #2ecc71;
                }

                .action-btns {
                    display: flex;
                    gap: 10px;
                }

                .btn-action {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                    font-weight: bold;
                }

                .btn-action.confirm {
                    background: rgba(46, 204, 113, 0.1);
                    color: #2ecc71;
                    border: 1px solid #2ecc71;
                }

                .btn-action.confirm:hover {
                    background: #2ecc71;
                    color: white;
                }

                .btn-action.delete {
                    background: rgba(231, 76, 60, 0.1);
                    color: #e74c3c;
                    border: 1px solid #e74c3c;
                }

                .btn-action.delete:hover {
                    background: #e74c3c;
                    color: white;
                }

                @media (max-width: 768px) {
                    .admin-table th:nth-child(2),
                    .admin-table td:nth-child(2),
                    .admin-table th:nth-child(4),
                    .admin-table td:nth-child(4) {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default AdminDashboard;
