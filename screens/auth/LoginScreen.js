import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, Button, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Text, TextInput, View, Platform, ImageBackground, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

const initialState = {
    email: '',
    password: '',
}

export default function LoginScreen({ navigation }) {
    const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
    const [state, setState] = useState(initialState);
    const [dimentions, setDimentions] = useState(Dimensions.get('window').width - 20 * 2);

    useEffect(() => {
        const onChange = () => {
            const width = Dimensions.get('window').width - 20 * 2;
            console.log('windth', width);
            setDimentions(width)
        }
        Dimensions.addEventListener('change', onChange);
        return () => {
            Dimensions.removeEventListener('change', onChange);
        }
    }, []);

    const keyboardHide = () => {
        setIsShowKeyBoard(false);
        Keyboard.dismiss();
        console.log(state);
        setState(initialState);

    }

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/image.jpeg')} style={styles.image}>
                    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                        <View style={{ ...styles.form, marginBottom: isShowKeyBoard ? 20 : 150, width: dimentions }}>
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>
                                    Hello user
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.inputTitle}>Email</Text>
                                <TextInput style={styles.input} value={state.email} textAlign='center' onFocus={() => { setIsShowKeyBoard(true) }} onChangeText={(value) => setState((prevState) => ({ ...prevState, email: value }))} />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.inputTitle}>Password</Text>
                                <TextInput style={styles.input} value={state.password} textAlign='center' onFocus={() => { setIsShowKeyBoard(true) }} secureTextEntry={true} onChangeText={(value) => setState((prevState) => ({ ...prevState, password: value }))} />
                            </View>
                            <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={keyboardHide}>
                                <Text style={styles.btnTitle}>SIGN IN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{

                                marginTop: 20,
                                alignSelf: "center"
                            }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff'}}>New in application?<Text style={{
                                    fontSize: 30, color: 'red', alignItems: 'center'
                                }} onPress={() => navigation.navigate('Register')}>Sign up</Text></Text>
                            </TouchableOpacity>
                            {/* <Button title='go to register' onPress={() => navigation.navigate('Register')} /> */}
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
                <StatusBar style="auto" />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 100,
    },
    headerTitle: {
        fontSize: 30,
        color: '#fff'
    },
    btnTitle: {
        color: '#fff',
        fontSize: 20
    },
    btn: {
        height: 40,
        marginTop: 30,
        borderRadius: 6,
        borderWidth: 1,

        justifyContent: 'center',
        alignItems: "center",
        ...Platform.select({
            ios: {
                backgroundColor: 'transparent',
                borderColor: '#fff',
            },
            android: {
                backgroundColor: 'black',
                borderColor: 'red',
            },
        })

    },
    form: {
        // marginHorizontal: 20,
        // marginBottom: 80,
    },
    input: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 6,
        color: "#fff",
        height: 40,
        fontSize: 30,


    },
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    inputTitle: {
        color: 'white',
        fontSize: 30,
        marginBottom: 10
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
