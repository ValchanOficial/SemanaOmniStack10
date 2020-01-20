import React, { useState, useEffect } from 'react';
import api from './services/api';

import './Global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './component/DevForm';
import DevItem from './component/DevItem';

function App() {
  const modal = document.getElementById('updateModal')

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(params) {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);
  }

  async function handleDeleteDev(id) {
    const response = await api.delete(`/devs/${id}`);
    if(response.status === 202){
      setDevs(devs.filter(d => d._id !== id));
    }
  }

  async function handleUpdateDev(dev) {
    const input = document.getElementById('editTech')
    input.value = dev.techs.map(tech => tech+", ")
    modal.style.display = 'block'

    console.log(dev);
    console.log("aaaaaaaaaaaaaaaaaa");
    const response = await api.put(`/devs/${dev._id}`);
    console.log(response)
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} onDelete={handleDeleteDev} onUpdate={handleUpdateDev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
