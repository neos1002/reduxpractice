import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,Image , Button, TextInput, TouchableOpacity, Alert,FlatList} from 'react-native';
import { useDispatch } from 'react-redux';
import {getDataList} from './Redux/action'

const Item = ({email, name,bidang,onPress,onDelete}) => {
    return (
        <View style ={styles.itemContainer}>
            <TouchableOpacity onPress={onPress}>
            <Image source={{uri : 'https://i.ebayimg.com/images/g/UywAAOSwtixeioct/s-l300.jpg'}} style ={styles.avatar}/>
            </TouchableOpacity>
                <View style = {styles.desc}>
                    <Text style={styles.descName}>{name}</Text>
                    <Text style={styles.descEmail}>{email}</Text>
                    <Text style={styles.descBidang}>{bidang}</Text>
                </View>
                <TouchableOpacity onPress={onDelete}>
                    <Text style={styles.delete}>X</Text>
                </TouchableOpacity>
            </View>
    )
}

const LocalAPI = () => {

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [bidang,setBidang] = useState("");
const [users,setUsers] = useState([]);
const [button,setButton] = useState("simpan");
const [selectedUser,setSelectedUser]= useState({});
const dispatch = useDispatch();

useEffect(()=>{
    getData();
}, []);


const submit = ()=>{
    const data = {
        name,
        email,
        bidang 
    }
    console.log('data before send :',data);
    if(button === 'simpan'){
        fetch('http://localhost:3000/users', {
        method: 'POST',
        body : JSON.stringify(data),
	    headers: {
		    'Content-type': 'application/json; charset=UTF-8'
	    }
        }).then(function (response) {
	        if (response.ok) {
		        return response.json();
	        }
	        return Promise.reject(response);
        }).then(function (data) {
            console.log(data);
            setName("");
            setEmail("");
            setBidang("");
            getData();
        })
        .catch(function(err){
            console.log('Something wrong : ');
        });
        
    }else if (button ==='Update'){
        fetch(`http://localhost:3000/users/${selectedUser.id}`, {
        method: 'PUT',
        body : JSON.stringify(data),
	    headers: {
		    'Content-type': 'application/json; charset=UTF-8'
	    }
        }).then(function (response) {
	        if (response.ok) {
		        return response.json();
	        }
	        return Promise.reject(response);
        }).then(function (data) {
            console.log("update data : ",data);
            setName("");
            setEmail("");
            setBidang("");
            getData();
            setButton("simpan");
        })
    }
    }

    const deleteItem=(item)=>{
        console.log(item);
        fetch('http://localhost:3000/users/' + item.id, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => console.log('res delete : '+res))

    }
    

    const getData =()=>{
        dispatch(getDataList());
        // fetch('http://localhost:3000/users')
        // .then(response => response.json())
        // .then(res => {
        //     if(Array.isArray(res)) {
        //         console.log({result:res});
        //         setUsers(res);
        //         console.log('users=====================>', users);
        //     }else{
        //         setUsers([]);
        //     }
            
        // })
        // .catch(function(err){
        //     console.log('Something wrong : ');
        // });
    
    }

    const selectItem= (item)=> {
        console.log('selected item ', item);
        setSelectedUser(item);
        setName(item.name);
        setEmail(item.email);
        setBidang(item.bidang);
        setButton("update");
    }
    
    const renderItem = ({ email, name,bidang,onPress,onDelete }) => {
        return(
          <Item email={email} name={name} bidang={bidang} onPress={onPress} onDelete={onDelete} />
    )}

console.log({users})
    return (
        <View style ={styles.container}>
            <Text style = {styles.textTitle}>local API (JSON Server)</Text>
            <Text>Masukan Angggota </Text>
            <TextInput placeholder='Nama Lengkap'style ={styles.input} value={name} onChangeText={(value) => setName(value)}/>
            <TextInput placeholder='Email'style ={styles.input} value={email} onChangeText={(value) => setEmail(value)}/>
            <TextInput placeholder='Bidang'style ={styles.input} value={bidang} onChangeText={(value) => setBidang(value)}/>
            <Button title={button} onPress={submit}></Button>
            <View style={styles.line}></View>
            <FlatList
                data={users}
                renderItem={renderItem}
                onRefresh={getData}
                // refreshing={loader}
                keyExtractor = { (item) => item.email }
                ListFooterComponent={<View style={{marginTop:10}}/>}
                ListEmptyComponent={()=>(
                    <View style={{flex: 1, justifyContent:"center", alignItems:'center'}}>
                        <Text>data tidak tersedia</Text>
                    </View>
                )}
            />
            {/* {users.map(
                user =>
                {
                    return <Item 
                        key={user.id}  
                        name ={user.title} 
                        email={user.body} 
                        bidang={user.bidang} 
                        onPress={() =>selectItem(user)} 
                        onDelete={()=> Alert.alert(
                            'Warning', 
                            'Anda yakin akan menghapus user ini?', 
                            [
                                {
                                    text : 'Tidak', 
                                    onPress:()=>console.log('button tidak')
                                }, 
                                {
                                    text : 'Ya', 
                                    onPress:()=> deleteItem(user)
                                }
                            ]
                        )}/>
                }
            )
            } */}
        </View>
    )
}

