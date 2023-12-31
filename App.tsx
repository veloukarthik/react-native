/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [products,setProducts] = useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text style={styles.headers}>DealsCart</Text>
        {
          products && products.map((value:any,Index)=>{
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
      </ScrollView>
    </SafeAreaView>
  );
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
    resizeMode: 'stretch',
  },
  headers:{
    fontSize:20,
    textAlign:'center',
    color:'deeppink'
  }
});

export default App;
