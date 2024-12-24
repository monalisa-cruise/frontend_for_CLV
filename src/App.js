import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [candidates, setCandidates] = useState([]);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetch('https://candidate-list-viewer.onrender.com/api/candidates')
            .then((response) => response.json())
            .then((data) => setCandidates(data));
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSort = () => {
        const sortedCandidates = [...candidates].sort((a, b) => {
            return sortOrder === 'asc'
                ? a.experience - b.experience
                : b.experience - a.experience;
        });
        setCandidates(sortedCandidates);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filteredCandidates = candidates.filter((candidate) =>
        candidate.name.toLowerCase().includes(search.toLowerCase()) ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="App">
            <h1>Candidate List</h1>
            <input
                type="text"
                placeholder="Search by Name or Skills"
                value={search}
                onChange={handleSearch}
            />
            <button onClick={handleSort}>
                Sort by Experience ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Skills</th>
                        <th>Years of Experience</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCandidates.map((candidate) => (
                        <tr key={candidate.id}>
                            <td>{candidate.name}</td>
                            <td>{candidate.skills.join(', ')}</td>
                            <td>{candidate.experience}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
