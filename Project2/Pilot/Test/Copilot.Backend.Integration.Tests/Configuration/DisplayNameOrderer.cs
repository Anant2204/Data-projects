//-----------------------------------------------------------------------
// <copyright file="DisplayNameOrderer.cs" company="Microsoft">
//     Copyright (c) Microsoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace Copilot.Backend.Integration.Tests;

/// <summary>
/// Runs the tests based on the test cases name
/// </summary>
public class DisplayNameOrdere : ITestCaseOrderer
{
    /// <summary>
    /// Orders the test cases via Test Method name
    /// </summary>
    /// <typeparam name="TTestCase">Test Case return type</typeparam>
    /// <param name="testCases">Test Cases</param>
    /// <returns>An Enumerable of Test Cases</returns>
    public IEnumerable<TTestCase> OrderTestCases<TTestCase>(
        IEnumerable<TTestCase> testCases) where TTestCase : ITestCase =>
        testCases.OrderBy(t => t.TestMethod.Method.Name);
}
