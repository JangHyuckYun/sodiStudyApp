import HomePage from '../pages/HomePage'

const Home = () => {
    const menuList = [
        { name: 'English', url: 'study/english' },
        { name: '서버 구현', url: 'study/server' }];

    return <HomePage menuList={menuList} />
}

export default Home
