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
import {ExpectedMatch} from "../expected/ExpectedMatch.js";
import {AggregateMatchResult} from "../result/AggregateMatchResult.js";
import {MarkDownFactory} from "../util/MarkDownFactory.js";
import {CpeeMatchAdapter} from "../match_adapters/CpeeMatchAdapter.js";
import {Logger} from "../../Logger.js";
import {DirectoryScraper} from "../util/DirectoryScraper.js";
import {MatchTestCase} from "../case/MatchTestCase.js";

export class MatchingAlgorithmEvaluation {

    adapters;

    constructor(adapters = []) {
        this.adapters = adapters;
    }

    static all() {
        let adapters = [];
        adapters = adapters.filter(a => fs.existsSync(a.pathPrefix + "/" + TestConfig.RUN_SCRIPT_FILENAME));
        adapters.unshift(new CpeeMatchAdapter());
        return new MatchingAlgorithmEvaluation(adapters);
    }

    evalAll(rootDir = TestConfig.MATCH_CASES_DIR) {
       Logger.info("Using " + rootDir + " to evaluate matching algorithms", this);

        const resultsPerAdapter = new Map();
        const resultsPerTest = new Map();
        for (const adapter of this.adapters) {
            resultsPerAdapter.set(adapter, []);
        }

        const parser = new Preprocessor();

        //collect all directories representing testCases
        const caseDirs = DirectoryScraper.scrape(rootDir);
        for(const testCaseDir of caseDirs) {
            const testCase = MatchTestCase.from(testCaseDir);

            if (testCase == null) {
                //test case is incomplete => skip
                Logger.warn("Skipping match case directory " + testCaseDir, this);
                continue;
            }

            resultsPerTest.set(testCase, []);
            for (const adapter of this.adapters) {
                Logger.info("Running match case " + testCase.name + " for " + adapter.displayName + "...", this);

                const result = adapter.evalCase(testCase)
                resultsPerAdapter.get(adapter).push(result);
                resultsPerTest.get(testCase).push(result);
            }
        }

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
            aggregateResults.push(new AggregateMatchResult(adapter.displayName, okCount, wrongAnswerCount, runtimeErrorCount));
        }
        Logger.result(MarkDownFactory.tabularize(aggregateResults));
    }


}
