import "./App.css";
import Select from "react-dropdown-select";
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { getAllData, getAllCenter, getAllRooms} from './Actions/dataActions'
import TableContainer from "./TableComponent/TableContainer";

function App() {
  
  const [selectedCenter, setSelectedCenter] = useState({});
  const [selectedRoom, setSelectedRoom] = useState({});

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getAllData);
  const {centers}  = useSelector((state) => state.getAllCenter.centers);
  const { rooms } = useSelector((state) => state.getAllRooms.rooms);
  
  useEffect(()=>{
    dispatch(getAllCenter());
    dispatch(getAllData());
  }, [dispatch]);

  const handleCenterSelect = (val) => {
    setSelectedCenter(val);
    setSelectedRoom({}); //when changing center
    if(!val.length) {
      dispatch(getAllData());
      dispatch(getAllRooms());
    }
    else {
      dispatch(getAllData(val[0].name));
      dispatch(getAllRooms(val[0].name));
    }
  }

  const handleRoomSelect = (val) => {
    setSelectedRoom(val);
    if(!val.length)
    {
      dispatch(getAllData(selectedCenter[0].name));
      dispatch(getAllRooms(selectedCenter[0].name));
    }
    else
    {
      dispatch(getAllData(selectedCenter[0].name,val[0].name));
      dispatch(getAllRooms(selectedCenter[0].name));
    }
  }

  return (
    <div className="App">
      <div className="dropdown">
        <Select
          options={centers}
          labelField="name"
          valueField="id"
          placeholder="Select Center"
          searchable="true"
          handle="true"
          color="#0074D9"
          dropdownHeight="300px"
          onChange={(val) => handleCenterSelect(val)}
          style={{
            width: "250px",
            fontSize: "18px",
            padding: "10px",
            margin: "10px",
            border: "1px solid black",
            borderRadius: "6px",
            boxShadow: "0px 0px 10px #a8c5ff",
          }}
          className="selectBar1"
        />
        <Select
          options={rooms}
          labelField="name"
          valueField="id"
          placeholder="Select room"
          searchable="true"
          handle="true"
          color="#0074D9"
          dropdownHeight="300px"
          onChange={(val) => handleRoomSelect(val)}
          style={{
            width: "250px",
            fontSize: "18px",
            padding: "10px",
            borderRadius: "6px",
            margin: "10px",
            border: "1px solid black",
            boxShadow: "0px 0px 10px #a8c5ff",
          }}
          className="selectBar2"
        />
      </div>

      <TableContainer data={data} />
    
    </div>
  );
}

export default App;
