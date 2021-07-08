/*
    Copyright 2021 Tom Papke

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import {TestConfig} from "../TestConfig.js";
import {Preprocessor} from "../../src/io/Preprocessor.js";
import * as fs from "fs";
import {ExpectedMatch} from "./ExpectedMatch.js";
import {AggregateMatchResult} from "./AggregateMatchResult.js";
import {MarkDownFactory} from "../MarkDownFactory.js";
import {CpeeMatchAdapter} from "./CpeeMatchAdapter.js";

export class MatchingAlgorithmEvaluation {

    adapters;

    constructor(adapters = []) {
        this.adapters = adapters;
    }

    static all() {
        let adapters = [];
        adapters = adapters.filter(a => fs.existsSync(a.pathPrefix + "/run.sh"));
        adapters.unshift(new CpeeMatchAdapter());
        return new MatchingAlgorithmEvaluation(adapters);
    }

    evalAll(caseDir = TestConfig.MATCH_CASES_DIR) {
        console.log("Using " + caseDir + " to evaluate matching algorithms");

        const resultsPerAdapter = new Map();
        const resultsPerTest = new Map();
        for (const adapter of this.adapters) {
            resultsPerAdapter.set(adapter, []);
        }

        const parser = new Preprocessor();
        fs.readdirSync(caseDir).forEach((dir) => {
            let oldTree;
            let newTree;
            let expected;

            fs.readdirSync(caseDir + "/" + dir).forEach((file) => {
                    const content = fs.readFileSync(caseDir + "/" + dir + "/" + file).toString();
                    if (file === "new.xml") {
                        newTree = parser.parseWithMetadata(content);
                    } else if (file === "old.xml") {
                        oldTree = parser.parseWithMetadata(content);
                    } else if (file === "expected.json") {
                        expected = Object.assign(new ExpectedMatch(), JSON.parse(content));
                    }
                }
            );
            if (oldTree == null || newTree == null || expected == null) {
                //test case is incomplete => skip
                return;
            }

            resultsPerTest.set(dir, []);
            for (const adapter of this.adapters) {
                console.log("Running match case " + dir + " for " + adapter.displayName);

                const result = adapter.evalCase(dir, oldTree, newTree, expected);
                resultsPerAdapter.get(adapter).push(result);
                resultsPerTest.get(dir).push(result);
            }

        });

        const aggregateResults = [];
        for (const [adapter, resultsList] of resultsPerAdapter) {
            let okCount = 0;
            let wrongAnswerCount = 0;
            let runtimeErrorCount = 0;
            for (const result of resultsList) {
                if (result.verdict === TestConfig.VERDICTS.OK) {
                    okCount++;
                } else if (result.verdict === TestConfig.VERDICTS.WRONG_ANSWER) {
                    wrongAnswerCount++;
                } else if (result.verdict === TestConfig.VERDICTS.RUNTIME_ERROR) {
                    runtimeErrorCount++;
                }
            }
            aggregateResults.push(new AggregateMatchResult(adapter.constructor.name, okCount, wrongAnswerCount, runtimeErrorCount));
        }
        console.log(MarkDownFactory.tabularize(aggregateResults));
    }


}
