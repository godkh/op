import React, { useCallback, useEffect, useState } from 'react';
import List from './List'


import api from '../api/list'


const ListContainer = ({ navigation }) => {

  
  const [list, setList] = useState([]);  

  const getList = useCallback(async () => {
    const result = await api.list();
    console.log(result.data);
   
    setList(result.data);
  }, [])


  useEffect(()=>{

    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        console.log('focus')
        getList();
      }
    )
  

    return unsubscribe;
  }, [navigation])

  return (
    <List navigation={navigation} list={list}></List>
  )

}
export default ListContainer;