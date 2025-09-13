import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import API from '../services/api';
import { toast } from 'react-toastify';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await API.get('/api/events/my-calendar');
        const formattedEvents = data.map(event => ({
          title: event.title,
          start: event.start,
          end: event.end,
          allDay: event.allDay,
          extendedProps: event.resource,
          className: event.resource.type === 'quiz' 
            ? '!bg-green-500 !border-green-600' 
            : '!bg-sky-500 !border-sky-600',
        }));
        setEvents(formattedEvents);
      } catch (error) {
        toast.error('Could not load calendar events.');
      }
    };
    fetchEvents();
  }, []);

  const handleEventClick = (clickInfo) => {
    const { type, id } = clickInfo.event.extendedProps;
    if (type === 'quiz') {
      navigate(`/quiz/${id}`);
    } else if (type === 'assignment') {
      navigate(`/assignment/${id}`);
    }
  };

  return (
    <>
      {/* Style block to theme FullCalendar using Tailwind's @apply */}
      <style>
        {`
          .fc .fc-toolbar-title {
            @apply text-2xl font-bold text-stone-700;
          }
          .fc .fc-button {
            @apply bg-white border border-stone-300 text-stone-600 hover:bg-stone-100;
          }
          .fc .fc-button-primary {
            @apply bg-amber-500 border-amber-500 text-white hover:bg-amber-600;
          }
          .fc .fc-button-primary:disabled {
            @apply bg-amber-500/70 border-amber-500/70;
          }
          .fc .fc-button-active {
            @apply bg-amber-600 border-amber-600 text-white;
          }
          .fc .fc-day-today {
            @apply bg-amber-100/60;
          }
          .fc .fc-col-header-cell-cushion {
            @apply py-2 text-sm text-stone-500 font-semibold;
          }
          .fc .fc-daygrid-day-number {
            @apply p-2 text-stone-600;
          }
          .fc-event {
            @apply cursor-pointer;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-stone-800 mb-8">My Deadlines</h1>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,dayGridDay'
            }}
            events={events}
            eventClick={handleEventClick}
            height="70vh"
          />
        </div>
      </div>
    </>
  );
};

export default CalendarPage;