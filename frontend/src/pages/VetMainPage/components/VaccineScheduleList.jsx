import { useEffect, useState } from "react";

// Simüle edilmiş LoadUsers fonksiyonu
const LoadUsers = async () => {
  // Simüle edilmiş kullanıcı verisi
  const fakeUserData = [
    { id: 1, username: "User1" },
    { id: 2, username: "User2" },
    { id: 3, username: "User3" },
    // Diğer kullanıcılar...
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: fakeUserData });
    }, 1000); // 1 saniye sonra cevap döndürüldüğünü varsayalım
  });
};

export function VaccineScheduleList() {
  const [vaccineSchedule, setVaccineSchedule] = useState([]);

  useEffect(() => {
    async function getVaccineSchedule() {
      // Aşı takvimi verilerini yüklemek için LoadUsers fonksiyonunu kullanalım
      const response = await LoadUsers();
      setVaccineSchedule(response.data);
    }

    getVaccineSchedule();
  }, []);

  return (
    <>
      <div>Aşı Takvimi</div>
      {vaccineSchedule.map((user) => (
        <div key={user.id}>{user.username}'s Aşı Takvimi</div>
      ))}
    </>
  );
}
