using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Copilot.Backend.Core.Helpers
{
    internal class Helpers
    {
        public static (List<string>, List<string>, List<string>, List<string>) ParseAdditionalParams(string additionalParams)
        {
          
            // Initialize lists to store parsed parameters
            List<string> features = new List<string>();
            List<string> roles = new List<string>();
            List<string> tags = new List<string>();
            List<string> SourceSystem = new List<string>();
          

            if (!string.IsNullOrEmpty(additionalParams))
                return (features, roles, tags, SourceSystem);

            // Split the additionalParams string based on '&' to separate individual parameters
            string[] paramPairs = additionalParams.Split('&');

            // Process each parameter pair
            foreach (string pair in paramPairs)
            {
                // Split each parameter pair based on '=' to separate parameter name and values
                string[] keyValue = pair.Split('=');
                string paramName = keyValue[0]; // Parameter name
                string paramValueStr = keyValue[1]; // Parameter values as a string

                // Split the parameter values based on ',' to separate individual values
                string[] paramValues = paramValueStr.Split(',');

                // Add parameter values to the corresponding list
                switch (paramName)
                {
                    case "Feature":
                        features.AddRange(paramValues);
                        break;
                    case "Role":
                        roles.AddRange(paramValues);
                        break;
                    case "Tags":
                        tags.AddRange(paramValues);
                        break;
                    case "SourceSystem":
                        SourceSystem.AddRange(paramValues);
                        break;
                  
                    default:
                        break;
                }
            }

            return (features, roles, tags, SourceSystem);
        }
    }
}
