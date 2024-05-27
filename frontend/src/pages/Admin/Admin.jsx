import { Spinner } from "@/shared/components/Spinner";
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role'); // Rolü local storage'dan al
    if (role !== 'ROLE_ADMIN') {
      alert('Access Denied');
      navigate('/vetmainpage'); // Erişim engellendiğinde ana sayfaya yönlendir
    } else {
      getUsers(); // Rolü admin ise kullanıcıları getir
    }
  }, []);

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const clinicId = localStorage.getItem("clinicId");
      const token = localStorage.getItem("token");

      if (!clinicId) {
        console.error("Clinic ID is not found in localStorage.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/users/clinic/${clinicId}/customers-and-vets`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          clinicId: clinicId,
        }
      });

      if (response.data.length > 0) {
        const reversedData = response.data.reverse();
        setUsers(reversedData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserRole = async (username, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/users/role/${username}`,
        { role: newRole },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      getUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Admin Page</h1>
      <div className="row">
        <div className="col">
          {loading ? (
            <Spinner />
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.username}>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => updateUserRole(user.username, 'ROLE_VETERINARIAN')}
                      >
                        Upgrade Role
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => updateUserRole(user.username, 'ROLE_CUSTOMER')}
                      >
                        Downgrade Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
