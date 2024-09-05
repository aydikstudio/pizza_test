import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import ReactInputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, } from "react-router-dom";
import { useSet } from "react-use";
import { addNewUser, editUser } from "../redux/features/employees/employeesSlice";

export default function Edit() {


  const dispatch = useDispatch()

  let { id } = useParams();
  const employees = useSelector((state) => state.employees.value);

  const employeer = employees.find((item) => item.id == id);


  const roles = Array.from(useSet(new Set(employees.map((employee) => employee.role)))[0]);

  const [user, setUser] = useState({
    id: employeer.id,
    name: employeer.name,
    isArchive: employeer.isArchive,
    role: employeer.role,
    phone: employeer.phone,
    birthday: employeer.birthday
  });




  const onChange = (e) => {

    if (e.target.name == 'isArchive') {

      setUser((prev) => ({
        ...prev,
        [e.target.name]: !user.isArchive
      }))
    } else {
      setUser((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
      }))
    }

  }

  const onSubmit = () => {
    let ready_user = user;


    if (ready_user.name.length > 0 || ready_user.role.length > 0 || ready_user.role.phone > 0 || ready_user.birthday.length > 0) {


      dispatch(editUser(ready_user));


      alert("Пользователь исправлен");
    } else {
      alert("Заполните все поля");
    }


  }



  return (<Container sx={{
    marginTop: 5
  }}>
    <Link to="/">Домой</Link>

    <div style={{ marginTop: '15px', width: '100%' }}>
      <Box sx={{
        marginTop: '5px'
      }}>
        <FormControl style={{ marginTop: '15px', width: '100%' }}>
          <InputLabel htmlFor="my-input" >Имя</InputLabel>
          <Input name="name" value={user.name} id="my-input" aria-describedby="my-helper-text" onChange={(e) => onChange(e)} />
        </FormControl>
      </Box>
      <Box sx={{
        marginTop: '5px'
      }}>
        <FormControl style={{ marginTop: '15px', width: '100%' }}>
          <ReactInputMask mask="+7\ (999) 999-9999" value={user.phone} onChange={(e) => onChange(e)}  >
            {(inputProps) => <Input id="my-input" aria-describedby="my-helper-text" name="phone" placeholder="+7" />}
          </ReactInputMask>
        </FormControl>
        <FormControl style={{ marginTop: '15px', width: '100%' }}>
          <ReactInputMask mask="99.99.9999" value={user.birthday} onChange={(e) => onChange(e)} >
            {(inputProps) => <Input id="my-input" aria-describedby="my-helper-text" name="birthday" placeholder="01.01.1970" />}
          </ReactInputMask>
        </FormControl>
      </Box>
      <Box sx={{
        marginTop: '5px'
      }}>
        <FormControl style={{ marginTop: '15px', width: '100%' }}>
          <InputLabel id="demo-simple-select-label">Должность</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Должность"
            name="role"
            value={user.role}
            onChange={(e) => onChange(e)}
          >
            <MenuItem value='все' >все</MenuItem>
            {roles.map((item) => (
              <MenuItem value={item} >{item}</MenuItem>
            ))}
          </Select>

        </FormControl>
      </Box>
      <Box sx={{
        marginTop: '5px'
      }}>

        <FormControlLabel control={<Checkbox
          checked={user.isArchive}
          onChange={(e) => onChange(e)} />} label="В архиве" name="isArchive" />


      </Box>
      <Box>
        <FormControl style={{ marginTop: '15px' }}>
          <Button onClick={() => onSubmit()}>Ред.</Button>
        </FormControl>
      </Box>
    </div>
  </Container>)
}