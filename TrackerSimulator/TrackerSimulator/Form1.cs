using System.Text.Json;
using System.Text;
using static System.Net.Mime.MediaTypeNames;
using System;

namespace TrackerSimulator
{
    public partial class Form1 : Form
    {
        private int _timeBetweenSimulations = 0;
        private int _kmPerHour = 0;
        private int _idAnimal = 0;
        private int _idTracker= 0;
        private double _tempMin = 0;
        private double _tempMax = 0;
        private double _tempToSend = 0;
        private double _lat = 0;
        private double _lon = 0;
        private int _simulationsCount = 0;
        private DateTime _simulationStartDate = DateTime.Now;
        private System.Timers.Timer _timerSimulation;

        bool _simulationOn = false;
        public Form1()
        {
            InitializeComponent();

            AddAnimal();


        }

        async Task AddAnimal()
        {
            using var httpClient = new HttpClient();

            // Spring Boot URL
            var url = "http://localhost:8080/api/animal/add";

            // Create JSON payload
            var payload = new
            {
                name = "Krówka od testowania",
                type = "COW",
                tempMin = 30,
                tempMax = 36
            };

            // Serialize the payload to JSON
            var jsonPayload = JsonSerializer.Serialize(payload);

            // Create StringContent with application/json header
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            try
            {
                // Send POST request with JSON body
                var response = await httpClient.PostAsync(url, content);

                // Ensure the request was successful
                response.EnsureSuccessStatusCode();

                // Read and display the response
                var responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Response: " + responseContent);
                await AddTracker();
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Request error: {ex.Message}");
            }
        }
        async Task AddTracker()
        {
            using var httpClient = new HttpClient();

            // Spring Boot URL
            var url = "http://localhost:8080/api/tracker/add";

            // Create JSON payload
            var payload = new
            {
                animalId = 1,
                name = "Tracker dla  Krówki"

            };

            // Serialize the payload to JSON
            var jsonPayload = JsonSerializer.Serialize(payload);

            // Create StringContent with application/json header
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            try
            {
                // Send POST request with JSON body
                var response = await httpClient.PostAsync(url, content);

                // Ensure the request was successful
                response.EnsureSuccessStatusCode();

                // Read and display the response
                var responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Response: " + responseContent);
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Request error: {ex.Message}");
            }
        }




        private async void btnDelayedSimulation_Click(object sender, EventArgs e)
        {
            
            var btn = (Button)sender;
            if (btn.Text == "Zatrzymaj symulacjê")
            {
                btn.Text = "Rozpocznij symulacjê";
                lblSimulationCount.Text = "Zakoñczono symulacjê z liczb¹: " + _simulationsCount.ToString();

                _timerSimulation.Stop();
                _simulationOn = false;
                return;
            }


            if (_simulationOn)
            {
                MessageBox.Show("Jedna z symualacji jest uruchomiona, poczekaj na jej zakoñczenie lub zatrzymaj przebieg");
                return;
            }

            if (string.IsNullOrEmpty(txtTrackerId.Text) || string.IsNullOrEmpty(txtAnimalId.Text))
            {
                MessageBox.Show("Podaj wymagane Id");
                return;
            }
            if (string.IsNullOrEmpty(lat.Text))
            {
                MessageBox.Show("Proszê podaæ szerokoœæ geograficzn¹");
                return;
            }

            if (string.IsNullOrEmpty(lon.Text))
            {
                MessageBox.Show("Proszê podaæ d³ugoœæ geograficzn¹");
                return;
            }

            if (string.IsNullOrEmpty(tempMaxDelayed.Text))
            {
                MessageBox.Show("Proszê podaæ maksymaln¹ temperaturê symulacji");
                return;
            }
            if (string.IsNullOrEmpty(tempMinDelayed.Text))
            {
                MessageBox.Show("Proszê podaæ minimaln¹ temperaturê symulacji");
                return;
            }

            if (string.IsNullOrEmpty(txtTimeDelayedSimulation.Text))
            {
                MessageBox.Show("Proszê podaæ czas pomiêdzy odczytami");
                return;
            }

            if (string.IsNullOrEmpty(speedDelay.Text))
            {
                MessageBox.Show("Proszê podaæ prêdkoœæ poruszania siê");
                return;
            }

            _simulationOn = true;
            btn.Text = "Zatrzymaj symulacjê";

            _simulationsCount = 0;
            _timeBetweenSimulations = int.Parse(txtTimeDelayedSimulation.Text);
            _kmPerHour = int.Parse(speedDelay.Text);

            string tempMax = tempMaxDelayed.Text;
            if (tempMax.Last() == '.')
            {
                tempMax = tempMax.Replace(".", "");
            }
            _tempMax = double.Parse(tempMax.Replace(".", ","));

            string tempMin = tempMinDelayed.Text;
            if (tempMin.Last() == '.')
            {
                tempMin = tempMin.Replace(".", "");
            }
            _tempMin = double.Parse(tempMin.Replace(".", ","));

            string latitude = lat.Text;
            if (latitude.Last() == '.')
            {
                latitude = latitude.Replace(".", "");
            }
            _lat = double.Parse(latitude.Replace(".", ","));

            string longitude = lon.Text;
            if (longitude.Last() == '.')
            {
                longitude = longitude.Replace(".", "");
            }
            _lon = double.Parse(longitude.Replace(".", ","));

            double randomValue = new Random().NextDouble();
            _simulationStartDate = dateStartDelayed.Value;
            _timerSimulation = new System.Timers.Timer();
            _timerSimulation.Interval = _timeBetweenSimulations * 1000;
            _timerSimulation.Elapsed += _timerSimulation_Elapsed;
            _tempToSend = _tempMin + (randomValue * (_tempMax - _tempMin));

            _idAnimal = int.Parse(txtAnimalId.Text);
            _idTracker = int.Parse(txtTrackerId.Text);

            await SendPointToApi( true);

            _timerSimulation.Start();
        }

