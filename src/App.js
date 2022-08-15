import {useState, useEffect} from 'react'
import Note from "./components/Note"
import noteService from "./services/notes"
import axios from 'axios'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }
  useEffect(hook, [])
  

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote, 
      date: new Date(), 
      important: Math.random() < 0.5, 
      id: notes.length + 1,
    }
  
    console.log(noteObject)

  axios
    .create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote.data))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(`the note '${note.content}' was already deleted from the server`)
      })
      setNotes(notes.filter(n => n.id !== id))
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      <ul>
        {notesToShow.map(n => <Note key={n.id} note={n} toggleImportance={() => toggleImportanceOf(n.id)}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App; 