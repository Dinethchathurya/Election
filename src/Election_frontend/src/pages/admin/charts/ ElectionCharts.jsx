// import React, { useState } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell,
//   LineChart, Line, CartesianGrid, ResponsiveContainer
// } from 'recharts';
// import { Card } from 'react-bootstrap';

// const COLORS = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1', '#fd7e14'];

// const sampleResults = [
//   { name: 'Monasha', party: 'Blue', votes: 32000 },
//   { name: 'Kamal', party: 'Green', votes: 27000 },
//   { name: 'Nimal', party: 'Red', votes: 15000 },
// ];

// const votingStats = [
//   { name: 'Valid Votes', value: 72000 },
//   { name: 'Rejected Votes', value: 3000 },
//   { name: 'Did Not Vote', value: 25000 },
// ];

// const partyTrend = [
//   { year: 2010, Blue: 40000, Green: 25000, Red: 10000 },
//   { year: 2015, Blue: 38000, Green: 29000, Red: 12000 },
//   { year: 2020, Blue: 42000, Green: 31000, Red: 14000 },
// ];

// const ElectionCharts = () => {
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   const handleBarClick = (data) => {
//     setSelectedCandidate(data);
//   };

//   return (
//     <div className="row g-4">
//       {/* Bar Chart */}
// <div className="col-md-6">
//   <Card className="p-3 shadow-sm">
//     <h5>📊 Results by Candidate</h5>
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart
//         data={sampleResults}
//         onClick={({ activeLabel }) =>
//           handleBarClick(sampleResults.find(c => c.name === activeLabel))
//         }
//       >
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="votes">
//           {sampleResults.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Bar>
//       </BarChart>
//     </ResponsiveContainer>

//     {selectedCandidate && (
//       <div className="mt-3">
//         <strong>{selectedCandidate.name}</strong>: {selectedCandidate.votes} votes (
//         {(selectedCandidate.votes /
//           sampleResults.reduce((a, b) => a + b.votes, 0) *
//           100
//         ).toFixed(2)}%)
//       </div>
//     )}
//   </Card>
// </div>

//       {/* Pie Chart */}
//       <div className="col-md-6">
//         <Card className="p-3 shadow-sm">
//           <h5>🟢 Voter Participation</h5>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={votingStats}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={100}
//                 fill="#8884d8"
//                 label
//               >
//                 {votingStats.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </Card>
//       </div>

//       {/* Line Chart */}
//       <div className="col-md-12">
//         <Card className="p-3 shadow-sm">
//           <h5>📈 Party Trends Over Years</h5>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={partyTrend}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="year" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="Blue" stroke="#007bff" />
//               <Line type="monotone" dataKey="Green" stroke="#28a745" />
//               <Line type="monotone" dataKey="Red" stroke="#dc3545" />
//             </LineChart>
//           </ResponsiveContainer>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ElectionCharts;




// import React, { useEffect, useState } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell,
//   LineChart, Line, CartesianGrid, ResponsiveContainer
// } from 'recharts';
// import { Card } from 'react-bootstrap';
// import { Election_backend } from 'declarations/Election_backend';
// import { Principal } from '@dfinity/principal';

// const COLORS = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1', '#fd7e14'];

// const ElectionCharts = () => {
//   const [topCandidates, setTopCandidates] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   useEffect(() => {
//     const fetchTopThree = async () => {
//       try {
//         const storedElectionId = localStorage.getItem("electionId") || "a4tbr-q4aaa-aaaaa-qaafq-cai";
//         const electionId = Principal.fromText(storedElectionId);
//         const allCandidates = await Election_backend.getAllResults(electionId);

//         const sortedByFirstChoice = [...allCandidates].sort((a, b) => Number(b.voteCountAsFirstChoice) - Number(a.voteCountAsFirstChoice));

//         const topThree = sortedByFirstChoice.slice(0, 3).map(c => ({
//           name: c.name,
//           party: c.hisParty,
//           votes: Number(c.voteCountAsFirstChoice),
//         }));

//         setTopCandidates(topThree);
//       } catch (error) {
//         console.error("Error loading chart data:", error);
//       }
//     };

//     fetchTopThree();
//   }, []);

//   const handleBarClick = (data) => {
//     setSelectedCandidate(data);
//   };

//   return (
//     <div className="row g-4">
//       {/* Bar Chart */}
//       <div className="col-md-6">
//         <Card className="p-3 shadow-sm">
//           <h5>📊 Results by Candidate (Top 3 First Choice)</h5>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart
//               data={topCandidates}
//               onClick={({ activeLabel }) =>
//                 handleBarClick(topCandidates.find(c => c.name === activeLabel))
//               }
//             >
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="votes">
//                 {topCandidates.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>

//           {selectedCandidate && (
//             <div className="mt-3">
//               <strong>{selectedCandidate.name}</strong>: {selectedCandidate.votes} votes (
//               {(selectedCandidate.votes /
//                 topCandidates.reduce((a, b) => a + b.votes, 0) *
//                 100
//               ).toFixed(2)}%)
//             </div>
//           )}
//         </Card>
//       </div>

//       {/* Pie Chart */}
//       <div className="col-md-6">
//         <Card className="p-3 shadow-sm">
//           <h5>🟢 Voter Participation</h5>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={[
//                   { name: 'Valid Votes', value: 72000 },
//                   { name: 'Rejected Votes', value: 3000 },
//                   { name: 'Did Not Vote', value: 25000 },
//                 ]}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={100}
//                 fill="#8884d8"
//                 label
//               >
//                 {COLORS.map((color, index) => (
//                   <Cell key={index} fill={color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </Card>
//       </div>

//       {/* Line Chart */}
//       <div className="col-md-12">
//         <Card className="p-3 shadow-sm">
//           <h5>📈 Party Trends Over Years</h5>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart
//               data={[
//                 { year: 2010, Blue: 40000, Green: 25000, Red: 10000 },
//                 { year: 2015, Blue: 38000, Green: 29000, Red: 12000 },
//                 { year: 2020, Blue: 42000, Green: 31000, Red: 14000 },
//               ]}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="year" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="Blue" stroke="#007bff" />
//               <Line type="monotone" dataKey="Green" stroke="#28a745" />
//               <Line type="monotone" dataKey="Red" stroke="#dc3545" />
//             </LineChart>
//           </ResponsiveContainer>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ElectionCharts;









// import React, { useEffect, useState } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell,
//   LineChart, Line, CartesianGrid, ResponsiveContainer
// } from 'recharts';
// import { Card } from 'react-bootstrap';
// import { Election_backend } from 'declarations/Election_backend';
// import { Principal } from '@dfinity/principal';

// const COLORS = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1', '#fd7e14'];

// const ElectionCharts = () => {
//   const [topCandidates, setTopCandidates] = useState([]);
//   const [topFivePieData, setTopFivePieData] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   useEffect(() => {
//     const fetchTopCandidates = async () => {
//       try {
//         const storedElectionId = localStorage.getItem("electionId") || "a4tbr-q4aaa-aaaaa-qaafq-cai";
//         const electionId = Principal.fromText(storedElectionId);
//         const allCandidates = await Election_backend.getAllResults(electionId);

//         const sorted = [...allCandidates].sort(
//           (a, b) => Number(b.voteCountAsFirstChoice) - Number(a.voteCountAsFirstChoice)
//         );

//         // Top 3 for bar chart
//         const topThree = sorted.slice(0, 3).map(c => ({
//           name: c.name,
//           party: c.hisParty,
//           votes: Number(c.voteCountAsFirstChoice),
//         }));
//         setTopCandidates(topThree);

//         // Top 5 for pie chart
//         const topFive = sorted.slice(0, 5).map(c => ({
//           name: c.name,
//           value: Number(c.voteCountAsFirstChoice),
//         }));
//         setTopFivePieData(topFive);

//       } catch (error) {
//         console.error("Error loading chart data:", error);
//       }
//     };

//     fetchTopCandidates();
//   }, []);

//   const handleBarClick = (data) => {
//     setSelectedCandidate(data);
//   };

//   return (
//     <div className="row g-4">
//       {/* Bar Chart */}
//       <div className="col-md-6">
//         <Card className="p-3 shadow-sm">
//           <h5>📊 Results by Candidate (Top 3 First Choice)</h5>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart
//               data={topCandidates}
//               onClick={({ activeLabel }) =>
//                 handleBarClick(topCandidates.find(c => c.name === activeLabel))
//               }
//             >
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="votes">
//                 {topCandidates.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>

//           {selectedCandidate && (
//             <div className="mt-3">
//               <strong>{selectedCandidate.name}</strong>: {selectedCandidate.votes} votes (
//               {(selectedCandidate.votes /
//                 topCandidates.reduce((a, b) => a + b.votes, 0) *
//                 100
//               ).toFixed(2)}%)
//             </div>
//           )}
//         </Card>
//       </div>

//       {/* Pie Chart */}
//       <div className="col-md-6">
//         <Card className="p-3 shadow-sm">
//           <h5>🥧 First Choice Vote Share (Top 5)</h5>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={topFivePieData}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={100}
//                 fill="#8884d8"
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
//               >
//                 {topFivePieData.map((_, index) => (
//                   <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </Card>
//       </div>

//       {/* Line Chart */}
//       <div className="col-md-12">
//         <Card className="p-3 shadow-sm">
//           <h5>📈 Party Trends Over Years</h5>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart
//               data={[
//                 { year: 2010, Blue: 40000, Green: 25000, Red: 10000 },
//                 { year: 2015, Blue: 38000, Green: 29000, Red: 12000 },
//                 { year: 2020, Blue: 42000, Green: 31000, Red: 14000 },
//               ]}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="year" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="Blue" stroke="#007bff" />
//               <Line type="monotone" dataKey="Green" stroke="#28a745" />
//               <Line type="monotone" dataKey="Red" stroke="#dc3545" />
//             </LineChart>
//           </ResponsiveContainer>
//         </Card>
//       </div>

//       <div>
//         <BarChart data={candidatesData}>
//   <CartesianGrid strokeDasharray="3 3" />
//   <XAxis dataKey="name" />
//   <YAxis />
//   <Tooltip />
//   <Legend />
//   <Bar dataKey="first" stackId="a" fill="#007bff" />
//   <Bar dataKey="second" stackId="a" fill="#28a745" />
//   <Bar dataKey="third" stackId="a" fill="#dc3545" />
// </BarChart>
//       </div>
//     </div>
//   );
// };

// export default ElectionCharts;

import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell,
  CartesianGrid, ResponsiveContainer
} from 'recharts';
import { Card } from 'react-bootstrap';
import { Election_backend } from 'declarations/Election_backend';
import { Principal } from '@dfinity/principal';

