// import React, { useState } from 'react';
// import dayjs from 'dayjs';
// import "./Settings.css"
// import Grid from '@mui/material/Grid';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateCalendar, StaticTimePicker } from '@mui/x-date-pickers';

// const today = dayjs();
// const twoPM = dayjs().set('hour', 14).startOf('hour');

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#ffffff',
//     },
//     background: {
//       default: '#121212',
//     },
//   },
// });

// export default function Settings() {
//   const [selectedDateTime, setSelectedDateTime] = useState(today);

//   const handleDateTimeChange = (dateTime) => {
//     // Add 3 hours to the selected time
//     const updatedDateTime = dateTime.add(3, 'hour');
//     setSelectedDateTime(updatedDateTime);
//     alert(updatedDateTime);
//   };

//   return (
//     <div className='main-settings'>
//       <ThemeProvider theme={darkTheme}>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <Grid
//             container
//             columns={{ xs: 1, lg: 2 }}
//             spacing={14}
//           >
//             <Grid item>
//               <DateCalendar value={selectedDateTime} onChange={handleDateTimeChange} disableFuture />
//             </Grid>
//             <Grid item>
//               <StaticTimePicker
//                 value={selectedDateTime}
//                 onChange={handleDateTimeChange}
//                 maxTime={dayjs().endOf('day')}
//               />
//             </Grid>
//           </Grid>
//         </LocalizationProvider>
//       </ThemeProvider>
//     </div>
//   );
// }
