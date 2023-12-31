import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PetCard = () => {
  const [petData, setPetData] = useState({});

  useEffect(() => {
    // Mock bir API'dan veri çekme işlemi
    // Bu kısmı gerçek bir veritabanı ile değiştirmeniz gerekir
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((data) => setPetData(data));
  }, []);

  const handleChoose = () => {
    // Burada "choose" butonuna tıklandığında yapılacak işlemleri ekleyebilirsiniz.
    // Örneğin, bir fonksiyon çağırabilir veya başka bir sayfaya yönlendirebilirsiniz.
    console.log('Pet chosen:', petData);
  };

  return (
    <Card  sx={{ maxWidth: '500px', backgroundColor: '#c3dfd6', borderRadius: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <CardContent>
        <Typography variant="h6" color="#004d40" gutterBottom>
          Username: {petData.username}
        </Typography>
        <Typography  variant="h6" color="#004d40" gutterBottom>
          Pet Name: {petData.petName}
        </Typography>
        <Typography  variant="h6" color="#004d40" gutterBottom>
          Pet Type: {petData.petType}
        </Typography>
      </CardContent>
      <CardActions>
      <button style={{ color: '#ffffff', backgroundColor: '#6c9286',borderRadius:'15px' }} onClick={handleChoose}>Choose</button>

      </CardActions>
    </Card>
  );
};

export default PetCard;
