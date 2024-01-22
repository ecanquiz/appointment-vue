import { ref, onMounted } from 'vue';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

export default () => {
    const calendar = ref<Calendar | null>(null);
    const shift = ref(true);

    const toggleShift = () => {
      shift.value = !shift.value;
    };

    const valueShift = () => (shift.value ? 'T08:00:00' : 'T13:00:00');

    const nameShift = () => (shift.value ? 'Turno Mañana ' : 'Turno Tarde ');

    const controlEvents = (info: any) => {
      const nameShiftValue = nameShift();
      const calendarApi = info.view.calendar;
      const selectedDate = info.date;
      calendarApi.unselect(); // clear date selection

      const eventsForDate = calendarApi.getEvents().filter((event) => {
        const timestamp = new Date(info.dateStr + valueShift());
        const eventDate = event.start;

        // Compara solo el año, mes y día
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getHours() === timestamp.getHours()
        );
      });

      const mesActual = new Date().getMonth();
      const aux = eventsForDate.length;
      const titlesForDate = eventsForDate.map((event) => event.title);

      if (aux < 2) {
        const name = prompt('Por favor Ingrese Su Nombre');
        const realTitle = nameShiftValue + name;

        if (name && !titlesForDate.includes(realTitle) && selectedDate.getMonth() === mesActual) {
          console.log(info.dateStr);
          calendarApi.addEvent({
            id: info.dateStr,
            title: realTitle,
            start: info.dateStr + valueShift(),
            end: info.dateStr,
          });
        } else if (titlesForDate.includes(realTitle)) {
          alert('Cita Ya Existe');
        } else {
          alert('Cancelado');
        }
      } else {
        alert('Limite Alcanzado');
      }
    };

    const initCalendar = () => {
      const calendarEl = document.getElementById('calendar');

      if (calendarEl) {
        calendar.value = new Calendar(calendarEl, {
          plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
          initialView: 'dayGridMonth',
          locale: 'es',
          weekends: false,
          customButtons: {
            myCustomButton: {
              text: 'Cambiar Turno',
              click: toggleShift,
            },
          },
          headerToolbar: {
            start: 'prev,next today',
            center: 'title',
            end: 'myCustomButton',
          },
          buttonText: {
            today: 'Mes Actual',
          },
          selectable: true,
          dateClick: controlEvents,
        });

        calendar.value.render();
      }
    };

    onMounted(initCalendar);

    return {
      calendar,
      toggleShift,
      controlEvents,
    };
  
};
