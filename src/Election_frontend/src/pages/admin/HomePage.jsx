import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchElections } from '../../store/electionSlice'; // ✅ Correct if file is there
import ElectionCharts from './charts/ ElectionCharts';


const HomePage = () => {

  const dispatch = useDispatch();
  const { elections, loading, error } = useSelector(state => state.elections);

  useEffect(() => {
    dispatch(fetchElections());
  }, [dispatch]);


  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div>
        <br></br>
        <h1>Election</h1>
        {loading && <p>Loading elections...</p>}
        {error && <p>Error: {error}</p>}
        <ul>
          {elections.map((election) => (
            <li key={election.id}>{election.name}</li>
          ))}
        </ul>
      </div>
      <br></br>

       <ElectionCharts />

      <h2 className="mt-5 mb-3">📋 Sample Election Data Table</h2>
<div className="table-responsive">
  <table className="table table-bordered table-hover table-striped align-middle text-center shadow-sm rounded">
    <thead className="table-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Type</th>
        <th scope="col">Description</th>
        <th scope="col">Tag</th>
      </tr>
    </thead>
    <tbody className="table-group-divider">
            <tr>
              <td>1,001</td>
              <td>random</td>
              <td>data</td>
              <td>placeholder</td>
              <td>text</td>
            </tr>
            <tr>
              <td>1,002</td>
              <td>placeholder</td>
              <td>irrelevant</td>
              <td>visual</td>
              <td>layout</td>
            </tr>
            <tr>
              <td>1,003</td>
              <td>data</td>
              <td>rich</td>
              <td>dashboard</td>
              <td>tabular</td>
            </tr>
            <tr>
              <td>1,003</td>
              <td>information</td>
              <td>placeholder</td>
              <td>illustrative</td>
              <td>data</td>
            </tr>
            <tr>
              <td>1,004</td>
              <td>text</td>
              <td>random</td>
              <td>layout</td>
              <td>dashboard</td>
            </tr>
            <tr>
              <td>1,005</td>
              <td>dashboard</td>
              <td>irrelevant</td>
              <td>text</td>
              <td>placeholder</td>
            </tr>
            <tr>
              <td>1,006</td>
              <td>dashboard</td>
              <td>illustrative</td>
              <td>rich</td>
              <td>data</td>
            </tr>
            <tr>
              <td>1,007</td>
              <td>placeholder</td>
              <td>tabular</td>
              <td>information</td>
              <td>irrelevant</td>
            </tr>
            <tr>
              <td>1,008</td>
              <td>random</td>
              <td>data</td>
              <td>placeholder</td>
              <td>text</td>
            </tr>
            <tr>
              <td>1,009</td>
              <td>placeholder</td>
              <td>irrelevant</td>
              <td>visual</td>
              <td>layout</td>
            </tr>
            <tr>
              <td>1,010</td>
              <td>data</td>
              <td>rich</td>
              <td>dashboard</td>
              <td>tabular</td>
            </tr>
            <tr>
              <td>1,011</td>
              <td>information</td>
              <td>placeholder</td>
              <td>illustrative</td>
              <td>data</td>
            </tr>
            <tr>
              <td>1,012</td>
              <td>text</td>
              <td>placeholder</td>
              <td>layout</td>
              <td>dashboard</td>
            </tr>
            <tr>
              <td>1,013</td>
              <td>dashboard</td>
              <td>irrelevant</td>
              <td>text</td>
              <td>visual</td>
            </tr>
            <tr>
              <td>1,014</td>
              <td>dashboard</td>
              <td>illustrative</td>
              <td>rich</td>
              <td>data</td>
            </tr>
            <tr>
              <td>1,015</td>
              <td>random</td>
              <td>tabular</td>
              <td>information</td>
              <td>text</td>
            </tr>
    </tbody>
  </table>
</div>
    </main>
  );
};
export default HomePage;
