// <copyright file="ValidationHelper.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Text.RegularExpressions;

namespace MCAPSHelpVNext.Controllers.Utility
{
    /// <summary>
    /// ValidationHelper
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ValidationHelper<T>
    {
        /// <summary>
        /// ValidateObject
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>

        public List<string> ValidateObject(T obj)
        {
            var errors = new List<string>();

            var properties = typeof(T).GetProperties();

            foreach (var property in properties)
            {
                var value = property.GetValue(obj);
                var propertyName = property.Name;

                if (IsPropertyNullable(property))
                {
                    continue;
                }

                if (Attribute.IsDefined(property, typeof(RequiredAttribute)) && (value == null || (value is string stringValue && string.IsNullOrEmpty(stringValue))))
                {
                    errors.Add($"{propertyName} is required.");
                }
            }

            return errors;
        }

        
        /// <summary>
        /// IsEmailValid
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public bool IsEmailValid(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return false;
            }

            const string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            Regex regex = new Regex(pattern);

            return regex.IsMatch(email);
        }

        private static bool IsPropertyNullable(PropertyInfo property)
        {
            return Nullable.GetUnderlyingType(property.PropertyType) != null || property.PropertyType == typeof(string);
        }
    }
}
