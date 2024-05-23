import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Dashboard(props) {

  const navigate = useNavigate();

  const [respons, setResponse] = useState([]);
  const [errmsg, setErrMsg] = useState('');
  const [data, setData] = useState({
    SourceCity: '',
    DestinationCity: '',
    TravelDate: '',
    ClassType: ''
  });
  const handleData = (e) => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(data));
  // }, [data]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/train/search', data);
      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      console.log(error);
      setErrMsg(error?.response?.data?.message)
    }
  };

  const handleBookNow = () => {
    console.log('hiiii');
    navigate("/booking");
    localStorage.setItem("filterData", JSON.stringify(data));
    localStorage.setItem("ResponseData", JSON.stringify(respons.trains[0]));
  }

  return (
    <div className='dashboard'>
      <div className='filter'>
        <h2>Search Train</h2>
        <form className='form' onSubmit={handleSearch}>
          <div className='col'>
            <label>From</label>
            <input type='text' name='SourceCity' onChange={handleData} />
          </div>
          <div className='col'>
            <label>To</label>
            <input type='text' name='DestinationCity' onChange={handleData} />
          </div>
          <div className='col'>
            <label>Date</label>
            <input type='date' name='TravelDate' id='tavelDate' onChange={handleData} />
          </div>
          <div className='col'>
            <label>Class</label>
            <select name='ClassType' onChange={handleData}>
              <option>Select Class</option>
              <option value="Sleeper" >Sleeper</option>
              <option value="AC First Class" >AC First Class</option>
              <option value="AC 2 Tier">AC 2 Tier</option>
            </select>
          </div>
          <div className='col btn'>
            <button type='submit'>Search</button>
          </div>
        </form>
      </div>
      <div className='listTrain'>
        
        {respons?.trains?.length > 0 ? (
        respons?.trains?.map((train) => (
          <ul key={train.trainID}>
            <li>
              <div className='coloumn'>
                <label>Train Number:</label> <span>{train.TrainID}</span>
              </div>
              <div className='coloumn'>
                <label>Train Name:</label> <span>{train.TrainName}</span>
              </div>
              <div className='coloumn'>
                <label>Train Fare:</label> <span>{train.Fare}</span>
              </div>
              <div className='coloumn'>
                <label>Available Seats:</label> <span>{train.AvailableSeats}</span>
              </div>
              <div className='coloumn'>
                <label></label> <span>
                  <button onClick={handleBookNow} type='submit'>Book Now</button>
                </span>
              </div>
            </li>
          </ul>
          ))
        ) : (
          <p className='errormsg' >{errmsg}</p>
        )
        }
      </div>
    </div>
  )
}