        private void _timerSimulation_Elapsed(object? sender, System.Timers.ElapsedEventArgs e)
        {
            _simulationStartDate = _simulationStartDate.AddSeconds(_timeBetweenSimulations);
            
            double randomValue = new Random().NextDouble();
            _tempToSend = _tempMin + (randomValue * (_tempMax - _tempMin));
            var random = new Random();
            MovementSimulator simulator = new MovementSimulator();
           (_lat,_lon) =  simulator.SimulateMove(_lat,_lon, random.Next(0, 1 + _kmPerHour), _timeBetweenSimulations*1000);

            SendPointToApi(true);
        }

        private void btnSimualtionNow_Click(object sender, EventArgs e)
        {
            var btn = (Button)sender;


            if (_simulationOn)
            {
                MessageBox.Show("Jedna z symualacji jest uruchomiona, poczekaj na jej zakoñczenie lub zatrzymaj przebieg");
                return;
            }

            if (string.IsNullOrEmpty(txtTrackerId.Text) || string.IsNullOrEmpty(txtAnimalId.Text))
            {
                MessageBox.Show("Podaj wymagane Id");
                return;
            }
            if (string.IsNullOrEmpty(lat.Text))
            {
                MessageBox.Show("Proszê podaæ szerokoœæ geograficzn¹");
                return;
            }

            if (string.IsNullOrEmpty(lon.Text))
            {
                MessageBox.Show("Proszê podaæ d³ugoœæ geograficzn¹");
                return;
            }

            if (string.IsNullOrEmpty(tempMaxNow.Text))
            {
                MessageBox.Show("Proszê podaæ maksymaln¹ temperaturê symulacji");
                return;
            }
            if (string.IsNullOrEmpty(tempMinNow.Text))
            {
                MessageBox.Show("Proszê podaæ minimaln¹ temperaturê symulacji");
                return;
            }

            if (string.IsNullOrEmpty(timeNow.Text))
            {
                MessageBox.Show("Proszê podaæ czas pomiêdzy odczytami");
                return;
            }

            if (string.IsNullOrEmpty(speedNow.Text))
            {
                MessageBox.Show("Proszê podaæ prêdkoœæ poruszania siê");
                return;
            }
            _simulationOn = true;

            _idAnimal = int.Parse(txtAnimalId.Text);
            _idTracker = int.Parse(txtTrackerId.Text);
            _timeBetweenSimulations = int.Parse(timeNow.Text);
            _kmPerHour = int.Parse(speedNow.Text);
            _idAnimal = int.Parse(txtAnimalId.Text);
            _idTracker = int.Parse(txtTrackerId.Text);

            string tempMax = tempMaxNow.Text;
            if (tempMax.Last() == '.')
            {
                tempMax = tempMax.Replace(".", "");
            }
            _tempMax = double.Parse(tempMax.Replace(".", ","));

            string tempMin = tempMinNow.Text;
            if (tempMin.Last() == '.')
            {
                tempMin = tempMin.Replace(".", "");
            }
            _tempMin = double.Parse(tempMin.Replace(".", ","));

            string latitude = lat.Text;
            if (latitude.Last() == '.')
            {
                latitude = latitude.Replace(".", "");
            }
            _lat = double.Parse(latitude.Replace(".", ","));

            string longitude = lon.Text;
            if (longitude.Last() == '.')
            {
                longitude = longitude.Replace(".", "");
            }
            _lon = double.Parse(longitude.Replace(".", ","));
            _simulationStartDate = dateNow.Value;
            _simulationsCount = 0;

            double randomValue = new Random().NextDouble();
            _tempToSend = _tempMin + (randomValue * (_tempMax - _tempMin));
            StartFastSimulation(int.Parse(loopCountNow.Text));

        }

