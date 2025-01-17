using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace TrackerSimulator
{
    public class ApiClient
    {
        private readonly HttpClient _httpClient;

        public ApiClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<TResponse?> SendPostRequestAsync<TRequest, TResponse>(string url, TRequest model)
        {
            try
            {
                // Wysłanie żądania POST z modelem w formacie JSON
                HttpResponseMessage response = await _httpClient.PostAsJsonAsync(url, model);

                // Sprawdzenie, czy odpowiedź jest poprawna
                response.EnsureSuccessStatusCode();

                // Deserializacja odpowiedzi na podany typ TResponse
                return await response.Content.ReadFromJsonAsync<TResponse>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Błąd podczas wysyłania żądania POST: {ex.Message}");
                return default;
            }
        }
    }
}
