import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";

const availableWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function NewHabit() {
   const [weekDays, setWeekDays] = useState<number[]>([]);

   function handleToggleWeekDay(weekDayIndex: number) {
      if (weekDays.includes(weekDayIndex)) {
         setWeekDays(prevState => prevState.filter(day => day != weekDayIndex));
      } else {
         setWeekDays(prevState => { return [...prevState, weekDayIndex] });
      }
   }

   return (
      <View className="flex-1 bg-background px-8 pt-16">
         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
            <BackButton />

            <Text className="mt-6 text-white font-extrabold text-3xl">
               Create new habit
            </Text>

            <Text className="mt-6 text-white font-semibold text-base">
               What's your goal?
            </Text>

            <TextInput
               className="h-12 bg-zinc-900 rounded-lg pl-4 text-white mt-3 border-2 border-zinc-800 focus:border-green-600"
               placeholder="Ex.: Exercises, sleeping hours, etc..."
               placeholderTextColor={colors.zinc[400]}
            />

            <Text className="mt-4 mb-3 text-white font-semibold text-base">
               Set your frequency:
            </Text>
            {
               availableWeekDays.map((day, index) => (
                  <CheckBox
                     key={`${day}-${index}`}
                     checked={weekDays.includes(index)}
                     title={day}
                     onPress={() => handleToggleWeekDay(index)}
                  />
               ))
            }

            <TouchableOpacity
               className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
               activeOpacity={0.7}
            >
               <Feather
                  name="check"
                  size={20}
                  color={colors.white}
               />
               <Text className="text-white text-base font-semibold ml-2">
                  Submit
               </Text>
            </TouchableOpacity>
         </ScrollView>
      </View>
   );
}