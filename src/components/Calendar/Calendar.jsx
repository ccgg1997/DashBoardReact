import React, { useEffect, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { createEvento,infoEventos,deleteEvento } from "../Api/apiAddress";
import { setEventos } from "../../features/eventos/eventos";
import { useDispatch } from "react-redux";

import "./Calendar.css";

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { eventos } = useSelector((state) => state.eventos);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(eventos, "eventos", token);

  const exampleEvents = eventos;

  useEffect(() => {
    setEvents(exampleEvents);
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newEvent = await createEvento({ title: newEventTitle, start: newEventDate },token);
    const eventsApi = await infoEventos(token);
    dispatch(setEventos(eventsApi));
    setEvents(eventsApi);
    closeModal();
  };

  const handleDeleteEvent = async() => {
    const deleteEventApi= await deleteEvento(selectedEvent,token);
    const eventsApi = await infoEventos(token);
    dispatch(setEventos(eventsApi));
    setEvents(eventsApi);
    closeModal();
    setSelectedEvent(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewEventTitle("");
    setNewEventDate("");
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const calendarEl = document.getElementById("myCalendar");
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, interactionPlugin, listPlugin],
      events: exampleEvents,
      editable: true,
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,listWeek",
      }
    });
    calendar.render();
  }, [exampleEvents]);

  return (
    <div className="micalendario">
      <div className="botonesContenedor">
        <Button variant="contained" onClick={openModal}>
          Agregar Evento
        </Button>
        
        <Button variant="contained" onClick={openDeleteModal} style={{ backgroundColor: "red" }}>
          Eliminar Evento
        </Button>
      </div>
      <div className="myCalendar" id="myCalendar"></div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Agregar Evento</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Título del evento"
              variant="outlined"
              fullWidth
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Fecha del evento"
              type="date"
              variant="outlined"
              fullWidth
              value={newEventDate}
              onChange={(e) => setNewEventDate(e.target.value)}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Agregar Evento
            </Button>
            <Button onClick={closeModal} variant="outlined" sx={{ mt: 2, ml: 2 }}>
              Cancelar
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Eliminar Evento</h2>
          <p>Selecciona el evento que deseas eliminar:</p>
          <select
            value={selectedEvent ? selectedEvent.title : ""}
            onChange={(e) => {
              const selectedTitle = e.target.value;
              const selected = events.find((event) => event.title === selectedTitle);
              setSelectedEvent(selected.identifier);
            }}
            sx={{ mb: 2 }}
          >
            <option value="">Seleccione un evento</option>
            {events.map((event, index) => (
              <option key={index} value={event.title}>
                {event.identifier}
              </option>
            ))}
          </select>
          <Button onClick={handleDeleteEvent} variant="contained" sx={{ mt: 2 }}>
            Eliminar
          </Button>
          <Button onClick={closeDeleteModal} variant="outlined" sx={{ mt: 2, ml: 2 }}>
            Cancelar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
