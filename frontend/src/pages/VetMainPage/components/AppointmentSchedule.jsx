import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Spinner } from '@/shared/components/Spinner';
import {useNavigate} from "react-router-dom";

export function AppointmentSchedule() {
  const [appointmentSchedules, setAppointmentSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [apiProgress, setApiProgress] = useState(false);
  const navigate = useNavigate();

  const getAppointments = useCallback(async () => {
    setApiProgress(true);
    try {
      const usersResponse = await axios.get('http://localhost:8080/api/users');
      const users = usersResponse.data;

      const appointmentsResponse = await axios.get('http://localhost:8080/api/appointments');
      const appointments = appointmentsResponse.data;

      const mergedSchedules = users.map((user) => ({
        ...user,
        appointment: appointments.find((appointment) => appointment.userId === user.id) || {},
      }));

      setAppointmentSchedules(mergedSchedules);
    } catch (error) {
      console.error('Error fetching appointment schedules: ', error);
    } finally {
      setApiProgress(false);
    }
  }, []);

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  return (
      <div className="card">
        <div className="card-header text-center fs-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Appointment Schedule List</span>
          <input
              type="text"
              placeholder="Search Username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '185px', height: '30px' }}
          />
        </div>
        <div>
          <button className='btn btn-primary' onClick={() => navigate('/addAppointment')}>
            Add Appointment
          </button>
        </div>
        <ul className="list-group list-group-flush">
          {apiProgress ? (
              <Spinner />
          ) : (
              appointmentSchedules
                  .filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((user) => (
                      <li key={user.id} className={`list-group-item ${user.id === selectedUserId ? 'active' : ''}`} onClick={() => setSelectedUserId(user.id)}>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>{user.username}</span>
                          <span>{user.appointment.Appointment_Date}</span>
                          <span>{user.appointment.Appointment_Time}</span>
                          <span>{user.appointment.Appointment_Type}</span>
                          <span>{user.appointment.Appointment_Description}</span>
                          <span>{user.appointment.status}</span>
                        </div>
                      </li>
                  ))
          )}
        </ul>
        <div className="card-footer text-center">
          {!apiProgress && <button className="btn btn-outline-secondary btn-sm float-start custom-btn">Previous</button>}
          {!apiProgress && <button className="btn btn-outline-secondary btn-sm float-end custom-btn">Next</button>}
        </div>
      </div>
  );
}