export default LocalAPI

const styles = StyleSheet.create({
    container : {padding : 20},
    textTitle : {textAlign : 'center', marginBottom : 20},
    line : {height : 2, backgroundColor : 'black',marginVertical : 20},
    input : {borderWidth : 1, marginBottom : 12, borderRadius : 25, paddingHorizontal : 18},
    itemContainer :{flexDirection: 'row',marginBottom : 20},
    avatar : {width : 80, height : 80, borderRadius : 80},
    desc : { marginLeft : 18, flex : 1},
    descName : {fontSize : 20, fontWeight : 'bold'},
    descEmail : {fontSize :16},
    descBidang : {fontSize : 12, marginTop :8},
    delete : {fontSize : 20, fontWeight : "bold", color : "red"}

})
 



// import React, { useEffect, useState } from 'react'
// import { StyleSheet, Text, View, Button, TextInput, Alert,ScrollView,TouchableOpacity,FlatList} from 'react-native'
// import Item from './GetData';
// import {useSelector,useDispatch} from 'react-redux';
// import {actions} from './redux/action';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';


// export default function MainApp() {
//     //new
//     const dispatch = useDispatch();
//     const dataList = useSelector(state=> state.transactionList.data);
//     const loader = useSelector(state=> state.transactionList.isLoading);
//     let [searchText, setSearch] = useState('');
//     let [data1, setData] = useState([]);
//     const isFirstRender = useRef(true);

//     useEffect(()=>{
//         if (isFirstRender.current) {
//             isFirstRender.current = false;
//           } else {
//                 setData(dataList)
//           }
//     },[loader]);

//     useFocusEffect(
//         React.useCallback(() => {
//           const task = InteractionManager.runAfterInteractions(() => {
//             getData()
//           });
//           return () => {
//             setData(dataList);
//             task.cancel();}
//         }, [])
//       );

//       const getData=()=>{
//         setSearch('');
//         dispatch(actions());
//       }

//       const renderItem = ({ item, props }) => {
//         return(
//           <Item item={item} props={props} />
//         )}


//     //new

//     const SimpanReducer =useSelector(state=>state.SimpanReducer)
//     // const [button,setButton] = useState("simpan");
//     const [users,setUsers] = useState([]);
//     const [selectedUser,setSelectedUser]= useState({});

    
//     const onInputChange = (value, inputType) => {
//         dispatch(setForm(inputType,value))
//     }

