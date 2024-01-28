import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, Image, TouchableOpacity, BackHandler, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, Octicons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const PublicHomeScreen = ({ navigation }) => {

  const { logoutPublic } = useContext(AuthContext);
  const [storedName, setStoredName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const name = await AsyncStorage.getItem('name');
      setStoredName(name || '');
    };
    fetchUserName();
  }, []);


  const exitApp = async () => {
    Alert.alert('LOGOUT', 'Do you want to log-out from your account?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
      { text: 'Yes', onPress: () => { BackHandler.exitApp(), logoutPublic(); } },
      ]); 
  };


  const viewMap = () => {
    navigation.navigate("BinMap");
  };

  const reportIssues = () => {
    navigation.navigate("ReportScreen");
  };


  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.name}> {storedName.toUpperCase()+'!'} </Text>
      </View>
      <View style={styles.container}>
        <Image
          source={require("../assets/LoginScreen/img.png")}
          style={styles.image}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, { backgroundColor: "#1bb56b" }]}
        onPress={viewMap}
      >
        <View style={styles.buttonItems}>
          <View>
            <Text style={styles.buttonText}>Get Updates</Text>
            <Text style={{color:'white'}}>View bin locations, filled levels and temperature</Text>
          </View>
          <Entypo name="location" size={40} color="white" style={styles.icon} />
        </View>
        
        
      </TouchableOpacity>
      
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, { backgroundColor: "#1b8cb5" }]}
        onPress={reportIssues}
      >
        <View style={styles.buttonItems}>
          <View>
            <Text style={styles.buttonText}>Report</Text>
            <Text style={{color:'white'}}>Your complaints and feedbacks</Text>
          </View>
          <Octicons name="report" size={40} color="white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, { backgroundColor: "#a660d1" }]}
        onPress={ exitApp }
      >
        <View style={styles.buttonItems}>
          <View>
            <Text style={styles.buttonText}>Log Out</Text>
            <Text style={{color:'white'}}>Logout from your account and exit</Text>
          </View>
          <MaterialCommunityIcons name="logout" size={50} color="white" />
        </View>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerItems} onPress={() => navigation.navigate('PublicDetails')}>
          <MaterialCommunityIcons name="account" size={40} color="#105716"/>
          <Text style={{fontSize:13, color:'green'}}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItems}>
          <Ionicons name="notifications" size={30} color="#105716"/>
          <Text style={{fontSize:13, color:'green'}}>Notifications</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
    
  );
};

export default PublicHomeScreen;

const styles = StyleSheet.create({
  
  Container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: "grey",
    paddingRight:5
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#105716",
    
  },
  titleContainer: {
    marginTop:10,
    alignContent: 'center',
    alignItems: 'center',
    height: 60,
    justifyContent:'center'
  },
  image: {
    marginTop: 20,
    width: 300,
    height: 250,
    marginBottom:10
  },
  button: {
    flexDirection: 'row',
    alignItems: "center",
    alignContent:'center',
    padding: 15,
    width: "90%",
    height:110,
    borderRadius: 20,
    margin: 3,
    elevation: 5,
    shadowOffset: {
        width: 100,
        height:100
    },

    shadowColor: '#105716',
    shadowOpacity: 1,
    shadowRadius: 8
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonItems: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  footerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems:'center',
    justifyContent: 'space-around',
    marginTop: 20,
    width: "90%",
    height:40
  
  },

  footerItems: {
    alignContent: 'center',
    alignItems:'center'
  }
});
