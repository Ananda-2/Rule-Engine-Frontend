import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Assuming the CSS is stored in a separate file

function RuleEngine() {
  const [rule, setRule] = useState("");
  const [rulesToCombine, setRulesToCombine] = useState([]);
  const [ast, setAst] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [ruleIdToModify, setRuleIdToModify] = useState("");
  const [newRuleString, setNewRuleString] = useState("");

  // Create a new rule
  const handleCreateRule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://rule-engine-server-2mnf.onrender.com/create_rule",
        {
          rule,
        }
      );
      setAst(JSON.stringify(response.data.ast, null, 2));
      setError("");
      setRule(""); // Clear input
    } catch (err) {
      setError(err.response?.data.error || "Error creating rule");
    }
  };

  // Combine multiple rules
  const handleCombineRules = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://rule-engine-server-2mnf.onrender.com/combine_rules",
        {
          rules: rulesToCombine,
        }
      );
      setAst(JSON.stringify(response.data.ast, null, 2));
      setError("");
    } catch (err) {
      setError(err.response?.data.error || "Error combining rules");
    }
  };

  // Evaluate the rule with data
  const handleEvaluateRule = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(data); // Convert input string to JSON
      const response = await axios.post(
        "https://rule-engine-server-2mnf.onrender.com/evaluate_rule",
        {
          ast: JSON.parse(ast),
          data: parsedData,
        }
      );
      setEvaluationResult(response.data.result);
      setError("");
    } catch (err) {
      setError(err.response?.data.error || "Error evaluating rule");
    }
  };

  // Modify an existing rule
  const handleModifyRule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://rule-engine-server-2mnf.onrender.com/modify_rule/${ruleIdToModify}`,
        { rule: newRuleString }
      );
      setAst(JSON.stringify(response.data.ast, null, 2));
      setError("");
    } catch (err) {
      setError(err.response?.data.error || "Error modifying rule");
    }
  };

  return (
    <div className="rule-engine-container">
      <h1>Rule Engine</h1>

      {/* Section for Creating a New Rule */}
      <div className="rule-section">
        <h2>Create a Rule</h2>
        <form onSubmit={handleCreateRule}>
          <label htmlFor="rule">Enter Rule:</label>
          <input
            type="text"
            id="rule"
            value={rule}
            onChange={(e) => setRule(e.target.value)}
            placeholder="e.g. age > 30 AND (salary > 50000 OR position = 'Manager')"
            required
          />
          <button type="submit">Create Rule</button>
        </form>
      </div>

      {/* Section for Combining Multiple Rules */}
      <div className="rule-section">
        <h2>Combine Rules</h2>
        <form onSubmit={handleCombineRules}>
          <label htmlFor="combine-rules">Enter Rules to Combine:</label>
          <textarea
            id="combine-rules"
            value={rulesToCombine.join("\n")}
            onChange={(e) => setRulesToCombine(e.target.value.split("\n"))}
            placeholder="Enter multiple rules separated by a new line"
            required
          />
          <button type="submit">Combine Rules</button>
        </form>
      </div>

      {/* Section for Evaluating a Rule */}
      <div className="rule-section">
        <h2>Evaluate Rule</h2>
        <form onSubmit={handleEvaluateRule}>
          <label htmlFor="data">Enter Data (as JSON):</label>
          <textarea
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder='e.g. {"age": 35, "salary": 60000, "position": "Manager"}'
            required
          />
          <button type="submit">Evaluate Rule</button>
        </form>
        {evaluationResult !== null && (
          <p>Evaluation Result: {evaluationResult.toString()}</p>
        )}
      </div>

      {/* Section for Modifying an Existing Rule */}
      <div className="rule-section">
        <h2>Modify Rule</h2>
        <form onSubmit={handleModifyRule}>
          <label htmlFor="rule-id">Rule ID to Modify:</label>
          <input
            type="text"
            id="rule-id"
            value={ruleIdToModify}
            onChange={(e) => setRuleIdToModify(e.target.value)}
            placeholder="Enter the rule ID"
            required
          />
          <label htmlFor="new-rule">Enter New Rule String:</label>
          <input
            type="text"
            id="new-rule"
            value={newRuleString}
            onChange={(e) => setNewRuleString(e.target.value)}
            placeholder="e.g. age > 30 AND department = 'Marketing'"
            required
          />
          <button type="submit">Modify Rule</button>
        </form>
      </div>

      {/* Displaying AST or Errors */}
      {ast && (
        <div className="result-section">
          <h2>Created/Combined AST:</h2>
          <pre>{ast}</pre>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default RuleEngine;
