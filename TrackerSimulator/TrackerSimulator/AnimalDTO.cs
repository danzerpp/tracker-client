

namespace TrackerSimulator
{
    public class AnimalDTO
    {
        private string Name{get; set;}
        private double TempMax{get; set;}
        private double TempMin{get; set;}
        private string Type{get;set;}

        public AnimalDTO()
        {
                
        }
        public AnimalDTO(string name, double tempMax, double tempMin, string type)
        {
            this.Name = name;
            this.TempMax = tempMax;
            this.TempMin = tempMin;
            this.Type = type;
        }
    }
}
