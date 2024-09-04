// <copyright file="SanitizeExtensions.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Common.Logging.Models
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Extension methods to support sanitizing log data.
    /// </summary>
    internal static class SanitizeExtensions
    {
        /// <summary>
        /// The maximum dictionary name length.
        /// </summary>
        public const int MaxDictionaryNameLength = 150;

        /// <summary>
        /// The maximum dependency type length.
        /// </summary>
        public const int MaxDependencyTypeLength = 1024;

        /// <summary>
        /// The maximum value length.
        /// </summary>
        public const int MaxValueLength = 8192;

        /// <summary>
        /// The maximum result code length.
        /// </summary>
        public const int MaxResultCodeLength = 1024;

        /// <summary>
        /// The maximum event name length.
        /// </summary>
        public const int MaxEventNameLength = 512;

        /// <summary>
        /// The maximum name length.
        /// </summary>
        public const int MaxNameLength = 1024;

        /// <summary>
        /// The maximum message length.
        /// </summary>
        public const int MaxMessageLength = 32768;

        /// <summary>
        /// The maximum URL length.
        /// </summary>
        public const int MaxUrlLength = 2048;

        /// <summary>
        /// The maximum data length.
        /// </summary>
        public const int MaxDataLength = 8192;

        /// <summary>
        /// The maximum test name length.
        /// </summary>
        public const int MaxTestNameLength = 1024;

        /// <summary>
        /// The maximum run location length.
        /// </summary>
        public const int MaxRunLocationLength = 2024;

        /// <summary>
        /// The maximum availability message length.
        /// </summary>
        public const int MaxAvailabilityMessageLength = 8192;

        /// <summary>
        /// Sets the specified property value.
        /// </summary>
        /// <typeparam name="T">The type of the property.</typeparam>
        /// <param name="property">The property.</param>
        /// <param name="value">The value.</param>
        /// <exception cref="ArgumentNullException">Throws when value is null.</exception>
        public static void Set<T>(ref T property, T value)
            where T : class =>
            property = value ?? throw new ArgumentNullException(nameof(value));

        /// <summary>
        /// Initializes the specified property.
        /// </summary>
        /// <typeparam name="T">The type of the underlying structure.</typeparam>
        /// <param name="property">The property.</param>
        /// <param name="value">The value.</param>
        public static void Initialize<T>(ref T? property, T? value)
            where T : struct
        {
            if (property.HasValue)
            {
                return;
            }

            property = value;
        }

        /// <summary>
        /// Initializes the specified property.
        /// </summary>
        /// <param name="property">The property.</param>
        /// <param name="value">The value.</param>
        public static void Initialize(ref string property, string value)
        {
            if (string.IsNullOrEmpty(property))
            {
                property = value;
            }
        }

        /// <summary>
        /// Sanitizes the name of the event.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>The sanitized value.</returns>
        public static string SanitizeEventName(this string name) => TrimAndTruncate(name, MaxEventNameLength);

        /// <summary>
        /// Sanitizes the name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>The sanitized value.</returns>
        public static string SanitizeName(this string name) => TrimAndTruncate(name, MaxNameLength);

        /// <summary>
        /// Sanitizes the type of the dependency.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>The sanitized value.</returns>
        public static string SanitizeDependencyType(this string value) => TrimAndTruncate(value, MaxDependencyTypeLength);

        /// <summary>
        /// Sanitizes the result code.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>The sanitized value.</returns>
        public static string SanitizeResultCode(this string value) => TrimAndTruncate(value, MaxResultCodeLength);

        /// <summary>
        /// Sanitizes the value.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>The sanitized value.</returns>
        public static string SanitizeValue(this string value) => TrimAndTruncate(value, MaxValueLength);

        /// <summary>
        /// Sanitizes the message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <returns>The sanitized message value.</returns>
        public static string SanitizeMessage(this string message) => TrimAndTruncate(message, MaxMessageLength);

        /// <summary>
        /// Sanitizes the data.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <returns>The sanitized value.</returns>
        public static string SanitizeData(this string message) => TrimAndTruncate(message, MaxDataLength);

        /// <summary>
        /// Sanitizes the URI.
        /// </summary>
        /// <param name="uri">The URI.</param>
        /// <returns>Uri in sanitized format.</returns>
        public static Uri SanitizeUri(this Uri uri)
        {
            const int intNo = 2048;
            if (uri == null)
            {
                return uri;
            }

            string text = uri.ToString();
            if (text.Length > MaxUrlLength)
            {
                text = text.Substring(0, intNo);
                if (Uri.TryCreate(text, UriKind.RelativeOrAbsolute, out Uri uri2))
                {
                    uri = uri2;
                }
            }

            return uri;
        }

        /// <summary>
        /// Sanitizes the name of the test.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>The sanitized value.</returns>
        public static string SanitizeTestName(this string value) => TrimAndTruncate(value, MaxTestNameLength);

        /// <summary>
        /// Sanitizes the run location.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>The sanitized value.</returns>
        public static string SanitizeRunLocation(this string value) => TrimAndTruncate(value, MaxRunLocationLength);

        /// <summary>
        /// Sanitizes the availability message.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>tThe sanitized value.</returns>
        public static string SanitizeAvailabilityMessage(this string value) => TrimAndTruncate(value, MaxAvailabilityMessageLength);

        /// <summary>
        /// Sanitizes the properties.
        /// </summary>
        /// <param name="dictionary">The dictionary.</param>
        public static void SanitizeProperties(this IDictionary<string, string> dictionary)
        {
            if (dictionary == null)
            {
                return;
            }

            var dictionary2 = new Dictionary<string, KeyValuePair<string, string>>(dictionary.Count);
            foreach (var current in dictionary)
            {
                var text = SanitizeKey(current.Key);
                var text2 = current.Value.SanitizeValue();
                if (string.IsNullOrEmpty(text2) || string.CompareOrdinal(text, current.Key) != 0 || string.CompareOrdinal(text2, current.Value) != 0)
                {
                    dictionary2.Add(current.Key, new KeyValuePair<string, string>(text, text2));
                }
            }

            foreach (var current2 in dictionary2)
            {
                dictionary.Remove(current2.Key);
                if (!string.IsNullOrEmpty(current2.Value.Value))
                {
                    var key = MakeKeyUnique(current2.Value.Key, dictionary);
                    dictionary.Add(key, current2.Value.Value);
                }
            }
        }

        /// <summary>
        /// Trims the specified value and truncates to the specified length.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="maxLength">The maximum length.</param>
        /// <returns>The updated value.</returns>
        private static string TrimAndTruncate(string value, int maxLength)
        {
            if (value == null)
            {
                return value;
            }

            value = value.Trim();
            value = Truncate(value, maxLength);
            return value;
        }

        /// <summary>
        /// Truncates the specified value.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="maxLength">The maximum length.</param>
        /// <returns>The truncated value.</returns>
        private static string Truncate(string value, int maxLength) => value.Length <= maxLength ? value : value.Substring(0, maxLength);

        /// <summary>
        /// Sanitizes the key.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns>The sanitized value.</returns>
        private static string SanitizeKey(string key) => MakeKeyNonEmpty(TrimAndTruncate(key, MaxDictionaryNameLength));

        /// <summary>
        /// Initializes the key if empty.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns>The initialized key.</returns>
        private static string MakeKeyNonEmpty(string key) => !string.IsNullOrEmpty(key) ? key : "required";

        /// <summary>
        /// Makes the key unique.
        /// </summary>
        /// <typeparam name="TValue">The type of the value.</typeparam>
        /// <param name="key">The key.</param>
        /// <param name="dictionary">The dictionary.</param>
        /// <returns>The unique key.</returns>
        private static string MakeKeyUnique<TValue>(string key, IDictionary<string, TValue> dictionary)
        {
            if (!dictionary.ContainsKey(key))
            {
                return key;
            }

            var arg = Truncate(key, 147);
            var num = 1;
            do
            {
                key = arg + num;
                num++;
            }
            while (dictionary.ContainsKey(key));

            return key;
        }
    }
}