import { BrowserRouter, Route, Routes } from 'react-router'
import OceanHomeScreen from './components/OceanScreen/OceanHomeScreen'

export default function AppRouter(props){


    return (
        <BrowserRouter basename=''>
            <Routes>


                <Route path='/' element={<OceanHomeScreen />}>
                    {/* <Route path='ocean' element={<OceanHomeScreen/>}/> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
