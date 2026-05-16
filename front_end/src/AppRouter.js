import { BrowserRouter, Route, Routes } from 'react-router'
import OceanHomeScreen from './components/OceanScreen/OceanHomeScreen'
import NorthOceanScreen from './components/screens/NorthOceanScreen'
import ReefsScreen from './components/screens/ReefsScreen'
import TrenchScreen from './components/screens/TrenchScreen'
import FishDetails from './components/FishDetails'


export default function AppRouter(props){
    return (
        <BrowserRouter basename=''>
            <Routes>
                <Route path='/' element={<OceanHomeScreen />} />
                <Route path='/north-ocean' element={<NorthOceanScreen />} />
                <Route path='/reefs' element={<ReefsScreen />} />
                <Route path='/trench' element={<TrenchScreen />} />
                <Route path='/fish/:slug' element={<FishDetails />} />
            </Routes>
        </BrowserRouter>
    )
}