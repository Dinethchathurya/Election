import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid, ResponsiveContainer
} from 'recharts';
import { Card } from 'react-bootstrap';

const COLORS = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1', '#fd7e14'];

const sampleResults = [
  { name: 'Monasha', party: 'Blue', votes: 32000 },
  { name: 'Kamal', party: 'Green', votes: 27000 },
  { name: 'Nimal', party: 'Red', votes: 15000 },
];

const votingStats = [
  { name: 'Valid Votes', value: 72000 },
  { name: 'Rejected Votes', value: 3000 },
  { name: 'Did Not Vote', value: 25000 },
];

const partyTrend = [
  { year: 2010, Blue: 40000, Green: 25000, Red: 10000 },
  { year: 2015, Blue: 38000, Green: 29000, Red: 12000 },
  { year: 2020, Blue: 42000, Green: 31000, Red: 14000 },
];

const ElectionCharts = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleBarClick = (data) => {
    setSelectedCandidate(data);
  };

  return (
    <div className="row g-4">
      {/* Bar Chart */}
<div className="col-md-6">
  <Card className="p-3 shadow-sm">
    <h5>📊 Results by Candidate</h5>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={sampleResults}
        onClick={({ activeLabel }) =>
          handleBarClick(sampleResults.find(c => c.name === activeLabel))
        }
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="votes">
          {sampleResults.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>

    {selectedCandidate && (
      <div className="mt-3">
        <strong>{selectedCandidate.name}</strong>: {selectedCandidate.votes} votes (
        {(selectedCandidate.votes /
          sampleResults.reduce((a, b) => a + b.votes, 0) *
          100
        ).toFixed(2)}%)
      </div>
    )}
  </Card>
</div>

      {/* Pie Chart */}
      <div className="col-md-6">
        <Card className="p-3 shadow-sm">
          <h5>🟢 Voter Participation</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={votingStats}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {votingStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Line Chart */}
      <div className="col-md-12">
        <Card className="p-3 shadow-sm">
          <h5>📈 Party Trends Over Years</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={partyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Blue" stroke="#007bff" />
              <Line type="monotone" dataKey="Green" stroke="#28a745" />
              <Line type="monotone" dataKey="Red" stroke="#dc3545" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default ElectionCharts;