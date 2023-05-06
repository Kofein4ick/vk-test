import {useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from "react-toastify";

import {Form,Container,Card, Button} from 'react-bootstrap';
//Заполнение селектора выбора этажа
function FloorSelect({handler}){
  let temp=[];
  for(let i=3;i<=27;i++){
    temp.push(<option key={'floor-'+i} value={i}>{i}</option>);
  }
  return <Form.Select onChange={handler} size='sm'>{temp}</Form.Select>
}
//Заполнение селектора выбора переговорки
function RoomSelect({handler}){
  let temp=[];
  for(let i=1;i<=10;i++){
    temp.push(<option key={'room-'+i} value={i}>{i}</option>);
  }
  return <Form.Select onChange={handler} size='sm'>{temp}</Form.Select>
}


function App() {

const [tower,setTower]=useState('А');
const [floor,setFloor]=useState(3);
const [room,setRoom]=useState(1);
const [date,setDate]=useState('');
const [timeStart,setStart]=useState('');
const [timeEnd,setEnd]=useState('');
const [comment,setComm]=useState('');

const towerHandler=(e)=>{setTower(e.target.value)};
const floorHandler=(e)=>{setFloor(e.target.value)};
const roomHandler=(e)=>{setRoom(e.target.value)};
const dateHandler=(e)=>{setDate(e.target.value)};
const timeStartHandler=(e)=>{setStart(e.target.value)};
const timeEndHandler=(e)=>{setEnd(e.target.value)};
const commentHandler=(e)=>{setComm(e.target.value)};

const sendButtonHandler=()=>{
let today=new Date();
let day = String(today.getDate()).padStart(2, '0');
let mon = String(today.getMonth() + 1).padStart(2, '0');
let year = today.getFullYear();
let strToday=''+year+'-'+mon+'-'+day;

if(date===''){toast.error('Выберите дату');return;};
if(timeStart===''){toast.error('Выберите время начала аренды');return;};
if(timeEnd===''){toast.error('Выберите время окончания аренды');return;};
if(date < strToday)
  {toast.error('Неправильная дата');return;};
if(timeEnd <= timeStart){toast.error('Время начала аренды больше/равно времени окончания');return;};

let hours= (timeEnd[0]-timeStart[0])*10+(timeEnd[1]-timeStart[1]);
let minutes= (timeEnd[3]-timeStart[3])*10+(timeEnd[4]-timeStart[4]);
let duration=hours*60+minutes;

let json=JSON.stringify({
    tower:tower,
    floor:floor,
    room:room,
    date:date,
    start:timeStart,
    end:timeEnd,
    duration_in_min:duration,
    comment:comment,
  })
  console.log(json)
  toast.success('Отправлено!')
};

const clearButtonHandler=()=>{
  document.getElementById("dateControl").value = "";
  setDate('');
  document.getElementById("startControl").value = "";
  setStart('');
  document.getElementById("endControl").value = "";
  setEnd('');
  document.getElementById("commentControl").value = "";
  setComm(''); 
};

  return (
    <Container style={{width:'100vw'}} className="d-flex justify-content-center align-items-center">
    <ToastContainer position="top-right"/>
      <Card className="mt-3 p-3">
      <h3 >Бронирование переговорной</h3>
        <Form>
          <Form.Label className='mt-2'>Выбор башни</Form.Label>
          <Form.Select onChange={towerHandler}  size='sm' id='towerSelect'>
            <option value='А'>А</option>
            <option value='Б'>Б</option>
          </Form.Select>

          <Form.Label className='mt-2'>Выбор этажа</Form.Label>
          <FloorSelect handler={floorHandler} id='floorSelect'/>

          <Form.Label className='mt-2'>Выбор этажа</Form.Label>
          <RoomSelect handler={roomHandler} id='roomSelect'/>

          <span className='d-flex flex-row justify-content-between mt-2'>
            <Form.Label>Выбор даты</Form.Label>
            <Form.Control id='dateControl' onChange={dateHandler} style={{width:'40%'}} size='sm' type='date'/> 
          </span>
          <span className='d-flex flex-row justify-content-between mt-2'>
            <Form.Label>Время начала</Form.Label>
            <Form.Control id='startControl' onChange={timeStartHandler} style={{width:'40%'}} size='sm' type='time'/>
          </span>
          <span className='d-flex flex-row justify-content-between mt-2'>
            <Form.Label>Время окончания</Form.Label>
            <Form.Control id='endControl' onChange={timeEndHandler} style={{width:'40%'}} size='sm' type='time'/>
          </span>

          <Form.Label className='mt-2'>Комментарии</Form.Label>
          <Form.Control id='commentControl' onChange={commentHandler} as='textarea' rows={3}/>
          <span className='d-flex flex-row justify-content-end mt-2'>
            <Button onClick={clearButtonHandler} variant='outline-danger'> Очистить</Button>
            <Button onClick={sendButtonHandler} variant='outline-success' style={{marginLeft:'1%'}}> Отправить</Button>
          </span>

        </Form>
      </Card>
    </Container>
  );
}

export default App;
