// <copyright file="ExceptionDetails.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Validation;

    /// <summary>
    /// The Exception Details schema.
    /// </summary>
    public class ExceptionDetails
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ExceptionDetails"/> class.
        /// </summary>
        public ExceptionDetails()
        {
            this.TypeName = string.Empty;
            this.Message = string.Empty;
            this.HasFullStack = true;
            this.ParsedStack = new List<StackFrame>();
        }

        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the outer identifier.
        /// </summary>
        /// <value>
        /// The outer identifier.
        /// </value>
        public int OuterId { get; set; }

        /// <summary>
        /// Gets or sets the name of the type.
        /// </summary>
        /// <value>
        /// The name of the type.
        /// </value>
        public string TypeName { get; set; }

        /// <summary>
        /// Gets or sets the message.
        /// </summary>
        /// <value>
        /// The message.
        /// </value>
        public string Message { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this instance has full stack.
        /// </summary>
        /// <value>
        ///   <c>true</c> if this instance has full stack; otherwise, <c>false</c>.
        /// </value>
        public bool HasFullStack { get; set; }

        /// <summary>
        /// Gets the parsed stack.
        /// </summary>
        /// <value>
        /// The parsed stack.
        /// </value>
        public IList<StackFrame> ParsedStack { get; private set; }

        /// <summary>
        /// Converts to string.
        /// </summary>
        /// <returns>
        /// A <see cref="string" /> that represents this instance.
        /// </returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            this.ParsedStack.ToList().ForEach(s => sb.AppendLine($"at {s.Method} in {s.FileName}:line {s.Line}"));
            return $"{this.TypeName}: {this.Message}{Environment.NewLine}{sb}";
        }

        /// <summary>
        /// Creates a new instance of ExceptionDetails from a System.Exception and a parent ExceptionDetails.
        /// </summary>
        /// <param name="exception">The <see cref="Exception"/> object.</param>
        /// <param name="parentExceptionDetails">The parent <see cref="ExceptionDetails"/>.</param>
        /// <returns>The <see cref="ExceptionDetails"/> instance.</returns>
        internal static ExceptionDetails CreateWithoutStackInfo(Exception exception, ExceptionDetails parentExceptionDetails)
        {
            Requires.NotNull(exception, "exception");

            var exceptionDetails = new ExceptionDetails
            {
                Id = exception.GetHashCode(),
                TypeName = exception.GetType().FullName,
                Message = exception.Message,
            };

            if (parentExceptionDetails != null)
            {
                exceptionDetails.OuterId = parentExceptionDetails.Id;
            }

            return exceptionDetails;
        }
    }
}