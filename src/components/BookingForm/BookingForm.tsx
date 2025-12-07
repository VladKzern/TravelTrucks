'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './BookingForm.module.css';

type BookingFormProps = {
  camperId: string;
  camperName: string;
};

export default function BookingForm({ camperId, camperName }: BookingFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !date) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success(`Camper "${camperName}" successfully booked!`);

      setName('');
      setEmail('');
      setDate('');
      setComment('');
    } catch (err) {
      toast.error('Failed to book camper.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.bookingFormWrapper}>
      <Toaster position="top-right" />
      
      <form className={css.bookingForm} onSubmit={handleSubmit}>
        
        <div className={css.infoContainer}>
          <h3>Book your campervan now</h3>
          <p className={css.text}>Stay connected! We are always ready to help you.</p>
        </div>
        {/* NAME - required */}
        <input
          className={css.input}
          type="text"
          placeholder="Your Name*"
          value={name}
          required
          onChange={e => setName(e.target.value)}
        />

        {/* EMAIL - required */}
        <input
          className={css.input}
          type="email"
          placeholder="Your Email*"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />

        {/* DATE - required + CALENDAR */}
        <input
          className={css.input}
          type="date"
          value={date}
          required
          onChange={e => setDate(e.target.value)}
        />

        {/* COMMENT - optional */}
        <textarea
          className={css.textarea}
          placeholder="Comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />

        <button type="submit" disabled={isSubmitting} className={css.button}>
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
