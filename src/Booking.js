import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Booking() {

    const [inputItem, setInputItem] = useState({
        PassengerName: '',
        Age: 0,
        Gender: ''
    });

    const [items22, setItems] = useState({
        SourceCity: '',
        DestinationCity: '',
        TravelDate: '',
        ClassType: '',
        TrainID:'',
        TrainName:'',
        Fare:'',
        AvailableSeats:'',
        UserID: '',
        BookingDate:'',
        Passengers:[]
    });


    // Current Date 

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    console.log(formattedDate, 'bookingDate');

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('filterData'));
        const items2 = JSON.parse(localStorage.getItem('ResponseData'));
        const item3 = JSON.parse(localStorage.getItem('userId'));
        console.log(item3,'itemmmm')
        console.log(items, items2, 'itemsss')
        if (items && items2) {
         setItems({
            SourceCity:items?.SourceCity, 
            DestinationCity:items?.DestinationCity, 
            TravelDate:items?.TravelDate, 
            ClassType:items?.ClassType, 
            TrainID:items2?.TrainID,
            TrainName:items2.TrainName,
            Fare:items2.Fare,
            AvailableSeats:items2.AvailableSeats,
            UserID:item3,
            BookingDate:formattedDate,
            Passengers: []
        });
        }
      }, []);

      console.log(items22.UserID, 'merge two object from get local storage')


    const handleData = (e) => {

        const {name, value} = e.target;
        setInputItem((PrevState => ({
            ...PrevState,
            [name]:value
        })
        ))
        console.log(name,value , 'dataaa')
    }

    const handleBooking = async (e) => {
        e.preventDefault();
        
        try {
            // Create a new passenger object from inputItem state
            const newPassenger = {
                PassengerName: inputItem.PassengerName,
                Age: inputItem.Age,
                Gender: inputItem.Gender
            };
    
            // Update Passengers array in items22 state with the new passenger
            setItems(prevState => ({
                ...prevState,
                Passengers: [...prevState.Passengers, newPassenger]
            }));

            console.log(items22, 'allItem');
    
            // Send POST request with updated items22 state
            const response = await axios.post('http://localhost:3001/booking',  items22 );
            console.log(response,"itemmmmsss")
            console.log('response1', response);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }
    
    

   
    console.log(inputItem, 'inputItem');


    
  return (
    <div>
        <div className='booking'>
            
            <form className='form formHorizental' onSubmit={handleBooking} >
                <h2>Booking Ticket</h2>
                <div className='bookingInfo'>
                <ul>
                    <li>
                        <label>Train Number</label>
                        <span>{items22.TrainID}</span>
                    </li>
                    <li>
                        <label>Train Name</label>
                        <span>{items22.TrainName}</span>
                    </li>
                    <li>
                        <label>Boarding Station</label>
                        <span>{items22.SourceCity}</span>
                    </li>
                    <li>
                        <label>Destination Station</label>
                        <span>{items22.DestinationCity}</span>
                    </li>
                    <li>
                        <label>Booking Data</label>
                        <span>{formattedDate}</span>
                    </li>
                </ul>
            </div>
                <div className='bookingForm'>
                <div className='col'>
                    <label>Passenger Name</label>
                    <input type='text' name='PassengerName' onChange={handleData} />
                </div>
                <div className='col'>
                    <label>Age</label>
                    <input type='number' name='Age' onChange={handleData} />
                </div>
                <div className='col'>
                    <label>Gender</label>
                    <div className='radioGroup' >
                        <div className="radio">
                            <input id="gender" name="Gender" type="radio" value="M" onChange={handleData} />
                            <label htmlFor="gender">Male</label>
                        </div>
                        <div className="radio">
                            <input id="gender2" name="Gender" type="radio" value="F" onChange={handleData} />
                            <label htmlFor="gender2">Female</label>
                        </div>
                    </div>
                </div>

                <div className='col'>
                    <label></label>
                    <button type='submit'>Book Now</button>
                </div>

                </div>
            </form>
        </div>
    </div>
  )
}
