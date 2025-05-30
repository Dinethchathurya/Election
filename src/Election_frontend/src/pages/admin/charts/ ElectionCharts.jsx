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
