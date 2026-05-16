import { BrowserRouter, Route, Routes } from 'react-router'
import OceanHomeScreen from './components/OceanScreen/OceanHomeScreen'
<<<<<<< HEAD
import FishDetails from './components/FishDetails'

export default function AppRouter(props) {
    return (
        <BrowserRouter basename=''>
            <Routes>
                <Route path='/' element={<OceanHomeScreen />} />
                <Route path='/fish/:slug' element={<FishDetails />} />
=======
import NorthOceanScreen from './components/screens/NorthOceanScreen'
import ReefsScreen from './components/screens/ReefsScreen'
import TrenchScreen from './components/screens/TrenchScreen'


export default function AppRouter(props){
    return (
        <BrowserRouter basename=''>
            <Routes>
              <Route path='/' element={<OceanHomeScreen />} />
             <Route path='/north-ocean' element={<NorthOceanScreen />} />
             <Route path='/reefs' element={<ReefsScreen />} />
             <Route path='/trench' element={<TrenchScreen />} />
>>>>>>> 4ffc04cf1c250c88a92b8963b7337d8a1a179b2c
            </Routes>
        </BrowserRouter>
    )
}