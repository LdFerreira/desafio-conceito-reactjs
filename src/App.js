import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
      
    })
  },[])


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Novo Repositorio ${Date.now()}`,
      "url": "https://github.com/LdFerreira/desafio-conceito-reactjs",
      "techs": [
        "React"
      ]
    })
    
    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const newRepositories = repositories.filter(
      repository => repository.id !== id
    )

    setRepositories(newRepositories)
  }

  return (
    <div>
      <h1>Conceitos ReactJS</h1>
      <ul data-testid="repository-list">
        {repositories.map(
          repo =>(
            <li key={repo.id}>
              {repo.title}
              
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
          )
        }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