//     const submit = ()=>{
//         console.log('data yang dikirim: ', SimpanReducer.form)
//         // const data = {
//         //     name,
//         //     email,
//         //     bidang 
//         // }
//         // console.log('data before send :',data);
//         // if(button === 'simpan'){
//         //     fetch('http://localhost:3000/users', {
//         //     method: 'POST',
//         //     body : JSON.stringify(data),
// 	    //     headers: {
// 		//         'Content-type': 'application/json; charset=UTF-8'
// 	    //     }
//         //     }).then(function (response) {
// 	    //         if (response.ok) {
// 		//             return response.json();
// 	    //         }
// 	    //         return Promise.reject(response);
//         //     }).then(function (data) {
//         //         console.log(data);
//         //         setName("");
//         //         setEmail("");
//         //         setBidang("");
//         //         getData();
//         //     })
//         //     .catch(function(err){
//         //         console.log('Something wrong : ');
//         //     });
        
//         // }else if (button ==='Update'){
//         //     fetch(`http://localhost:3000/users/${selectedUser.id}`, {
//         //     method: 'PUT',
//         //     body : JSON.stringify(data),
// 	    //     headers: {
// 		//         'Content-type': 'application/json; charset=UTF-8'
// 	    //     }
//         //     }).then(function (response) {
// 	    //         if (response.ok) {
// 		//             return response.json();
// 	    //         }
// 	    //         return Promise.reject(response);
//         //     }).then(function (data) {
//         //         console.log("update data : ",data);
//         //         setName("");
//         //         setEmail("");
//         //         setBidang("");
//         //         getData();
//         //         setButton("simpan");
//         //     })
//         // }
//     }

//     const deleteItem=(item)=>{
//         console.log(item);
//         fetch('http://localhost:3000/users/' + item.id, {
//             method: 'DELETE',
//         })
//         .then(res => res.json())
//         .then(res => console.log('res delete : '+res))

//     }

//     // const getData =()=>{
//     //     fetch('http://localhost:3000/users')
//     //     .then(response => response.json())
//     //     .then(res => {
//     //         if(Array.isArray(res)) {
//     //             console.log({result:res});
//     //             setUsers(res);
//     //             console.log('users=====================>', users);
//     //         }else{
//     //             setUsers([]);
//     //         }
            
//     //     })
//     //     // .catch(function(err){
//     //     //     console.log('Something wrong : ');
//     //     // });
    
//     // }

//     const selectItem= (item)=> {
//         console.log('selected item ', item);
//         setSelectedUser(item);
//         setName(item.name);
//         setEmail(item.email);
//         setBidang(item.bidang);
//         setButton("update");
//     }

//     return (
//         <View style ={styles.container}>
//             <Text style = {styles.textTitle}>local API (JSON Server)</Text>
//             <Text>Masukan Angggota </Text>
//             <TextInput 
//                 placeholder='fullname'
//                 style ={styles.input} 
//                 value={SimpanReducer.form.fullname} 
//                 onChangeText={(value) => onInputChange(value,'fullname')}
//             />
//             <TextInput 
//                 placeholder='email'
//                 style ={styles.input} 
//                 value={SimpanReducer.form.email} 
//                 onChangeText={(value) => onInputChange(value,'email')}
//             />
//             <TextInput 
//                 placeholder='bidang'
//                 style ={styles.input} 
//                 value={SimpanReducer.form.bidang} 
//                 onChangeText={(value) => onInputChange(value,'bidang')}
//             />
//             <Button title={button} onPress={submit}></Button>
//             <View style={styles.line}></View>
//             <FlatList
//                 data={data1}
//                 renderItem={renderItem}
//                 onRefresh={getData}
//                 refreshing={loader}
//                 keyExtractor = { (item) => item[0].id }
//                 ListFooterComponent={<View style={{marginTop:10}}/>}
//                 ListEmptyComponent={()=>(
//                     <View style={{flex: 1, justifyContent:"center", alignItems:'center'}}>
//                         <Text>data tidak tersedia</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     )
// }


// const styles = StyleSheet.create({
//     container : {padding : 20},
//     textTitle : {textAlign : 'center', marginBottom : 20},
//     line : {height : 2, backgroundColor : 'black',marginVertical : 20},
//     input : {borderWidth : 1, marginBottom : 12, borderRadius : 25, paddingHorizontal : 18}
// })
