// <copyright file="StackFrame.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Models
{
    /// <summary>
    /// The StackFrame type.
    /// </summary>
    public class StackFrame
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="StackFrame"/> class.
        /// </summary>
        public StackFrame()
        {
            this.Method = string.Empty;
            this.Assembly = string.Empty;
            this.FileName = string.Empty;
        }

        /// <summary>
        /// Gets or sets the level.
        /// </summary>
        /// <value>
        /// The level.
        /// </value>
        public int Level { get; set; }

        /// <summary>
        /// Gets or sets the method.
        /// </summary>
        /// <value>
        /// The method.
        /// </value>
        public string Method { get; set; }

        /// <summary>
        /// Gets or sets the assembly.
        /// </summary>
        /// <value>
        /// The assembly.
        /// </value>
        public string Assembly { get; set; }

        /// <summary>
        /// Gets or sets the name of the file.
        /// </summary>
        /// <value>
        /// The name of the file.
        /// </value>
        public string FileName { get; set; }

        /// <summary>
        /// Gets or sets the line.
        /// </summary>
        /// <value>
        /// The line.
        /// </value>
        public int Line { get; set; }
    }
}