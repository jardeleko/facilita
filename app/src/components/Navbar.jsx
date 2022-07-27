import { StyleSheet } from 'react-native'
import React from 'react'
import { Appbar, Menu } from 'react-native-paper'

export default function CustomNavigationBar({navigation, back}) {
    const [visible, setVisible] = React.useState(false)
    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)
    return (
        <Appbar.Header style={styles.container}>
            {back ? 
            <Appbar.BackAction onPress={navigation.goBack} 
                anchor={
                    <Appbar.Action icon="menu" color='black' onPress={openMenu} />
                }
            /> : null}
            <Appbar.Content title="Facilita Imóveis" style={styles.title}/>
            {!back ? (
                <Menu style={styles.menu}
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action icon="menu" color='black' onPress={openMenu} />
                    }>
                        <Menu.Item onPress={() => {navigation.navigate('create'), setVisible(false)}} icon="briefcase-plus-outline" title="Anunciar"/>
                        <Menu.Item onPress={() => {navigation.navigate('diarias'), setVisible(false)}} icon="calendar-clock-outline" title="Diárias"/>
                        <Menu.Item onPress={() => {navigation.navigate('mensal'), setVisible(false)}} icon="home-city-outline" title="Mensal"/>
                        <Menu.Item onPress={() => {console.log('Option 3 pressed')}} icon="paperclip" title="Seus Anuncios"/>
                        <Menu.Item onPress={() => {navigation.navigate('login'), setVisible(false)}} icon="account-arrow-right-outline" title="Login"/>
                        <Menu.Item onPress={() => {navigation.navigate('register'), setVisible(false)}} icon="account-plus-outline" title="Registro"/>

                </Menu>
            ) : null}
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 0,
        fontSize: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.1,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'trans',
        borderBottomColor: 'gray',
        backgroundColor: "white",
    },
})