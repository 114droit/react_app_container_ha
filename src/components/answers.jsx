import '../App.css'
import { useState } from 'react'

function Answers() {
    const [answer, setAnswer] = useState('')

    return (
        <div className="grid grid-cols-2 gap-4 mt-4">
        <button className="flex justify-center items-center bg-gray-700 border rounded-sm">Antwort A</button>
        </div>
    );
};

export default Answers