const COLORS = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1', '#fd7e14'];

const ElectionCharts = () => {
  const [topCandidates, setTopCandidates] = useState([]);
  const [topFivePieData, setTopFivePieData] = useState([]);
  const [candidatesData, setCandidatesData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedElectionId = localStorage.getItem("electionId") || "a4tbr-q4aaa-aaaaa-qaafq-cai";
        const electionId = Principal.fromText(storedElectionId);
        const allCandidates = await Election_backend.getAllResults(electionId);

        const enriched = allCandidates.map(c => ({
          name: c.name,
          party: c.hisParty,
          first: Number(c.voteCountAsFirstChoice),
          second: Number(c.voteCountAsSecondChoice),
          third: Number(c.voteCountAsThirdChoice),
          total: Number(c.voteCountAsFirstChoice) + Number(c.voteCountAsSecondChoice) + Number(c.voteCountAsThirdChoice)
        }));

        const sorted = [...enriched].sort((a, b) => b.first - a.first);
        const topThree = sorted.slice(0, 3).map(c => ({ name: c.name, party: c.party, votes: c.first }));
        const topFive = sorted.slice(0, 5).map(c => ({ name: c.name, value: c.first }));

        setTopCandidates(topThree);
        setTopFivePieData(topFive);
        setCandidatesData(enriched);
      } catch (error) {
        console.error("Error loading chart data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBarClick = (data) => {
    setSelectedCandidate(data);
  };

  return (
    <div className="row g-4">
      {/* Bar Chart */}
      <div className="col-md-6">
        <Card className="p-3 shadow-sm">
          <h5>📊 Results by Candidate (Top 3 First Choice)</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topCandidates}
              onClick={({ activeLabel }) =>
                handleBarClick(topCandidates.find(c => c.name === activeLabel))
              }
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="votes">
                {topCandidates.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {selectedCandidate && (
            <div className="mt-3">
              <strong>{selectedCandidate.name}</strong>: {selectedCandidate.votes} votes (
              {(selectedCandidate.votes /
                topCandidates.reduce((a, b) => a + b.votes, 0) *
                100
              ).toFixed(2)}%)
            </div>
          )}
        </Card>
      </div>

      {/* Pie Chart */}
      <div className="col-md-6">
        <Card className="p-3 shadow-sm">
          <h5>🥧 First Choice Vote Share (Top 5)</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topFivePieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {topFivePieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Vote Breakdown Chart */}
      <div className="col-md-12">
        <Card className="p-3 shadow-sm">
          <h5>🏋️ Vote Breakdown by Candidate</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={candidatesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="first" stackId="a" fill="#007bff" />
              <Bar dataKey="second" stackId="a" fill="#28a745" />
              <Bar dataKey="third" stackId="a" fill="#dc3545" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default ElectionCharts;
