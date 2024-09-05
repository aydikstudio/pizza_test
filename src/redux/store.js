import { configureStore } from '@reduxjs/toolkit'
import employeesSlice from './features/employees/employeesSlice'

export default configureStore({
  reducer: {
    employees: employeesSlice
  },
})