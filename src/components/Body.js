import React, { useState, useEffect } from 'react';
import send from '../send.png';
import back from '../back.png';


function BodyComponent({selectedGroup,setShowMain}) {
    useEffect(() => {
        setNote('');
        const noteDataSet = JSON.parse(localStorage.getItem('noteData'));
        if(noteDataSet && noteDataSet[selectedGroup.id]) {
            setNoteData(noteDataSet[selectedGroup.id]);
        } else {
            setNoteData([]);
        }
      }, [selectedGroup.id]);

    const [note, setNote] = useState('');
    const [noteData, setNoteData] = useState([]);

    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };

    const handleSendNote = () => {
        const currentDate = new Date().toLocaleDateString(undefined,{
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        const currentTime = new Date().toLocaleTimeString(undefined,{
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
        });
        const currentNoteData = {
            note: note,
            date: currentDate,
            time: currentTime
        };
        const updatedNoteData = [currentNoteData,...noteData];
        setNoteData(updatedNoteData);
        let noteDataSet = JSON.parse(localStorage.getItem('noteData')) || {};
        noteDataSet[selectedGroup.id] = updatedNoteData;
        localStorage.setItem('noteData', JSON.stringify(noteDataSet));
        setNote('');
    };

    return (
        <div>
            { selectedGroup.id.length>0 ? (
            <div className='note-body'>
                <div className='note-body-title'>
                    <img src={back} alt='back' className='back' onClick={() => setShowMain()}/>
                    <div className='circle' style={{ backgroundColor: 'blue', color : 'white' }}>
                    {selectedGroup.name.split(' ')[0].charAt(0).toUpperCase()}{selectedGroup.name.split(' ')[selectedGroup.name.split(' ').length-1].charAt(0).toUpperCase()} 
                    </div>
                    <h3>{selectedGroup.name}</h3>
                </div>
                <div className='note-body-content'>
                    {noteData.map((note) => (
                        <div className='note-body-content-item'>
                            <div className='note-body-content-item-date'>
                                <p>{note.time}</p>
                                <p>{note.date}</p>
                            </div>
                            <div className='note-body-content-item-note'>
                                <p>{note.note}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='add-note'>
                    <textarea
                        value={note}
                        onChange={handleNoteChange}
                        placeholder='Enter note here...'
                    />
                    <img src={send} alt='attach' className='send-note' onClick={handleSendNote}/>
                </div>
            </div>) : (
            <div className='main-not-selected'>
                <div>
                    <h1>Pocket Notes</h1>
                    <p>Send and receive messages without keeping your phone online.
                        Use Pocket Notes n up to 4 linked devices and 1 mobile phone</p>
                </div>
            </div>)}
        </div>
    );
}

export default BodyComponent;
