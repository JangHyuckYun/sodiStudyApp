import { Grid, Paper } from '@mui/material'
import { styled } from '@mui/system'
import { Link } from 'react-router-dom'
import { GridItem, MenuGrid } from '../components/units/MenuGrid'
import { HomeProps, menuItemProps } from '../interfaces/Ihome'


const HomePage = (props:any) => {
    const { menuList }:HomeProps = props;

    return (
        <MenuGrid container spacing={2} gap={'10px'}>
            {menuList.map((item:menuItemProps, idx:number) => (
                <GridItem item key={idx}>
                    <Link to={item.url}>{item.name}</Link>
                </GridItem>
            ))}
        </MenuGrid>
    );
}

export default HomePage;