        private async Task StartFastSimulation(int loops)
        {
            var random = new Random();
            for (int i = 0; i < loops; i++)
            {
                var send = await SendPointToApi(true);
                if (!send)
                {
                    Thread.Sleep(1000);
                }


                _simulationStartDate = _simulationStartDate.AddSeconds(_timeBetweenSimulations);

                double randomValue = new Random().NextDouble();
                _tempToSend = _tempMin + (randomValue * (_tempMax - _tempMin));

                MovementSimulator simulator = new MovementSimulator();
                (_lat, _lon) = simulator.SimulateMove(_lat, _lon, random.Next(0,1+_kmPerHour), _timeBetweenSimulations*1000);
            }

          

                if (lblSimulationCount.InvokeRequired)
                {
                    lblSimulationCount.Invoke(new Action(() =>
                    {
                        lblSimulationCount.Text = "Zakoñczono symulacjê z liczb¹: " + _simulationsCount.ToString();
                    }));
                }
                else
                {
                    lblSimulationCount.Text = "Zakoñczono symulacjê z liczb¹: " + _simulationsCount.ToString();
                }

            _simulationOn = false;

        }

        private void btnOnePoint_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(txtTrackerId.Text) || string.IsNullOrEmpty(txtAnimalId.Text))
            {
                MessageBox.Show("Podaj wymagane Id");
                return;
            }
            if (string.IsNullOrEmpty(lat.Text))
            {
                MessageBox.Show("Proszê podaæ szerokoœæ geograficzn¹");
                return;
            }

            if (string.IsNullOrEmpty(lon.Text))
            {
                MessageBox.Show("Proszê podaæ d³ugoœæ geograficzn¹");
                return;
            }

            if (string.IsNullOrEmpty(tempOnePoint.Text))
            {
                MessageBox.Show("Proszê podaæ maksymaln¹ temperaturê symulacji");
                return;
            }

            _idAnimal = int.Parse(txtAnimalId.Text);
            _idTracker = int.Parse(txtTrackerId.Text);

            string tempMax = tempOnePoint.Text;
            if (tempMax.Last() == '.')
            {
                tempMax = tempMax.Replace(".", "");
            }
            _tempToSend = double.Parse(tempMax.Replace(".", ","));

            string latitude = lat.Text;
            if (latitude.Last() == '.')
            {
                latitude = latitude.Replace(".", "");
            }
            _lat = double.Parse(latitude.Replace(".", ","));

            string longitude = lon.Text;
            if (longitude.Last() == '.')
            {
                longitude = longitude.Replace(".", "");
            }
            _lon = double.Parse(longitude.Replace(".", ","));
            _simulationStartDate = dateOnePoint.Value;
          

