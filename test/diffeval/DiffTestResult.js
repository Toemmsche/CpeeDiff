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

const assert = require("assert");
const fs = require("fs");
const {IdExtractor} = require("../../src/extract/IdExtractor");

class DiffTestResult {

    info;
    algorithm;
    runtime;

    changesFound;
    insertionsFound;
    movesFound;
    updatesFound;
    deletesFound;

    diffSize;

    constructor(info,algorithm, runtime, changesFound, insertionsFound, movesFound, updatesFound, deletesFound, diffSize) {
        this.info = info;
        this.algorithm = algorithm;
        this.runtime = runtime;
        this.changesFound = changesFound;
        this.insertionsFound = insertionsFound;
        this.movesFound = movesFound;
        this.updatesFound = updatesFound;
        this.deletesFound = deletesFound;
        this.diffSize = diffSize;
    }
}

exports.DiffTestResult = DiffTestResult;