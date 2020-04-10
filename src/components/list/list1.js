import React, { useEffect, useState, useCallback } from 'react'
import api from '../../api/api';
import './style.css'

function Header(){

    const [users, setUsers] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState([])

    useEffect(()=>{ 
        load();
    },[])

    async function load(){
        setIsloading(true);
        try{
            await api.get().then( response =>{
                const nextUsers = response.data.results.map(user => ({
                    email: user.email,
                    name: Object.values(user.name).join(' '),
                    photo: user.picture.medium,
                    username: user.login.username,
                    uuid: user.login.uuid,
                  }));
                  setUsers(users.concat(nextUsers))        
            })
            setHasMore(users.length < 1000);
            setIsloading(false);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        setSearch([...users])
    },[users])

    function getDocHeight() {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }

    const [firstLoad, setFirstLoad] = useState(0)

    window.onscroll = () =>{
        console.log(firstLoad)
        if(firstLoad === 0){
            if(window.innerHeight + document.documentElement.scrollTop >= getDocHeight()){
                setFirstLoad(1)
                console.log('fim da página igual a zero')
                console.log(`isloading: ${isloading} / hasMore: ${hasMore}`)
                if (isloading || !hasMore) return;
                load();
            }
        }else{
            if(window.innerHeight + document.documentElement.scrollTop + 1 >= getDocHeight()){
                console.log('fim da página else')
                console.log(`isloading: ${isloading} / hasMore: ${hasMore}`)
                if (isloading || !hasMore) return;
                load();
            }            
        }
        
    }

    const handleSearch = useCallback((e)=>{
        const value = e.target.value;
        const results = users.filter(person =>
            person.name.toLowerCase().search(value) !== -1
        );
        setSearch(results);
    },[users])


    return(
        <div id="container">
            <input type="text" onChange={handleSearch}></input>
            <ul>
                {search.map( user =>(
                    <li key={user.uuid}>
                        Nome: {user.name}
                        <br/>
                        <img src={user.photo} alt={user.name}></img>
                    </li>
                ))}
            </ul>
            {isloading === true ? <div className="lds-dual-ring"></div> : ''}

        </div>
    )
}

export default Header;

