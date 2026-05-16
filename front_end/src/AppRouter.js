import { BrowserRouter, Route, Routes } from 'react-router'
import OceanHomeScreen from './components/OceanScreen/OceanHomeScreen'
import FishDetails from './components/FishDetails'

import RegionScreen from './components/screens/RegionScreen'

export default function AppRouter(props) {

    const fish_ops = [
        { id: 1, name: 'Conical Sea Squirt(Koničasti Plaščar)', species: 'Aplidium conicum', model: '/FishModels/conicaltunicate.glb', slug: 'conicaltunicate' },
        { id: 2, name: 'Damselfish(Črnik)', species: ' Mediterranean chromis', model: '/FishModels/crnik.glb', slug: 'crnik' },
        { id: 3, name: 'Longstriped blenny(Črnoboka babica)', species: 'Parablennius rouxi', model: '/FishModels/blackeyedgrandmother.glb', slug: 'blackeyedgrandmother' },
    ]

    const fish_pmp = [
        { id: 1, name: 'Flat Head (Ploščata Glava)', species: 'Triglidae', model: '/FishModels/flathead.glb', slug: 'flathead' },
        { id: 2, name: 'Common Cuttle Fish(Navadna Sipa)', species: 'Sepia officinalis', model: '/FishModels/commoncuttlefish.glb', slug: 'commoncuttlefish' },
        { id: 3, name: 'Pisanica(pisanica)', species: 'Labridae', model: '/FishModels/pisanica.glb', slug: 'pisanica' },
    ]

    const fish_oom = [
        {
            id: 1,
            name: 'Striped Croaker(Progasti Gruntar)',
            species: 'Sciaenidae',
            model: '/FishModels/stripedcroaker.glb',
            slug: 'stripedcroaker',
        },
        {
            id: 2,
            name: 'Modrak (Modrak)',
            species: 'Sparidae',
            model: '/FishModels/modrak.glb',
            slug: 'modrak',
        },
        {
            id: 3,
            name: 'Gentle Huntress (Nežna Lovka)',
            species: 'Scorpaenidae',
            model: '/FishModels/gentlehuntress.glb',
            slug: 'gentlehuntress',
        },
    ]

    return (
        <BrowserRouter basename=''>
            <Routes>
                <Route path='/' element={<OceanHomeScreen />} />
                <Route path='/obalni-pas-skal' element={
                    <RegionScreen
                        title={"Obalni Pas Skal"}
                        fish={fish_ops}
                        nextRoute={'/pesceno-morski-pas'}
                    />
                } />
                <Route path='/pesceno-morski-pas' element={
                    <RegionScreen
                        title={"Peščeno Morski Pas"}
                        fish={fish_pmp}
                        nextRoute={'/odprto-obalno-morje'}
                    />
                } />
                <Route path='/odprto-obalno-morje' element={
                    <RegionScreen
                        title={"Odprto Obalno Morje"}
                        fish={fish_oom}
                        nextRoute={'/obalni-pas-skal'}
                    />
                } />
                <Route path='/fish/:slug' element={<FishDetails />} />
            </Routes>
        </BrowserRouter>
    )
}