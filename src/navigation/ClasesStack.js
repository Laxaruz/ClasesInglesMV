import react from "react";
import {crateNativestackNavigator} from '@react-navigation/native-stack';
import ClasesScreen from '../screens/ClasesScreen';
import {color} from '../theme';

const Stack = createNativeStackNavigator();

export default function ClasesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={ClasesScreen}
                options={{headerShown: false}}

            />
            <Stack.Screen
                name="Detalle"
                component={DetalleScreen}
            />

        </Stack.Navigator>
    )
}