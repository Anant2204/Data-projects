// <copyright file="ExceptionMessage.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Models
{
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Diagnostics.Tracing;
    using System.Linq;
    using System.Reflection;
    using System.Runtime.Serialization;
    using System.Text;
    using System.Text.Json.Serialization;
    using Validation;

    /// <summary>
    /// The Exception message schema.
    /// </summary>
    /// <seealso cref="ITelemetryMessage" />
    [DataContract(Name = "ExceptionMessage", Namespace = "Azure")]
    public sealed class ExceptionMessage : ITelemetryMessage
    {
        /// <summary>
        /// The maximum parsed stack length.
        /// </summary>
        public static readonly int MaxParsedStackLength = 16384;
       

        /// <summary>
        /// Initializes a new instance of the <see cref="ExceptionMessage"/> class.
        /// </summary>
        public ExceptionMessage()
        {
            this.Data = new MessageData();
            this.Timestamp = DateTime.UtcNow;
            this.Properties = new ConcurrentDictionary<string, string>();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ExceptionMessage"/> class.
        /// </summary>
        /// <param name="exception">The exception.</param>
        public ExceptionMessage(Exception exception)
            : this()
        {
            Requires.NotNull(exception, "exception");
            this.RawException = exception;
            this.UpdateExceptions(exception);
        }

        /// <summary>
        /// Gets or sets the user message.
        /// </summary>
        /// <value>
        /// The user message.
        /// </value>
        [DataMember]
        public string UserMessage { get; set; }

        /// <summary>
        /// Gets the exceptions.
        /// </summary>
        /// <value>
        /// The exceptions.
        /// </value>
        [DataMember]
        public IList<ExceptionDetails> Exceptions { get; private set; } = new List<ExceptionDetails>();

        /// <summary>
        /// Gets the name of the schema.
        /// </summary>
        /// <value>
        /// The name of the schema.
        /// </value>
        [JsonIgnore]
        public string SchemaName => "Exceptions";

        /// <summary>
        /// Gets the Raw Exception.
        /// </summary>
        /// <value>
        /// The raw exception data.
        /// </value>
        [JsonIgnore]
        public Exception RawException { get; private set; }

        /// <summary>
        /// Gets the log data.
        /// </summary>
        public MessageData Data { get; }

        /// <summary>
        /// Gets or sets date and time when telemetry was recorded.
        /// </summary>
        [DataMember]
        public DateTimeOffset Timestamp { get; set; }

        /// <summary>
        /// Gets or sets the tag.
        /// </summary>
        /// <value>
        /// The tag.
        /// </value>
        [DataMember]
        public string Tag { get; set; }

        /// <summary>
        /// Gets or sets the activity identifier to track end to end tracing.
        /// </summary>
        /// <value>
        /// The activity identifier.
        /// </value>
        [DataMember]
        public string ActivityId { get; set; }

        /// <summary>
        /// Gets or sets the authenticated user id.
        /// </summary>
        /// <value>
        /// The user id.
        /// </value>
        [DataMember]
        public string UserId { get; set; }

        /// <summary>
        /// Gets or sets Exception severity level.
        /// </summary>
        [DataMember]
        public EventLevel Level { get; set; }

        /// <summary>
        /// Gets or sets the value that defines absolute order of the telemetry item.
        /// </summary>
        [DataMember]
        public string Sequence { get; set; }

        /// <summary>
        /// Gets the dictionary of application-defined property names and values providing additional information about this exception.
        /// </summary>
        [DataMember]
        public IDictionary<string, string> Properties { get; private set; }

        /// <summary>
        /// Sanitizes this instance data.
        /// </summary>
        public void Sanitize()
        {
            this.UserMessage.SanitizeMessage();
            this.Tag = this.Tag.SanitizeName();
            this.ActivityId = this.ActivityId.SanitizeName();
            this.Properties.SanitizeProperties();
        }

        /// <summary>
        /// Formats the message for logging.
        /// </summary>
        public void FormatMessage()
        {
            this.Sanitize();
            this.Data.Format(this);
        }

        /// <summary>
        /// Converts to string.
        /// </summary>
        /// <returns>
        /// A <see cref="string" /> that represents this instance.
        /// </returns>
        public override string ToString()
        {
            var sb = new StringBuilder();
            this.Exceptions.ToList().ForEach(ex => sb.AppendLine(ex.ToString()));
            return sb.ToString();
        }

        /// <summary>
        /// Converts a System.Exception to a <see cref="ExceptionDetails"/> instance.
        /// </summary>
        /// <param name="exceptionData">The <see cref="Exception"/>.</param>
        /// <param name="parentExceptionDetails">The parent <see cref="ExceptionDetails"/>.</param>
        /// <returns>The <see cref="ExceptionDetails"/>.</returns>
        internal static ExceptionDetails ConvertToExceptionDetails(Exception exceptionData, ExceptionDetails parentExceptionDetails)
        {
            var exceptionDetails = ExceptionDetails.CreateWithoutStackInfo(exceptionData, parentExceptionDetails);
            Tuple<List<StackFrame>, bool> tuple = SanitizeStackFrame(new StackTrace(exceptionData, true).GetFrames(), GetStackFrame, GetStackFrameLength);
            tuple.Item1.ForEach(i => exceptionDetails.ParsedStack.Add(i));
            exceptionDetails.HasFullStack = tuple.Item2;
            return exceptionDetails;
        }

        /// <summary>
        /// Sanitizing stack to 32k while selecting the initial and end stack trace.
        /// </summary>
        private static Tuple<List<TOutput>, bool> SanitizeStackFrame<TInput, TOutput>(IList<TInput> inputList, Func<TInput, int, TOutput> converter, Func<TOutput, int> lengthGetter)
        {
            const int int2 = 2;

            List<TOutput> list = new List<TOutput>();
            bool item = true;
            if (inputList.Any())
            {
                int num = 0;
                for (int i = 0; i < inputList.Count; i++)
                {
                    int num2 = i % 2 == 0 ? inputList.Count - 1 - (i / 2) : i / 2;
                    TOutput tOutput = converter(inputList[num2], num2);
                    num += lengthGetter(tOutput);
                    if (num > SanitizeExtensions.MaxMessageLength)
                    {
                        item = false;
                        break;
                    }

                    list.Insert(list.Count / int2, tOutput);
                }
            }

            return new Tuple<List<TOutput>, bool>(list, item);
        }

        /// <summary>
        /// Converts a <see cref="System.Diagnostics.StackFrame"/> to a <see cref="StackFrame"/>.
        /// </summary>
        /// <param name="stackFrame">The <see cref="System.Diagnostics.StackFrame"/>.</param>
        /// <param name="frameId">The frame id.</param>
        /// <returns>The <see cref="StackFrame"/>.</returns>
        private static StackFrame GetStackFrame(System.Diagnostics.StackFrame stackFrame, int frameId)
        {
            var stackFrame2 = new StackFrame
            {
                Level = frameId,
            };

            MethodBase method = stackFrame.GetMethod();
            stackFrame2.Method = method.DeclaringType != null ? method.DeclaringType.FullName + "." + method.Name : method.Name;
            stackFrame2.Assembly = method.Module.Assembly.FullName;
            stackFrame2.FileName = stackFrame.GetFileName();
            stackFrame2.Line = stackFrame.GetFileLineNumber();
            return stackFrame2;
        }

        /// <summary>
        /// Gets the stack frame length for only the strings in the stack frame.
        /// </summary>
        private static int GetStackFrameLength(StackFrame stackFrame) =>
            (stackFrame.Method == null ? 0 : stackFrame.Method.Length) +
            (stackFrame.Assembly == null ? 0 : stackFrame.Assembly.Length) +
            (stackFrame.FileName == null ? 0 : stackFrame.FileName.Length);

        private void ConvertExceptionTree(Exception exceptionData, ExceptionDetails parentExceptionDetails, List<ExceptionDetails> exceptions)
        {
            var exceptionDetails = ConvertToExceptionDetails(exceptionData, parentExceptionDetails);
            exceptions.Add(exceptionDetails);
            if (exceptionData is AggregateException ex)
            {
                using var enumerator = ex.InnerExceptions.GetEnumerator();
                while (enumerator.MoveNext())
                {
                    var current = enumerator.Current;
                    this.ConvertExceptionTree(current, exceptionDetails, exceptions);
                }

                return;
            }

            if (exceptionData.InnerException != null)
            {
                this.ConvertExceptionTree(exceptionData.InnerException, exceptionDetails, exceptions);
            }
        }

        /// <summary>
        /// Updates the exceptions.
        /// </summary>
        /// <param name="exceptionData">The exception data.</param>
        private void UpdateExceptions(Exception exceptionData)
        {
            const int int10 = 10;

            var list = new List<ExceptionDetails>();
            this.ConvertExceptionTree(exceptionData, null, list);
            if (list.Count > int10)
            {
                list.RemoveRange(int10, list.Count - int10);
            }

            this.Exceptions = list;
        }
    }
}