import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

const Home = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.center}>
      <Text style={{color: '#000'}}>{t('Home:title')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Home;
