using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrackerSimulator
{
    public class MovementSimulator
    {

        public (double latitude, double longitude) SimulateMove(double latitude, double longitude, double speedKmH)
        {

            // Parametry symulacji
            int intervalMs = 1000; // Interwał czasu (1 sekunda)

            // Inicjalizacja generatora losowego
            Random random = new Random();


            Console.WriteLine("Symulacja ruchu zwierzęcia");
            Console.WriteLine($"Początkowe współrzędne: {latitude}, {longitude}");

          
                // Oblicz przesunięcie na podstawie prędkości i czasu
                double distanceKm = (speedKmH * intervalMs) / (1000 * 3600); // Odległość w km

                // Losowy kierunek (kąt w radianach)
                double angle = random.NextDouble() * 2 * Math.PI;

                // Obliczenie przesunięcia w kierunku szerokości i długości
                double deltaLatitude = distanceKm * Math.Cos(angle) / 111.32; // Szerokość (1 stopień = ~111.32 km)
                double deltaLongitude = distanceKm * Math.Sin(angle) / (111.32 * Math.Cos(latitude * Math.PI / 180)); // Długość (uwzględnia szerokość)

                // Aktualizacja współrzędnych
                latitude += deltaLatitude;
                longitude += deltaLongitude;


                // Wyświetlenie nowych współrzędnych i odległości
                Console.WriteLine("Symulacja ruchu zwierzęcia");
                Console.WriteLine($"Aktualne współrzędne: {latitude:F6}, {longitude:F6}");

                return(latitude, longitude);
        }
    }
}
