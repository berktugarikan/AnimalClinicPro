import { Spinner } from "@/shared/components/Spinner";
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    firstname: "",
    surname: "",
    email: "",
    phone: ""
    // Diğer gerekli alanları buraya ekleyebilirsiniz
  });

  const role = localStorage.getItem('role'); // Rolü local storage'dan al
  if (role === 'ROLE_CUSTOMER') {
    alert('Access Denied');
    return null; // Erişim engellendi, bileşeni render etme
  }

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const clinicId = localStorage.getItem("clinicId"); // Local storage'dan clinic ID'yi al
      const response = await axios.get(`http://localhost:8080/api/users/customers`, {
        params: {
          clinicId: clinicId || undefined, // Clinic ID'yi query parametresi olarak ekle (eğer varsa)
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

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const editUser = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
    // Kullanıcı bilgilerini almak için istek oluştur
    fetchUserData(userId);
  };

  const deleteUser = async (userId) => {
    axios.delete(`http://localhost:8080/api/users/${userId}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then(response => {
        if (response.status === 204) {
          setUsers(users.filter(user => user.id !== userId));
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      })

  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
      setSelectedUserData(response.data);
      setUpdateData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
    setSelectedUserData(null);
  };

  const filteredUsers = currentUsers.filter(
    (user) =>
      user?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateUser = async () => {
    const { id, ...updatedUser } = updateData;
    await axios.put(`http://localhost:8080/api/users/${selectedUserId}`, updatedUser)
      .then(response => {
        if (response.status === 200) {
          getUsers();
          closeModal();
        }
      })
      .catch(error => {
        console.error('Error updating user:', error);
      })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value
    });
  };

  return (
    <div className="card" style={{ width: "100%" }} >
      <div className="card-header text-center fs-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>User List</span>
        <div style={{ marginLeft: 'auto' }}>
          <input
            type="text"
            placeholder="Search Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '185px', height: '30px', padding: '5px', fontSize: '15px' }}
          />
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name-Surname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>        
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Spinner />
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.firstname} {user.surname}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td> {/* Telefon numarasını yazdır */}
                <td style={{ display: 'flex', gap: '5px' }}>
                  <button className="btn btn-primary" onClick={() => editUser(user.id)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            style={{ margin: '0 5px' }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {selectedUserData && (
                  <>
                    <div className="form-group">
                      <label htmlFor="firstname">First Name</label>
                      <input type="text" className="form-control" id="firstname" name="firstname" value={updateData.firstname} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="surname">Surname</label>
                      <input type="text" className="form-control" id="surname" name="surname" value={updateData.surname} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="form-control" id="email" name="email" value={updateData.email} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input type="text" className="form-control" id="phone" name="phone" value={updateData.phone} onChange={handleInputChange} /> {/* Telefon numarası giriş alanı */}
                    </div>
                    {/* Diğer gerekli alanları buraya ekleyebilirsiniz */}
                    <button type="button" className="btn btn-primary" onClick={updateUser}>Update</button>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