            SendPointToApi();
        }


        private async Task<bool> SendPointToApi(bool updateCounter = false)
        {
            using var httpClient = new HttpClient();

            // Spring Boot URL
            var url = "http://localhost:8080/api/geoRead/add";

            // Create JSON payload
            var payload = new
            {
                animalId = _idAnimal,
                trackerId = _idTracker,
                createdDate = _simulationStartDate.ToString("yyyy-MM-dd'T'HH:mm:ss"),
                longitude = _lon,
                latitude = _lat,
                currentTemp = Math.Round(_tempToSend,1),
                isTempExceeded = false,
                isAnimalInShepherd = false,
                tempExceededConfirmed = false,
                animalInShepherdConfirmed = false
            };

            // Serialize the payload to JSON
            var jsonPayload = JsonSerializer.Serialize(payload);

            // Create StringContent with application/json header
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            try
            {
                // Send POST request with JSON body
                var response = await httpClient.PostAsync(url, content);

                // Ensure the request was successful
                response.EnsureSuccessStatusCode();
                // Read and display the response
                var responseContent = await response.Content.ReadAsStringAsync();

                if (updateCounter)
                {
                    _simulationsCount++;

                    if (lblSimulationCount.InvokeRequired)
                    {
                        lblSimulationCount.Invoke(new Action(() =>
                        {
                            lblSimulationCount.Text = "Liczba wys³anych punktów: " + _simulationsCount.ToString();
                        }));
                    }
                    else
                    {
                        lblSimulationCount.Text = "Liczba wys³anych punktów: " + _simulationsCount.ToString();
                    }
                }
                return true;

            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Request error: {ex.Message}");
                return false;
            }
        }

        private async Task SendPoint()
        {
           
        }

        private void temp_KeyPress(object sender, KeyPressEventArgs e)
        {
            var txt = (TextBox)sender;
            // Allow control keys (backspace, delete, etc.)
            if (char.IsControl(e.KeyChar))
            {
                return;
            }

            // Allow digits
            if (char.IsDigit(e.KeyChar))
            {
                return;
            }

            // Allow one decimal point
            if (e.KeyChar == '.' && !txt.Text.Contains("."))
            {
                return;
            }

            // If we get here, the character is not allowed
            e.Handled = true;
        }

        private void temp_TextChanged(object sender, EventArgs e)
        {
            var txt = (TextBox)sender;

            if (txt.Text.Contains("."))
            {
                string[] parts = txt.Text.Split('.');
                if (parts.Length > 1 && parts[1].Length > 1)
                {
                    txt.Text = parts[0] + "." + parts[1].Substring(0, 1);
                    txt.SelectionStart = txt.Text.Length; // Move cursor to the end
                }
            }

            if (double.TryParse(txt.Text.Replace(".", ","), out double value))
            {
                if (value < 0 || value > 50)
                {
                    MessageBox.Show("Value must be between 15 and 50.");
                    txt.Text = "";
                }
            }
        }



        private void lat_KeyPress(object sender, KeyPressEventArgs e)
        {
            var txt = (TextBox)sender;

            // Allow control keys (backspace, delete, etc.)
            if (char.IsControl(e.KeyChar))
            {
                return;
            }

            // Allow digits
            if (char.IsDigit(e.KeyChar))
            {
                return;
            }

            // Allow one decimal point
            if (e.KeyChar == '.' && !txt.Text.Contains("."))
            {
                return;
            }


            // Allow minus sign, but only at the beginning
            if (e.KeyChar == '-' && txt.SelectionStart == 0 && !txt.Text.Contains("-"))
            {
                return;
            }

            // If we get here, the character is not allowed
            e.Handled = true;
        }

        private void lat_TextChanged(object sender, EventArgs e)
        {
            var txt = (TextBox)sender;
            // Validate the input to ensure only six decimal places
            if (txt.Text.Contains("."))
            {
                string[] parts = txt.Text.Split('.');
                if (parts.Length > 1 && parts[1].Length > 6)
                {
                    txt.Text = parts[0] + "." + parts[1].Substring(0, 6);
                    txt.SelectionStart = txt.Text.Length; // Move cursor to the end
                }
            }

            // Validate the input to ensure it's within the range -85 to 85
            if (double.TryParse(txt.Text.Replace(".", ","), out double value))
            {
                if (value < -85 || value > 85)
                {
                    MessageBox.Show("Value must be between -85 and 85.");
                    txt.Text = "";
                }
            }
        }



        private void long_TextChanged(object sender, EventArgs e)
        {
            var txt = (TextBox)sender;
            // Validate the input to ensure only six decimal places
            if (txt.Text.Contains("."))
            {
                string[] parts = txt.Text.Split('.');
                if (parts.Length > 1 && parts[1].Length > 6)
                {
                    txt.Text = parts[0] + "." + parts[1].Substring(0, 6);
                    txt.SelectionStart = txt.Text.Length; // Move cursor to the end
                }
            }

            // Validate the input to ensure it's within the range -85 to 85
            if (double.TryParse(txt.Text.Replace(".", ","), out double value))
            {
                if (value < -180 || value > 180)
                {
                    MessageBox.Show("Value must be between 180 and 180");
                    txt.Text = "";
                }
            }
        }

        private void textBox5_TextChanged(object sender, EventArgs e)
        {

        }



        private void time_KeyPress(object sender, KeyPressEventArgs e)
        {
            var txt = (TextBox)sender;
            // Allow control keys (backspace, delete, etc.)
            if (char.IsControl(e.KeyChar))
            {
                return;
            }

            // Allow digits
            if (char.IsDigit(e.KeyChar))
            {
                return;
            }



            // If we get here, the character is not allowed
            e.Handled = true;
        }

        private void time_TextChanged(object sender, EventArgs e)
        {
            var txt = (TextBox)sender;


            if (double.TryParse(txt.Text.Replace(".", ","), out double value))
            {
                if (value < 0 || value > 60 * 60)
                {
                    MessageBox.Show("maksymalnie 3600 sekund");
                    txt.Text = "";
                }
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }
}
