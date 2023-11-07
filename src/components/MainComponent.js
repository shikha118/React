import React, { useState, useEffect } from 'react';
import BodyComponent from './Body';

function MainComponent() {
  const [showPopup, setShowPopup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupColor, setGroupColor] = useState('#ffffff');
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({id: '', name: '', color: ''});

  const [showMain, setShowMain] = useState(true);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(storedGroups);
  }, []);

  const handleCreateGroup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleGroupColorChange = (e) => {
    setGroupColor(e.target.value);
  };

  const handleCreateButtonClick = () => {
    const group = { id: Math.random().toString(36).substr(2, 20), name: groupName, color: groupColor };
    const updatedGroups = [...groups, group];
    setGroupColor('#ffffff');
    setGroupName('');
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    setShowPopup(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const setShowMainBack = () => {
    setShowMain(true);
  }

  return (
    <div className="container">
      <div className={showMain ? 'sidenav' : 'sidenav display-none'}>
        <div className='project-title'>
            <h2>Pocket Note</h2>
        </div>
        <div className='create-note-group'>
            <button onClick={handleCreateGroup}>
                Create Notes group
            </button>
        </div>
        <div className='show-note-groups'>
          <ul className='group-ul'>
            {groups.map((group) => (
              <li key={group.id} onClick={()=>{setSelectedGroup(group);setShowMain(false)}} className={selectedGroup.id === group.id ? 'active-li' : ''}>
                <div className='circle' style={{ backgroundColor: group.color, color : 'white' }}>
                  {group.name.split(' ')[0].charAt(0).toUpperCase()}
                  {group.name.split(' ')[group.name.split(' ').length-1].charAt(0).toUpperCase()}
                </div>
                <div> <h4>{group.name}</h4></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={showMain ? 'main display-none' : 'main'}>
        <BodyComponent selectedGroup={selectedGroup} setShowMain={setShowMainBack}/>
      </div>
      {showPopup && (
      <div className='popup' onClick={handleClosePopup}>
        <div className='add-notes-group-popup' onClick={stopPropagation}>
          <div className='popup-header'>
            <h2>Create New Notes group</h2>
          </div>
          <div className='popup-body'>       
            <div className='popup-body-input-cont'>
              <div className='popup-input-title'><h2>Group Name</h2></div>
              <div className='popup-body-input'><input type='text' placeholder='Enter your group name....' value={groupName} onChange={handleGroupNameChange} /></div>
            </div>
            <div className='popup-body-input-cont'>
              <div className='popup-input-title'>
                <h2>Choose Color</h2>
              </div>
              <div className='popup-body-clr-inp'>
                <input type='color' value={groupColor} onChange={handleGroupColorChange} />
              </div>
            </div>
          </div>
          <div className='popup-footer'>
            <button className='btn-button' onClick={handleCreateButtonClick}>
              Create
            </button>
          </div>
        </div>
      </div> )}
    </div>
  );
}

export default MainComponent;
