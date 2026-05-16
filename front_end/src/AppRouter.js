import { BrowserRouter, Route, Routes } from 'react-router'
import OceanHomeScreen from './components/OceanScreen/OceanHomeScreen'
import FishDetails from './components/FishDetails'

export default function AppRouter(props) {
    return (
        <BrowserRouter basename=''>
            <Routes>
                <Route path='/' element={<OceanHomeScreen />} />
                <Route path='/fish/:slug' element={<FishDetails />} />
            </Routes>
        </BrowserRouter>
    )
}