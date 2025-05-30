const ResultPage = () => {
  return (
    <div className="mt-4">
      <h2 className="text-center">Election Results</h2>
      <p className="fw-bold">Live Update - 2024</p>

      <div className="results-container d-flex flex-wrap gap-4 justify-content-center">

        <div className="result-card p-3 text-center" style={{ border: '2px solid #A9DFBF' }}>
          <div className="result-badge text-white p-2 rounded" style={{ backgroundColor: '#229954' }}>
            1,112,567
          </div>
          <div className="candidate-circle my-2">
            <div className="rank-badge" style={{ backgroundColor: '#f5b041' }}>1</div>
          </div>
          <h5 className="fw-bold mt-2">Candidate 1</h5>
          <p>Political party: Green</p>
          <div className="see-more text-primary">See More</div>
        </div>

        <div className="result-card p-3 text-center" style={{ border: '2px solid #A9C9F2' }}>
          <div className="result-badge text-white p-2 rounded" style={{ backgroundColor: '#154360' }}>
            1,112,567
          </div>
          <div className="candidate-circle my-2">
            <div className="rank-badge" style={{ backgroundColor: '#f5b041' }}>2</div>
          </div>
          <h5 className="fw-bold mt-2">Candidate 2</h5>
          <p>Political party: Blue</p>
          <div className="see-more text-primary">See More</div>
        </div>

        <div className="result-card p-3 text-center" style={{ border: '2px solid #f9c6d3' }}>
          <div className="result-badge text-white p-2 rounded" style={{ backgroundColor: '#d81b60' }}>
            1,112,567
          </div>
          <div className="candidate-circle my-2">
            <div className="rank-badge" style={{ backgroundColor: '#f5b041' }}>3</div>
          </div>
          <h5 className="fw-bold mt-2">Candidate 3</h5>
          <p>Political party: Z</p>
          <div className="see-more text-primary">See More</div>
        </div>

        <div className="result-card p-3 text-center" style={{ border: '2px solid #a9d6e5' }}>
          <div className="result-badge text-white p-2 rounded" style={{ backgroundColor: '#117a8b' }}>
            1,112,567
          </div>
          <div className="candidate-circle my-2">
            <div className="rank-badge" style={{ backgroundColor: '#f5b041' }}>4</div>
          </div>
          <h5 className="fw-bold mt-2">Candidate 4</h5>
          <p>Political party: T</p>
          <div className="see-more text-primary">See More</div>
        </div>

      </div>
    </div>
  );
};

export default ResultPage;