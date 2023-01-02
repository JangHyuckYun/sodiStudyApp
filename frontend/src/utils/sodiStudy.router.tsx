import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../components/Home'
import StudyEnglish from '../components/study/english'
import ViewEnglish from '../components/study/view.english'

const SodiRoutes = () => {
    const location = useLocation()
    const background = location.state && location.state.background

    console.log('location', location)

    return (
        <Routes location={background || location}>
            <Route path={'/'} element={<><Outlet /></>}>
                <Route path={''} element={<Home />} />
                <Route path={'study/english'} element={<StudyEnglish />} />
                <Route path={'study/english/:enCpIdx'} element={<ViewEnglish />} />
            </Route>
        </Routes>
    )
}

export default SodiRoutes
