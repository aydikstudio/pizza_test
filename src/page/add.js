import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import ReactInputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { Link,  } from "react-router-dom";
import { useSet } from "react-use";
import { addNewUser } from "../redux/features/employees/employeesSlice";

export default function Add() {
  
    const dispatch = useDispatch()
 
    const employees = useSelector((state) => state.employees.value);
    const lastId = employees.reduce(function(max, obj) {
        return obj.id> max.id? obj : max;
      }).id;

  
    const roles =  Array.from(useSet(new Set(employees.map((employee) => employee.role)))[0]);
    const [user, setUser] = useState({
        id: 0,
        name: "",
        isArchive: false,
        role: "",
        phone: "",
        birthday: ""
    });
    const onChange = (e) => {
    
        if(e.target.name == 'isArchive') {
         
            setUser((prev) => {
                let edit_user = prev; 
                edit_user[e.target.name] = !user.isArchive;   
                return edit_user       
            })
        } else {
            setUser((prev) => {
                let edit_user = prev; 
                edit_user[e.target.name] = e.target.value;            
                return edit_user  
            })
        }
      
    }
  
    const onSubmit = () => {
     
        let ready_user = user;
        ready_user.id = lastId + 1;
    

        if(ready_user.name.length > 0 || ready_user.role.length > 0 || ready_user.role.phone > 0 || ready_user.birthday.length > 0) {
           
         
            dispatch(addNewUser(ready_user));
            setUser({
                id: 0,
                name: "",
                isArchive: false,
                role: "",
                phone: "",
                birthday: ""
            })
    
            alert("Пользователь добавлен");
        } else {
            alert("Заполните все поля");
        }
  
    
    }




    return( <Container sx={{
        marginTop: 5
      }}>
        <Link to="/">Домой</Link>

        <div style={{marginTop: '15px', width: '100%'}}>
        <Box sx={{
    marginTop: '5px'
}}>
        <FormControl style={{marginTop: '15px', width: '100%'}}>
  <InputLabel htmlFor="my-input" >Имя</InputLabel>
  <Input name="name" id="my-input" aria-describedby="my-helper-text" onChange={(e) => onChange(e)} />
</FormControl>
</Box>
<Box sx={{
    marginTop: '5px'
}}>
<FormControl style={{marginTop: '15px', width: '100%'}}>
<ReactInputMask mask="+7\ (999) 999-9999" onChange={(e) => onChange(e)}  >
    {(inputProps) =>   <Input id="my-input" aria-describedby="my-helper-text" name="phone" placeholder="+7" />}
  </ReactInputMask>
</FormControl>
<FormControl style={{marginTop: '15px', width: '100%'}}>
<ReactInputMask mask="99.99.9999"  onChange={(e) => onChange(e)} >
    {(inputProps) =>   <Input id="my-input" aria-describedby="my-helper-text" name="birthday" placeholder="01.01.1970" />}
  </ReactInputMask>
</FormControl>
</Box>
<Box sx={{
    marginTop: '5px'
}}>
<FormControl style={{marginTop: '15px', width: '100%'}}>
<InputLabel id="demo-simple-select-label">Должность</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Должность"
              name="role"
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

            <FormControlLabel control={<Checkbox onChange={(e) => onChange(e)} />} label="В архиве" name="isArchive" />

    
</Box>
<Box>
<FormControl style={{marginTop: '15px'}}>
  <Button onClick={() => onSubmit()}>Добавить</Button>
  </FormControl>
  </Box>
        </div>
      </Container>)
}