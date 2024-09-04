// <copyright file="ValidateModelStateAttribute.cs" company="Microsoft Corporation">
// copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// <author></author>
// <date></date>
// <summary></summary>

namespace MCAPSHelpVnext.Api.Attributes
{
    using System.ComponentModel.DataAnnotations;
    using System.Reflection;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Controllers;
    using Microsoft.AspNetCore.Mvc.Filters;
    using Microsoft.AspNetCore.Mvc.ModelBinding;

    #nullable enable

    /// <summary>
    /// Model state validation attribute.
    /// </summary>
    public class ValidateModelStateAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// Called before the action method is invoked.
        /// </summary>
        /// <param name="context">The execution context.</param>
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            if (context.ActionDescriptor is ControllerActionDescriptor descriptor)
            {
                foreach (var parameter in descriptor.MethodInfo.GetParameters())
                {
                    object? args = null;
                    if (parameter.Name != null && context.ActionArguments.ContainsKey(parameter.Name))
                    {
                        args = context.ActionArguments[parameter.Name];
                    }

                    ValidateAttributes(parameter, args, context.ModelState);
                }
            }

            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(context.ModelState);
            }
        }

        private static void ValidateAttributes(ParameterInfo parameter, object? args, ModelStateDictionary modelState)
        {
            foreach (var attributeData in parameter.CustomAttributes)
            {
                var attributeInstance = parameter.GetCustomAttribute(attributeData.AttributeType);

                if (attributeInstance is ValidationAttribute validationAttribute)
                {
                    var isValid = validationAttribute.IsValid(args);
                    if (!isValid && parameter.Name != null)
                    {
                        modelState.AddModelError(parameter.Name, validationAttribute.FormatErrorMessage(parameter.Name));
                    }
                }
            }
        }
    }
}
