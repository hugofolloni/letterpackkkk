import { useState } from 'react';
import styled from 'styled-components';

const Header = () => {

    const [searchText, setSearchText] = useState('');

    const HeaderH1 = styled.h1`
        font-size: 36px;
        font-weight: 400;
        letter-spacing: -4px;
    `;

    return ( 
        <div className='header-div'>
            <HeaderH1 onClick={() => window.location.href='/'} style={{cursor: 'pointer'}}>letterpackkk</HeaderH1>
            <input className='input' type="text" onChange={(e) => setSearchText(e.target.value)} value={searchText} onKeyDown={(e) => {
                if(e.key === "Enter"){
                    window.location.href = "/search/" + searchText;
                }
                else {
                    return;
                }
            }}/>
        </div>
     );
}
 
export default Header;