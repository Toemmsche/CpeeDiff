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

const {CpeeModel} = require("../CPEE/CpeeModel");
const {MatchDiff} = require("../diffs/MatchDiff");
const fs = require("fs");
    const {Merger} = require("../twowaymerge/Merger");
    const {CpeeNode} = require("../CPEE/CpeeNode");
const {TopDownMatching} = require("../matchings/TopDownMatching");
const {KyongHoMatching} = require("../matchings/KyongHoMatching");

let file1 = process.argv[2];
let file2 = process.argv[3];

const xmlA = fs.readFileSync(file1).toString();
const xmlB = fs.readFileSync(file2).toString();

const model1 = CpeeModel.fromCpee(xmlA);
const model2 = CpeeModel.fromCpee(xmlB);
/*
console.log(model1.toTreeString());
console.log("\n VS \n")
console.log(model2.toTreeString());
 */

const json = model1.root.convertToJson();
const node = CpeeNode.parseFromJson(json);

Merger.merge(model1, model2)

