using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TrackerSimulator
{
    public class GeoReadDTO
    {
        private long animalId{get;set;}
        private long trackerId{get;set;}
        private DateTime createdDate{get;set;}
        private double longitude{get;set;}
        private double latitude{get;set;}
        private double currentTemp{get;set;}
        private bool isTempExceeded{get;set;}
        private bool isAnimalInShepherd{get;set;}
        private bool tempExceededConfirmed{get;set;}
        private bool animalInShepherdConfirmed{get;set;}
    }
}
