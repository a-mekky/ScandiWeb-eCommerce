import { PureComponent } from "react";
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';
import { Query } from '@apollo/client/react/components';
import { GET_CATEGORIES } from '../../Services/GraphqlRequests'

import { ReactComponent as Logo } from './../../Assists/Back.svg';
import Currencies from "../Currencies/Currencies";
import NavCart from '../NavCartIcon/NavCart';

class NavBar extends PureComponent {
    render() {
        return (
            <>
                <Query query={GET_CATEGORIES()}>
                    {({ loading, data }) => {
                        if (loading) return <h2>Loading...</h2>;
                        else return (
                            <>
                                <div className={style.menuBar}>
                                    <ul>
                                        {data.categories.map((category) => {
                                            return (
                                                <li key={category.name}>
                                                    <NavLink to={`/${category.name}`} state={{ category: category.name }}
                                                    >{category.name.toUpperCase()}</NavLink>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <ul>
                                        <Logo />
                                    </ul>
                                    <ul>
                                        <li>
                                            <Currencies />
                                        </li>
                                        <li>
                                            <NavCart />
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )
                    }}
                </Query>
            </>
        );
    }
}

export default NavBar; <></>