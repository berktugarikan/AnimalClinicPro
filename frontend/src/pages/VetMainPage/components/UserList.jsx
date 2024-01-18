import { Spinner } from "@/shared/components/Spinner";
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { colors } from "@mui/material";

export function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/users`);
      console.log(response.data); // Veriyi konsolda kontrol et
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers(); // Sayfa yüklendiğinde ilk çağrıyı yap
  }, [getUsers]);

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Şu anki sayfadaki kullanıcıları al
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="card">
      <div className="card-header text-center fs-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>User List</span>
        <div style={{ marginLeft: 'auto' }}>
          <input
            type="text"
            placeholder="Search Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '185px', height: '30px' }}
          />
        </div>
      </div>
      <ul style={{backgroundColor: 'white'}} className="list-group list-group-flush">
        {loading ? (
          <Spinner />
        ) : currentUsers.length > 0 ? (
          currentUsers
            .filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((user) => (
              <li key={user.id}>
                {/* Buraya UserListItem ile ilgili içeriği ekleyebilirsiniz */}
                <p>
                  <strong>Name-Surname:</strong> {user.firstname} {user.surname}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <hr />
              </li>
            ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
      {/* Sayfa sayısına göre navigasyon düğmeleri ekleyin */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={{ margin: '0 5px', cursor: 'pointer', padding: '5px 10px', backgroundColor: currentPage === index + 1 ? 'lightblue' : 'white' }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
