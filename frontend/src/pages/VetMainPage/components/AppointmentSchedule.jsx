import React, { useEffect, useState, useCallback } from 'react';
//import { loadUsers, loadAppointmentSchedules } from '@/lib/api';
import { Spinner } from '@/shared/components/Spinner';
import { UserListItem } from './UserListItem';

export function AppointmentSchedule() {
  const [appointmentSchedules, setAppointmentSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [apiProgress, setApiProgress] = useState(false);

  const getUsers = useCallback(async () => {
    setApiProgress(true);
    try {
      const usersResponse = await loadUsers();
      const users = usersResponse.data;

      const appointmentSchedulesResponse = await loadAppointmentSchedules();
      const fetchedAppointmentSchedules = appointmentSchedulesResponse.data;

      const mergedSchedules = users.map((user) => ({
        ...user,
        appointmentSchedule: fetchedAppointmentSchedules.find((schedule) => schedule.userId === user.id)?.schedule || '',
      }));

      setAppointmentSchedules(mergedSchedules);
    } catch (error) {
      console.error('Muayene takvimi veri çekme hatası: ', error);
    } finally {
      setApiProgress(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  
  return (
    <div className="card">
      <div className="card-header text-center fs-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Appointment Schedule List</span>
      </div>
      <ul className="list-group list-group-flush">
        {appointmentSchedules
          .filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              selected={user.id === selectedUserId}
              onSelect={() => setSelectedUserId(user.id)}
            />
          ))}
      </ul>
      <div className="card-footer text-center">
        {apiProgress ? <Spinner /> : null}
        {!apiProgress && <button className="btn btn-outline-secondary btn-sm float-start custom-btn">Previous</button>}
        {!apiProgress && <button className="btn btn-outline-secondary btn-sm float-end custom-btn">Next</button>}
      </div>
    </div>
  );
}
