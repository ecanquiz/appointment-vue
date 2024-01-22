<script lang="ts">
// @ts-nocheck
import { defineComponent } from 'vue';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

export default defineComponent({
  name: 'MyCalendar',
  data() {
    return {
      calendar: null,
      shift: true
    };
  },
  mounted() {
    this.initCalendar();
  },
  methods: {
    toggleShift(){
      this.shift=!this.shift
    },
    valueShift(){
      return this.shift ? 'T08:00:00' : 'T13:00:00';
    },
    nameShift(){
      return this.shift ? 'Turno Mañana ' : 'Turno Tarde ';
    },
    ControlEvents(info: any) {
      let nameShift=this.nameShift()
      let calendarApi = info.view.calendar
      let selectedDate=info.date
      calendarApi.unselect() // clear date selection
      const eventsForDate = calendarApi.getEvents().filter(event => {
        var timestamp = new Date(info.dateStr + this.valueShift());
        const eventDate = event.start;
        // Compara solo el año, mes y día
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getHours() === timestamp.getHours()
        );
      });
      let mesActual= new Date()
      mesActual=mesActual.getMonth()
      let aux= eventsForDate.length
      const titlesForDate = eventsForDate.map(event => event.title);
      if (aux<5){//5 is the limit of people for a given shift
        let name = prompt('Por favor Ingrese Su Nombre')
        let realTitle= nameShift+name
        if ((name) && !titlesForDate.includes(realTitle) && (selectedDate.getMonth()=== mesActual)){
          console.log(info.dateStr)
          console.log(info.date)
          calendarApi.addEvent({
            id: info.dateStr,
            title: realTitle,
            start: info.dateStr+this.valueShift(),
            end: info.dateStr
          })
        }else if(titlesForDate.includes(realTitle)){
          alert("Cita Ya Existe")
        }else{
          alert("Debe ingresar un nombre")
        }
      }else{
          alert("Limite Alcanzado")
      }
    },
    initCalendar() {
      const calendarEl = this.$refs.calendar;

      this.calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'dayGridMonth',
        locale: 'es',
        contentHeight:950,
        weekends: false,//Hide Weekends
        // hiddenDays:[2,4],//Hide Tuesday and Thursday
        dayMaxEventRows: true,
        // eventLimitText:'Más',
        customButtons: {
          myCustomButton: {
            text: "Cambiar Turno",
            click: ()=> {
              this.toggleShift()
            }
          }
        },
        headerToolbar: {
          start: 'prev,next today',
          center: 'title',
          end:'myCustomButton'
        },
        buttonText:{
          today: 'Mes Actual',
        },
        selectable: true,
        dateClick: (info)=>{this.ControlEvents(info)}
      });

      this.calendar.render();
    }
  }
});
</script>
<template>
  <div>
    <div class="flex justify-center">
      <button v-if="shift" @click="toggleShift">Turno Mañana</button>
      <button v-else @click="toggleShift">Turno Tarde</button>
    </div>
    <div ref="calendar" id="calendar"></div>
    
  </div>
</template>