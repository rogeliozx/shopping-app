import React, { useEffect,useState } from 'react';
import {
  FlatList,
  Platform,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/order';
import Colors from '../../constants/Colors';

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrder()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);
  const orders = useSelector((state) => state.order.order);
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmout}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({
  center:{
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
  }
})

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default OrdersScreen;
