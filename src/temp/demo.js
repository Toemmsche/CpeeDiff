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


const fs = require("fs");
const {Lis} = require("../lib/Lis");
const {GeneratorParameters} = require("../gen/GeneratorParameters");
const {ModelFactory} = require("../factory/ModelFactory");
const {TestConfig} = require("../../test/TestConfig");
const {TreeGenerator} = require("../gen/TreeGenerator");
const {XmlFactory} = require("../factory/XmlFactory");
const {StandardComparator} = require("../compare/StandardComparator");
const {CpeeNodeFactory} = require("../factory/CpeeNodeFactory");
const {ChawatheMatching} = require("../matching/ChawatheMatch");
const {Preprocessor} = require("../parse/Preprocessor");
const {DeltaMerger} = require("../merge/DeltaMerger");
const {TreeStringSerializer} = require("../visual/TreeStringSerializer");
const {DeltaModelGenerator} = require("../patch/DeltaModelGenerator");
const {MatchDiff} = require("../diff/MatchDiff");
const {CpeeNode} = require("../cpee/CpeeNode");




CpeeNodeFactory.getNode(new CpeeNode("label"));

let file1 = process.argv[2];
let file2 = process.argv[3];
let file3 = process.argv[4];

let booking = "test/test_set/examples/booking.xml";

const xmlA = fs.readFileSync(file1).toString();
const xmlB = fs.readFileSync(file2).toString();
const xmlC = fs.readFileSync(file3).toString();

const  b = fs.readFileSync(booking).toString();





let gen = new TreeGenerator(new GeneratorParameters(10000, 10, 25, 8));


const r = gen.randomLeavesOnly();

console.log("leafs: " + r.leafNodes().length);
console.log("inners: " + r.innerNodes().length);
console.log("properties: " + r.toPreOrderArray().filter(n => n.isPropertyNode()).length);

const shuffled = gen.reshuffleAll(r);

console.log(XmlFactory.serialize(r));
console.log(XmlFactory.serialize(shuffled));

console.log(XmlFactory.serialize(new MatchDiff().diff(r, shuffled)));

const r2 = gen.changeModel(r, 10).model;




/*
const n = fs.readFileSync("test/test_set/match_cases/generated/new.xml").toString();
const o = fs.readFileSync("test/test_set/match_cases/generated/old.xml").toString();
const nT = new Preprocessor().parseWithMetadata(n);
const oT = new Preprocessor().parseWithMetadata(o);
*/



/*
let model1 = new Preprocessor().parseWithMetadata(xmlA);
let model2 =  new Preprocessor().parseWithMetadata(xmlB);
let model3 =  new Preprocessor().parseWithMetadata(xmlC);




console.log(TreeStringSerializer.serializeModel(model1));
console.log(TreeStringSerializer.serializeModel(model2));


const d = new MatchDiff().diff(model1, model2, new ChawatheMatching());
const dt = new DeltaModelGenerator().deltaTree(model1, d);


console.log(XmlFactory.serialize(new DeltaMerger().merge(model1, model2, model3)));


*/

