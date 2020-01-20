import React from 'react';

import './styles.css';

function DevItem({ dev, onDelete, onUpdate }) {

    async function handleDeleteDev(e) {
        e.preventDefault()
        await onDelete(dev._id)
    }

    function handleUpdateDev(e) {
        e.preventDefault()
        onUpdate(dev)
    }

    return(
        <li className="dev-item">
            <div className="details-group">
                <header>
                <img src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
                </header>
                <p>{dev.bio}</p>
                <a href={`https://github.com/${dev.github_username}`} target="_blank" rel="noopener noreferrer">Acessar perfil no Github</a> 
            </div>
            <div className="button-group">
                <button type="submit" onClick={handleDeleteDev}>Deletar</button>
                <button type="submit" onClick={handleUpdateDev}>Alterar</button>
            </div>
            <div className="id">
                <span>{dev._id}</span>
            </div>
        </li>
    );
}

export default DevItem;