import React,{useState,useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  Button
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';


  export default function Products(){

    const isDarkMode = useColorScheme() === 'dark';
    const [products,setProducts] = useState([]);
    
    useEffect(()=>{

        setTimeout(() => {
          productAPI();
        }, 10000);
        
      },[])
    
      const productAPI = () =>{
    
        fetch('https://fakestoreapi.com/products')
        .then((res)=>res.json())
        .then((result)=>{
          // console.log("results",result);
          setProducts(result);
        })
    
      }
    

    if(products.length==0)
    {
      return(<View style={{justifyContent:'center',flex:1}}>
        <ActivityIndicator size={'large'} color={'deeppink'} />
      </View>)
    }

    return(
        <View>
            {
          products && products.map((value:any,Index:any)=>{
            return(
              <View
              key={Index}
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
              <Image
                style={styles.stretch}
                source={{
                  uri: value.image,
                }}
              />
              <Text>{value.title}</Text>
              <Text>{value.price}</Text>
              <Button color={'rgb(33, 150, 243)'} title='View' />
            </View>
            );
          })
        } 
        </View>
    )
  }

  const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  stretch: {
    width: windowWidth,
    height: 300,
    resizeMode: 'contain',
  },
  headers:{
    fontSize:20,
    textAlign:'center',
    color:'deeppink'
  }
});
