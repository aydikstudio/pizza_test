import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, Container, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSet } from 'react-use';
import { Link } from 'react-router-dom';
import { setFilteredByArchive, setFilteredByPosted } from '../redux/features/employees/employeesSlice';



export default function Main() {
  const [filterRole, setFilterRole] = React.useState('все');
  const employees = useSelector((state) => state.employees.value) ;
  const isArchive = useSelector((state) => state.employees.filterByArchive) ;
  const dispatch = useDispatch()
  const roles =  Array.from(useSet(new Set(employees.map((employee) => employee.role)))[0]);

  const handleChange = (e) => {
    setFilterRole(e.target.value)
  }

  
  return (
    <Container sx={{
      marginTop: 5
    }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Должность</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Должность"
              value={filterRole}
              onChange={handleChange}
            >
              <MenuItem value='все' onClick={() => dispatch(setFilteredByPosted('all'))}>все</MenuItem>
              {roles.map((item) => (
            <MenuItem value={item} onClick={() => dispatch(setFilteredByPosted(item))}>{item}</MenuItem>
              ))}
            

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormGroup>
            <FormControlLabel control={<Checkbox  onChange={(e) => dispatch(setFilteredByArchive(!isArchive))}/>} label="В архиве" />

          </FormGroup>
        </Grid>

        <Grid item xs={2}>
          <Link to="/add">+Добавить</Link>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{
        marginTop: 5
      }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell
                align="left"
              >
                Дата рождения

              </TableCell>
              <TableCell
                align="right"
              >
                Должность

              </TableCell>

              <TableCell align="right">Номер телефона</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
      {employees.length > 0 ? (
        employees.map((item) => (
        <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={`/edit/${item.id}`}>{item.name}</Link>
                </TableCell>
                <TableCell>
                  {item.birthday}
                </TableCell>
                <TableCell align="right">{item.role}</TableCell>
                <TableCell align="right">{item.phone}</TableCell>
              </TableRow>
        ))
                
      ) : 'Загрузка....'}
    

          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}