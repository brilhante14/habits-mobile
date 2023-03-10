import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { api } from "../api/axios";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDateSize = 18 * 8;
const amoutOfDaysToFill = minimumSummaryDateSize - datesFromYearStart.length;

export function Home() {
   const { navigate } = useNavigation();

   const [loading, setLoading] = useState(false);
   const [summary, setSummary] = useState(null);


   useEffect(() => {
      api.get('/summary').then(response => {
         console.log(response);
      });
      // (async () => {
      //    try {
      //       setLoading(true);
      //       console.log('ssss')
      //       const result = await api.get('/summary');
      //       console.log(result.data);
      //       setSummary(result.data);
      //    } catch (error: any) {
      //       Alert.alert('Ops', 'Não foi possível carregar o sumário');
      //       console.log(error);
      //    } finally {
      //       setLoading(false);
      //    }
      // })();
   }, [])

   if (loading) {
      return (<Loading />);
   }
   return (
      <View className="flex-1 bg-background px-8 pt-16">
         <Header />
         <View className="flex-row mt-6 mb-2">
            {
               weekDays.map((day, index) => (
                  <Text
                     key={`${day}-${index}`}
                     className="text-zinc-400 text-xl font-bold text-center mx-1"
                     style={{ width: DAY_SIZE }}
                  >
                     {day}
                  </Text>
               ))
            }
         </View>
         <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
         >

            <View className="flex-row flex-wrap">
               {datesFromYearStart.map((date) => (
                  <HabitDay
                     key={date.toISOString()}
                     onPress={() => navigate('habit', { date: date.toISOString() })}
                  />
               ))}

               {amoutOfDaysToFill > 0 &&
                  Array
                     .from({ length: amoutOfDaysToFill })
                     .map((_, index) => (
                        <View
                           key={index}
                           className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                           style={{ width: DAY_SIZE, height: DAY_SIZE }}
                        />
                     ))
               }
            </View>
         </ScrollView>
      </View>
   )
}