import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,Image , Button, TextInput, TouchableOpacity, Alert} from 'react-native'

const Item = ({item,onPress,onDelete}) => {
    return (
        <View style ={styles.itemContainer}>
            <TouchableOpacity onPress={onPress}>
            <Image source={{uri : 'https://i.ebayimg.com/images/g/UywAAOSwtixeioct/s-l300.jpg'}} style ={styles.avatar}/>
            </TouchableOpacity>
                <View style = {styles.desc}>
                    <Text style={styles.descName}>{item.name}</Text>
                    <Text style={styles.descEmail}>{item.email}</Text>
                    <Text style={styles.descBidang}>{item.bidang}</Text>
                </View>
                <TouchableOpacity onPress={onDelete}>
                    <Text style={styles.delete}>X</Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    itemContainer :{flexDirection: 'row',marginBottom : 20},
    avatar : {width : 80, height : 80, borderRadius : 80},
    desc : { marginLeft : 18, flex : 1},
    descName : {fontSize : 20, fontWeight : 'bold'},
    descEmail : {fontSize :16},
    descBidang : {fontSize : 12, marginTop :8},
    delete : {fontSize : 20, fontWeight : "bold", color : "red"}
})

export default Item;
