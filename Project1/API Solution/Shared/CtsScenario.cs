// <copyright file="CtsScenario.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVNext.Api.Shared
{
    using System.Runtime.Serialization;

    /// <summary>
    /// The App Dev Scenario type.
    /// </summary>
    [DataContract]
    public partial class CtsScenario
    {
        /// <summary>
        /// Gets or sets the summarized list of statergies.
        /// </summary>
        [DataMember(Name = "strategies")]
        public IList<Strategy> Strategies { get; set; } = new List<Strategy>();

        /// <summary>
        /// Identifies whether the given object is duplicate or not.
        /// </summary>
        /// <param name="cloneCtsScenario">duplicate object.</param>
        /// <returns>returns true if the object is duplicated.</returns>
        internal bool IsDuplicate(CtsScenario cloneCtsScenario)
        {
            if (cloneCtsScenario == null)
            {
                return false;
            }

            for (int index = 0; index < this.Strategies.Count; index++)
            {
                if (!this.Strategies[index].IsDuplicate(cloneCtsScenario.Strategies[index]))
                {
                    return false;
                }
            }

            return true;
        }
    }
}
