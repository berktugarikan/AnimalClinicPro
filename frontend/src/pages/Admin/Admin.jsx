import { Spinner } from "@/shared/components/Spinner";
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const clinicId = localStorage.getItem("clinicId");
      const response = await axios.get(`http://localhost:8080/api/users`, {
        params: {
          clinicId: clinicId || undefined,
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

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const updateUserRole = async (username, newRole) => {
    try {
      await axios.put(`http://localhost:8080/api/users/role/${username}`, { role: newRole });
      // Kullanıcı rolleri güncellendikten sonra tekrar kullanıcıları getir
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
