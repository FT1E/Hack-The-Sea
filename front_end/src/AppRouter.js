import { BrowserRouter, Route, Routes } from 'react-router'
import OceanHomeScreen from './components/OceanScreen/OceanHomeScreen'
import FirstScreen from './components/screens/FirstScreen'

export default function AppRouter(props){
    return (
        <BrowserRouter basename=''>
            <Routes>
                <Route path='/' element={<OceanHomeScreen />} />
                <Route path="/first" element={<FirstScreen />} />
            </Routes>
        </BrowserRouter>
    )
}