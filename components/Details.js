import { apisAreAvailable } from 'expo';
import React, { useEffect, useCallback, useState } from 'react';
import { Text, View, ProgressBarAndroid } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'

import { useDispatch, useSelector } from 'react-redux'
import { addTask, removeTask } from '../redux/actions/tasks'

import { LISTDATA } from '../shared/list'

import api from '../api/list'

const Details = ( { route, navigation }) => {

  console.log("--detail");
  console.log(route.params); 

  const { id } = route.params;

  const [item, setItem] = useState(null);

  const dispatch = useDispatch();

  const tasks = useSelector(state => state.tasks);
  console.log("--tasks--");
  console.log(tasks);

  const isExistedTask = tasks.filter(item => item.id == id).length > 0 ? true : false;
  console.log("--isExistedTask--");
  console.log(isExistedTask);

  const getDetails = useCallback(async () => {
    const result = await api.get(id);
    console.log(result.data);
    setTimeout(()=>{
      setItem(result.data);
    }, 300)
    
  }, [])

  useEffect(()=>{
    getDetails();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      { !item && <ProgressBarAndroid /> }
      { item && 
      <Card>
        <Card.Title>{item.title}</Card.Title>
        <Card.Divider/>
        <Card.Image source={{uri: item.image}}>
        </Card.Image>
        <Card.Divider/>        
        <Text style={{marginBottom: 10}}>
          {item.description}
        </Text>
        {
          isExistedTask 
            ?
            <Button
              onPress={()=>{dispatch(removeTask(id))}}
              icon={<Icon name='close' type='ionicon' color='#ffffff' />}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:"gray"}}
              title='UNLIKE' 
            /> 
            :
            <Button
              onPress={()=>{dispatch(addTask(item))}}
              icon={<Icon name='checkmark' type='ionicon' color='#ffffff' />}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:"tomato"}}
              title='LIKE' 
            />    
        }
            
      </Card>
      }
    </View>
  )
}
export default Details;